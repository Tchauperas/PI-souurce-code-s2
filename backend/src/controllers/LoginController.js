//requerer as variáveis de ambiente
require("dotenv").config();
//requerer o models usuario
const users = require("../models/User");
//requerer a função de comparar senha
const comparePasswordService = require("../services/compare_password_service");
//requerer a biblioteca jwt
const jwt = require("jsonwebtoken");

class LoginController {
  async login(req, res) {
    let { login, password } = req.body;
    let user = await users.findByLogin(login);

    if (user.values != undefined) {
      let passValiated = comparePasswordService(
        password,
        user.values[0].password
      );
      if (!passValiated) {
        res.status(406).json({ success: false, message: "Senha Invalida" });
      } else {
        let token = jwt.sign(
          { login: user.values[0].login, role: user.values[0].role },
          process.env.SECRET,
          { expiresIn: 5000 }
        );
        res.status(200).json({ success: true, token: token });
        console.log(token);
      }
    } else {
      user.values == undefined
        ? res
            .status(406)
            .json({ success: false, message: "Login não encontrado" })
        : res.status(404).json({ success: false, message: user.error });
    }
  }
}

module.exports = new LoginController();
