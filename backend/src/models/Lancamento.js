const knex = require("../configs/dataBase");

class Lancamento {
  async insert(
    id_empresa,
    id_pessoas,
    id_tipolancamentos,
    numdoc,
    data_movimento,
    data_vecto,
    valor,
    data_pagamento,
    id_usuario
  ) {
    try {
      const result = await knex("lancamentos").insert({
        id_empresa,
        id_pessoas,
        id_tipolancamentos,
        numdoc,
        data_movimento,
        data_vecto,
        valor,
        data_pagamento,
        id_usuario,
      });
      return result;
    } catch (error) {
      console.error("Error inserting lancamento:", error);
      throw error;
    }
  }

  async selectAll() {
    try {
      const result = await knex("lancamentos")
        .select(
          "lancamentos.*",
          "e.razao_social as empresa_razao_social",
          "p.razao_social as pessoa_razao_social"
        )
        .leftJoin("empresa as e", "lancamentos.id_empresa", "e.idempresa")
        .leftJoin("pessoas as p", "lancamentos.id_pessoas", "p.idpessoas");

      return result;
    } catch (error) {
      console.error("Erro detalhado:", {
        message: error.message,
        code: error.code,
        stack: error.stack,
      });
      throw new Error("Falha ao buscar lançamentos.");
    }
  }

  async selectById(idlancamentos) {
    try {
      const result = await knex("lancamentos")
        .where({ idlancamentos: idlancamentos })
        .first();
      return result;
    } catch (error) {
      console.error("Error selecting lancamento by id:", error);
      throw error;
    }
  }

  async delete(idlancamentos) {
    try {
      const result = await knex("lancamentos").where({ idlancamentos }).del();
      return result;
    } catch (error) {
      console.error("Error deleting lancamento:", error);
      throw error;
    }
  }

  async update(
    idlancamentos,
    id_empresa,
    id_pessoas,
    id_tipolancamentos,
    numdoc,
    data_movimento,
    data_vecto,
    valor,
    data_pagamento,
    id_usuario
  ) {
    const data = {
      id_empresa,
      id_pessoas,
      id_tipolancamentos,
      numdoc,
      data_movimento,
      data_vecto,
      valor,
      data_pagamento,
      id_usuario,
    };
    try {
      const result = await knex("lancamentos")
        .where({ idlancamentos })
        .update(data);
      return result;
    } catch (error) {
      console.error("Error updating lancamento:", error);
      throw error;
    }
  }
}

module.exports = new Lancamento();
