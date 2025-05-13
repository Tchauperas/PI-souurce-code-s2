const express = require("express");
const router = require("./routers/router");
const api = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

api.use(cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

api.use(express.urlencoded({ extended: false }));

api.use(express.json());

api.use("/", router);

module.exports = api;
