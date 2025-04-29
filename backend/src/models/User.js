const knex = require("../configs/dataBase");

class User {
  async selectUserById(idUser) {
    try {
      let user = await knex
        .select(["idUser", "login", "password"])
        .where({ idUser: idUser })
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

  async delete(idUser) {
    try {
      await knex("user").where({ idUser: idUser }).del();
      return { validated: true };
    } catch (error) {
      return { validated: false, error: error };
    }
  }

  async update(idUser) {
    try {
      await knex("user")
        .where({ idUser: idUser })
        .update({ login: this.login, password: this.password });
      return { validated: true };
    } catch (error) {
      return { validated: false, error: error };
    }
  }

  async selectAll() {
    try {
      let users = await knex
        .select(["idUser", "login", "password"])
        .table("user");
      return { validated: true, values: users };
    } catch (error) {
      return { validated: false, error: error };
    }
  }
}

module.exports = new User();
