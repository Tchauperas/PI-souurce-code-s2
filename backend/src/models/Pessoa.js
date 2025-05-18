const knex = require("../configs/dataBase.js");

class Pessoa {
  async insert(
    idtipocadastro,
    idtipopessoa,
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
    razao_social
  ) {
    try {
      await knex
        .insert({
          idtipocadastro: idtipocadastro,
          idtipopessoa: idtipopessoa,
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
          razao_social: razao_social,
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
          "idtipocadastro",
          "idtipopessoa",
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
          "razao_social",
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
          "idtipocadastro",
          "idtipopessoa",
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
          "razao_social",
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
    idtipocadastro,
    idtipopessoa,
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
    razao_social
  ) {
    try {
      await knex("pessoas").where({ idpessoas: idpessoas }).update({
        idtipocadastro: idtipocadastro,
        idtipopessoa: idtipopessoa,
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
        razao_social: razao_social,
      });
      return { validated: true };
    } catch (error) {
      return { validated: false, error: error };
    }
  }
}

module.exports = new Pessoa();
