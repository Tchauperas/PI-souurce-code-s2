const empresa = require("../models/Empresa");

class EmpresaController {
  async selectById(req, res) {
    let id = req.params.id;
    if (isNaN(id)) {
      res.status(400).json({ success: false, message: "ID invalido" });
    } else {
      let result = await empresa.selectById(id);
      console.log(result);
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

  async selectAll(req, res) {
    let result = await empresa.selectAll();
    result.validated
      ? res.status(200).json({ success: true, message: result.values })
      : res.status(404).json({ success: false, values: result.error });
  }

  async insert(req, res) {
    let {
      razao_social,
      cnpj,
      logradouro,
      bairro,
      n,
      complemento,
      cep,
      municipio,
      uf,
      telefone,
      id_usuario,
    } = req.body;

    let result = await empresa.insert(
      razao_social,
      cnpj,
      logradouro,
      bairro,
      n,
      complemento,
      cep,
      municipio,
      uf,
      telefone,
      id_usuario
    );

    result.validated
      ? res
          .status(201)
          .json({ success: true, message: "Usuario cadastrado com sucesso!!!" })
      : res.status(401).json({ success: false, message: result.error });
  }

  async delete(req, res) {
    try {
      let id = req.params.id;
      if (isNaN(id)) {
        res.status(400).json({ success: false, message: "Id invalido" });
      } else {
        let result = await empresa.delete(id);
        result.validated
          ? res
              .status(201)
              .json({ success: true, message: "Usuario excluido com sucesso" })
          : res.status(404).json({ success: false, message: "User not found" });
      }
    } catch (error) {}
  }

  async update(req, res) {
    let id = req.params.id;
    let {
      razao_social,
      cnpj,
      logradouro,
      bairro,
      n,
      complemento,
      cep,
      municipio,
      uf,
      telefone,
      id_usuario,
    } = req.body;
    try {
      await empresa.update(
        id,
        razao_social,
        cnpj,
        logradouro,
        bairro,
        n,
        complemento,
        cep,
        municipio,
        uf,
        telefone,
        id_usuario
      );
      res
        .status(200)
        .json({ success: true, message: "Usuario atualizado com sucesso" });
    } catch (error) {
      res
        .status(404)
        .json({ success: false, message: "Usuario não encontrado" });
    }
  }
}

module.exports = new EmpresaController();
