const knex = require("../configs/dataBase");

class Lancamento {
  async insert(
    id_empresa,
    id_pessoas,
    id_TipoLancamentos,
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
        id_TipoLancamentos,
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
      const result = await knex("lancamentos").select("*");
      return result;
    } catch (error) {
      console.error("Error selecting lancamentos:", error);
      throw error;
    }
  }

  async selectById(idlancamentos) {
    try {
      const result = await knex("lancamentos").where({ idlancamentos : idlancamentos }).first();
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

  async update(idlancamentos, id_empresa, id_pessoas, id_TipoLancamentos, numdoc, data_movimento, data_vecto, valor, data_pagamento, id_usuario) {
    const data = {
      id_empresa,
      id_pessoas,
      id_TipoLancamentos,
      numdoc,
      data_movimento,
      data_vecto,
      valor,
      data_pagamento,
      id_usuario,
    };
    try {
      const result = await knex("lancamentos").where({ idlancamentos }).update(data);
      return result;
    } catch (error) {
      console.error("Error updating lancamento:", error);
      throw error;
    }
  }
}

module.exports = new Lancamento();
