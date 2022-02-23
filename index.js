const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const routes = require("./routes/index");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cluster = require("cluster");
const parseArgs = require("minimist");
const numCPUs = require("os").cpus().length;
const optMinimist = { default: { PORT: 8080, MODE: "FORK" } };
const args = parseArgs(process.argv.slice(2), optMinimist);
const MODE = args.MODE;
//DB connection
connectDB();

//Basic cfg

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api", routes);

if (MODE === "FORK") {
  app.listen(PORT, () => {
    console.log(
      `Server Process Id: ${process.pid} Running on Port: ${PORT} in FORK mode`
    );
  });
} else {
  if (cluster.isMaster) {
    for (let i = 0; i < numCPUs; i) {
      cluster.fork();
    }
    cluster.on("exit", (worker, code, signal) => {
      console.log(`Process ${process}`);
    });
  } else {
    app.listen(PORT, () => {
      console.log(
        `Server Process Id: ${process.pid} Running on Port: ${PORT} in CLUSTER mode`
      );
    });
  }
}

//Start Server with Cluster = nodemon index.js --PORT 'PORT NUMBER' --MODE CLUSTER

//Start Server with FORK = nodemon index.js --PORT 'PORT NUMBER' --MODE FORK
