const express = require('express');
const morgan = require('morgan');

const AccountsRouter = require("../accounts/accounts-router.js");

const server = express();

server.use(express.json());
server.use(morgan('dev'));

server.use("/api/accounts", AccountsRouter);

server.get("/", (req,res)=>{
  res.status(200).json({api: "up and running"});
});

module.exports = server;
