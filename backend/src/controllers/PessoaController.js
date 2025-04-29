const pessoa = require("../models/Pessoa.js");

class PessoaController {
  async insert(req, res) {
    let {
      idTipoCadastro,
      idTipoPessoa,
      cnpj_cpf,
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

    let result = await pessoa.insert(
      idTipoCadastro,
      idTipoPessoa,
      cnpj_cpf,
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
      ? res.status(200).json({ success: true, message: result.values })
      : res.status(404).json({ success: false, values: result.error });
  }

  async selectAll(req, res) {
    let result = await pessoa.selectAll();

    result.validated
      ? res.status(200).json({ success: true, message: result.values })
      : res.status(404).json({ success: false, values: result.error });
  }

  async selectById(req, res) {
    let { id } = req.params;

    let result = await pessoa.selectById(id);

    result.validated
      ? res.status(200).json({ success: true, message: result.values })
      : res.status(404).json({ success: false, values: result.error });
  }

  async delete(req, res) {
    let { id } = req.params;

    let result = await pessoa.delete(id);

    result.validated
      ? res.status(200).json({ success: true, message: result.values })
      : res.status(404).json({ success: false, values: result.error });
  }

  async update(req, res) {
    let { id } = req.params;
    let {
      idTipoCadastro,
      idTipoPessoa,
      cnpj_cpf,
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

    let result = await pessoa.update(
      id,
      idTipoCadastro,
      idTipoPessoa,
      cnpj_cpf,
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
      ? res.status(200).json({ success: true, message: result.values })
      : res.status(404).json({ success: false, values: result.error });
  }
}

module.exports = new PessoaController();