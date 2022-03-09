const Products = require("../models/Products");
const Cart = require("../models/Cart");
const Order = require("../models/Orders");
require("dotenv").config();
const { v4: uuid4 } = require("uuid");
const { createTransport } = require("nodemailer");
const twilio = require("twilio");
const twilioClient = twilio(process.env.ACCOUNTSID, process.env.AUTHTOKEN);
const loggerConsole = require("../utils/loggerSetup");

async function getProductsService(req, res) {
  try {
    const products = await Products.find({});
    res.send(products);
  } catch (error) {
    loggerConsole.error("Error on /products" + error);
  }
}

async function getCartService(req, res) {
  try {
    const cart = await Cart.findOne({ owner: req.user.id });
    res.send(cart);
  } catch (error) {
    loggerConsole.error("Error on /cart -  get" + error);
  }
}

async function updateCartService(req, res) {
  try {
    const cart = await Cart.findOne({ owner: req.user.id });
    if (!cart) {
      return res.json({ error: " Cart Not Found" });
    }
    Object.assign(cart, req.body.data);
    await cart.save();
    res.send(cart);
  } catch (error) {
    loggerConsole.error("Error on /cart - put" + error);
  }
}

async function deleteCartService(req, res) {
  try {
    const cart = await Cart.findOne({ owner: req.user.id });
    const productId = req.body.id;
    if (!cart) {
      return res.json({ error: " Cart Not Found" });
    }
    const newCart = cart.products.filter((item) => item._id !== productId);
    delete cart.products;
    cart.products = newCart;
    await cart.save();
    res.send(cart);
  } catch (error) {
    loggerConsole.error("Error on /cart - delete" + error);
  }
}

async function checkoutService(req, res) {
  try {
    // GENERATING NEW ORDER
    const order = await Order.create({
      _id: uuid4(),
      products: req.body.products,
      total: Number(req.body.total),
      name: req.body.name,
      lastname: req.body.lastname,
      address: req.body.country,
      phone: req.body.phone,
      country: req.body.address,
    });
    loggerConsole.trace(
      "A new order has been created by: " +
        req.body.name +
        " " +
        req.body.lastname
    );

    // SETTING UP  GMAIL SERVICE
    const transporter = createTransport({
      service: "gmail",
      port: 587,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.AUTH_PASS,
      },
    });
    // PARSING ITEMS THAT THE FRONT END SENDS FOR EMAIL
    const parsedOrders = order.products.map((i) => {
      return `<ul>
                    <li>Item Name: ${i.name} </li>
                    <li>Price: ${i.price}</li>
                    <li>Category: ${i.category}</li>
                  </ul>`;
    });
    // PARSING ITEMS THAT THE FRONT END SENDS FOR WHATSAPP

    const parsedOrdersWssp = order.products.map((i) => {
      return `Item Name: ${i.name}
    
                  Price: ${i.price}
    
                  Category: ${i.category}
                  `;
    });

    // SETTING UP EMAIL BODY

    const mailOptions = {
      from: "MyManga-Store BoT Beep-Boop Puchase Notyfier",
      to: process.env.EMAIL,
      subject: `A new order has been place by ${order.name}`,
      html: `<h1 style="color: purple;">We have a order in our website!</h1>
    
        <p>The user ${order.name} has places the following order: </p>
     
          ${parsedOrders}
        
        <p> It-it's not like I wanted to tell you all of this. B-Baka! </p>`,
    };

    // SETTING UP WHATSAPP BODY

    const wspMessage = {
      body: "Hey Admin, wake up! We have a new order: " + parsedOrdersWssp,
      mediaUrl: process.env.MEDIA_URL,
      from: process.env.WSP_FROM,
      to: process.env.WSP_TO,
    };

    // SETTING UP SMS BODY

    const smsMessage = {
      body: `Hello, ${order.name} ! We have recevied your order and it's being processed, thanks for shopping with us!  `,
      from: process.env.WSP_FROM,
      to: process.env.WSP_TO,
    };

    // EMAIL TO ADMIN
    await transporter.sendMail(mailOptions);
    // WSP TO ADMIN
    await twilioClient.messages.create(wspMessage);
    // MSG TO CLIENT
    await twilioClient.messages.create(smsMessage);
    res.send(order);
  } catch (error) {
    loggerConsole.error("Error on /checkout" + error);
  }
}

module.exports = {
  getProductsService,
  getCartService,
  updateCartService,
  deleteCartService,
  checkoutService,
};
