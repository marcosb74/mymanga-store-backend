const express = require("express");
const User = require("../models/User");
const Cart = require("../models/Cart");
const router = express.Router();
const { v4: uuid4 } = require("uuid");
const bcrypt = require("bcrypt");
require("dotenv").config();
const sendToken = require("../utils/jwt");
const isAuthenticatedUser = require("../utils/logged");
const loggerConsole = require("../utils/loggerSetup");
const { createTransport } = require("nodemailer");

router.post("/signup", async (req, res) => {
  // CHECKING IF IT EXISTS
  const isOnDb = await User.find({
    email: req.body.email,
  });
  if (!isOnDb === []) {
    loggerConsole.warn(
      "A user tried registering with an email already associated to another user, email used: " +
        req.body.email
    );

    res.json({ error: "Email taken" }).status(409);
    return;
  } else {
    try {
      //REGISTERING NEW USER.
      let passwordHash = await bcrypt.hash(req.body.password, 8);
      const user = await User.create({
        _id: uuid4(),
        email: req.body.email,
        password: passwordHash,
        name: req.body.name,
        lastname: req.body.lastname,
        country: req.body.country,
        address: req.body.address,
        phone: Number(req.body.phone),
        age: req.body.age,
        avatar: req.body.avatar,
      });

      await Cart.create({
        _id: uuid4(),
        owner: user._id,
      });
      // GMAIL NOTIFICATION:

      const transporter = createTransport({
        service: "gmail",
        port: 587,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.AUTH_PASS,
        },
      });
      const mailOptions = {
        from: "MyManga-Store BoT Beep-Boop",
        to: process.env.EMAIL,
        subject: `A new user has been registered on MyManga-Store!, welcome ${user.email}`,
        html: `<h1 style="color: purple;">We have a new user in our website!</h1>
      <p>please welcome ${user.name} ${user.lastname}. </p>
      
      <p> His email address is: ${user.email} and he/she is from ${user.country} </p>
      
      <p> Also, he/she is ${user.age} years old, and his/her phone number is ${user.phone} </p>
      
      <p> It-it's not like I wanted to tell you all of this. B-Baka! </p>`,
      };
      //EMAIL TO ADMIN
      await transporter.sendMail(mailOptions);

      //Notifyin the sv.
      loggerConsole.trace(
        "A new user has been created under the email of: " + user.email
      );

      //sending JWT
      sendToken(user, 200, res);
    } catch (error) {
      loggerConsole.error("An error ocurred on /signup" + error);
    }
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  // Check If Email And Password Is Entered By User
  if (!email || !password) return res.json({ error: "Missing Fields " });

  // Finding User In Database (We Use Select Because On The Schema We Used Select: False)
  const user = await User.findOne({ email }).select("+password");

  if (!user) return res.send("datos mal ");

  // Check If Password Is Correct Or Not
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) return res.send("pass mal ");

  loggerConsole.warn("the user " + user.email + " has logged onto the website");
  // Assign JWT Token
  sendToken(user, 200, res);
});

router.get("/profile", isAuthenticatedUser, async (req, res) => {
  return res.send(req.user);
});

module.exports = router;
