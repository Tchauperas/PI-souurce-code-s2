const usuario = require("../models/User");

class UserController {
  async selectUserById(req, res) {
    if (isNaN(req.params.id)) {
      res.status(400).json({ success: false, message: "ID invalido" });
    } else {
      let result = await usuario.selectUserById(req.params.id);
      if (!result.validated) {
        res
          .status(404)
          .json({ success: false, message: "Erro ao encontrar o usuario" });
      } else {
        result.values == undefined
          ? res
              .status(401)
              .json({ success: false, message: "Usuario não encontrado" })
          : res.status(201).json({ success: true, values: result.values });
      }
    }
  }

  async insert(req, res) {
    if (req.body.login == undefined || req.body.password == undefined) {
      res.status(400).json({ success: false, message: "Dados invalidos" });
    } else {
      usuario.login = req.body.login;
      usuario.password = req.body.password;
      let result = await usuario.insert();
      result.validated
        ? res.status(201).json({ success: true, message: "Usuario inserido" })
        : res.status(404).json({ success: false, message: result.error });
    }
  }

  async delete(req, res) {
    if (isNaN(req.params.id)) {
      res.status(400).json({ success: false, message: "ID invalido" });
    } else {
      let result = await usuario.delete(req.params.id);
      result.validated
        ? res.status(200).json({ success: true, message: "Usuario deletado" })
        : res.status(404).json({ success: false, message: result.error });
    }
  }

  async update(req, res) {
    if (isNaN(req.params.id)) {
      res.status(400).json({ success: false, message: "ID invalido" });
    } else if (
      req.body.login == undefined ||
      req.body.password == undefined
    ) {
      res.status(400).json({ success: false, message: "Dados invalidos" });
    } else {
      usuario.login = req.body.login;
      usuario.password = req.body.password;
      let result = await usuario.update(req.params.id);
      result.validated
        ? res.status(200).json({ success: true, message: "Usuario atualizado" })
        : res.status(404).json({ success: false, message: result.error });
    }
  }

  async selectAll(req, res) {
    let result = await usuario.selectAll();
    result.validated
      ? res.status(200).json({ success: true, message: result.values })
      : res.status(404).json({ success: false, values: result.error });
  }

}

module.exports = new UserController();
