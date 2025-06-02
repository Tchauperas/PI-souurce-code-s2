require("dotenv").config();
const api = require("./src/api");
const express = require('express')
const path = require('path')

api.use(express.static(path.join(__dirname, '../frontend')));

api.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

api.listen(process.env.PORT, '0.0.0.0' ,() => {
  console.log(`API is running on port ${process.env.PORT}`);
});
