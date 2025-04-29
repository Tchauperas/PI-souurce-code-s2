const knex = require("../configs/dataBase.js");

class Pessoa {
  async insert(
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
  ) {
    try {
      await knex
        .insert({
          idTipoCadastro: idTipoCadastro,
          idTipoPessoa: idTipoPessoa,
          cnpj_cpf: cnpj_cpf,
          logradouro: logradouro,
          bairro: bairro,
          n: n,
          complemento: complemento,
          cep: cep,
          municipio: municipio,
          uf: uf,
          telefone: telefone,
          id_usuario: id_usuario,
        })
        .table("pessoas");

      return { validated: true };
    } catch (error) {
      return { validated: false, error: error };
    }
  }

  async selectAll() {
    try {
      let pessoas = await knex
        .select([
          "idpessoas",
          "idTipoCadastro",
          "idTipoPessoa",
          "cnpj_cpf",
          "logradouro",
          "bairro",
          "n",
          "complemento",
          "cep",
          "municipio",
          "uf",
          "telefone",
          "id_usuario",
        ])
        .table("pessoas");
      return { validated: true, values: pessoas };
    } catch (error) {
      return { validated: false, error: error };
    }
  }

  async selectById(idpessoas) {
    try {
      let pessoas = await knex
        .select([
          "idpessoas",
          "idTipoCadastro",
          "idTipoPessoa",
          "cnpj_cpf",
          "logradouro",
          "bairro",
          "n",
          "complemento",
          "cep",
          "municipio",
          "uf",
          "telefone",
          "id_usuario",
        ])
        .where({ idpessoas: idpessoas })
        .table("pessoas");
      return { validated: true, values: pessoas };
    } catch (error) {
      return { validated: false, error: error };
    }
  }

  async delete(idpessoas) {
    try {
      await knex("pessoas").where({ idpessoas: idpessoas }).del();
      return { validated: true };
    } catch (error) {
      return { validated: false, error: error };
    }
  }

  async update(
    idpessoas,
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
  ) {
    try {
      await knex("pessoas")
        .where({ idpessoas: idpessoas })
        .update({
          idTipoCadastro: idTipoCadastro,
          idTipoPessoa: idTipoPessoa,
          cnpj_cpf: cnpj_cpf,
          logradouro: logradouro,
          bairro: bairro,
          n: n,
          complemento: complemento,
          cep: cep,
          municipio: municipio,
          uf: uf,
          telefone: telefone,
          id_usuario: id_usuario,
        });
      return { validated: true };
    } catch (error) {
      return { validated: false, error: error };
    }
  }
}

module.exports = new Pessoa();
