require("dotenv").config();
const api = require("./src/api");

api.listen(process.env.PORT, () => {
  console.log(`API is running on port ${process.env.PORT}`);
});
