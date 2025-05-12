const knex = require("../configs/dataBase");

class User {
  async selectUserById(iduser) {
    try {
      let user = await knex
        .select(["iduser", "login", "password"])
        .where({ iduser: iduser })
        .table("user");
      return user.length > 0
        ? { validated: true, values: user }
        : { validated: true, values: undefined };
    } catch (error) {
      return { validated: false, error: error };
    }
  }

  async insert() {
    try {
      await knex("user").insert({
        login: this.login,
        password: this.password,
      });
      return { validated: true };
    } catch (error) {
      return { validated: false, error: error };
    }
  }

  async delete(iduser) {
    try {
      await knex("user").where({ iduser: iduser }).del();
      return { validated: true };
    } catch (error) {
      return { validated: false, error: error };
    }
  }

  async update(iduser) {
    try {
      await knex("user")
        .where({ iduser: iduser })
        .update({ login: this.login, password: this.password });
      return { validated: true };
    } catch (error) {
      return { validated: false, error: error };
    }
  }

  async selectAll() {
    try {
      let users = await knex.select(["iduser", "login", "password"]).table("user");
      return { validated: true, values: users };
    } catch (error) {
      return { validated: false, error: error };
    }
  }
}

module.exports = new User();
