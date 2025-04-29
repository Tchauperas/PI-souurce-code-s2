const knex = require("../configs/dataBase");

class Empresa {
  async selectById(idempresa) {
    console.log(idempresa);
    try {
      let empresa = await knex
        .select([
          "idempresa",
          "razao_social",
          "cnpj",
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
        .where({ idempresa: idempresa })
        .table("empresa");
      return empresa.length > 0
        ? { validated: true, values: empresa }
        : { validated: true, values: undefined };
    } catch (error) {
      return { validated: false, error: error };
    }
  }

  async selectAll() {
    try {
      let empresa = await knex
        .select([
          "idempresa",
          "razao_social",
          "cnpj",
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
        .table("empresa");
      return { validated: true, values: empresa };
    } catch (error) {
      return { validated: false, error: error };
    }
  }

  async insert(
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
  ) {
    try {
      await knex
        .insert({
          razao_social: razao_social,
          cnpj: cnpj,
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
        .table("empresa");

      return { validated: true };
    } catch (error) {
      return { validated: false, error: error };
    }
  }

  async delete(idempresa) {
    try {
      await knex("empresa").where({ idempresa: idempresa }).del();
      return { validated: true };
    } catch (error) {
      return { validated: false, error: error };
    }
  }

  async update(
    idempresa,
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
  ) {
    try {
      await knex
        .update({
          razao_social: razao_social,
          cnpj: cnpj,
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
        .where({ idempresa: idempresa })
        .table("empresa");
      return { validated: true };
    } catch (error) {
      return { validated: false, error: error };
    }
  }
}

module.exports = new Empresa();
