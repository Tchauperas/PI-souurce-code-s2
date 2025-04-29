const lancamento = require("../models/Lancamento");

class LancamentoController {
  async insert(req, res) {
    const {
      id_empresa,
      id_pessoas,
      id_TipoLancamentos,
      numdoc,
      data_movimento,
      data_vecto,
      valor,
      data_pagamento,
      id_usuario,
    } = req.body;
    try {
      const result = await lancamento.insert(
        id_empresa,
        id_pessoas,
        id_TipoLancamentos,
        numdoc,
        data_movimento,
        data_vecto,
        valor,
        data_pagamento,
        id_usuario
      );
      res
        .status(201)
        .json({ message: "Lançamento inserido com sucesso", result });
    } catch (error) {
      res.status(500).json({ message: "Erro ao inserir lançamento", error });
    }
  }

  async selectAll(req, res) {
    try {
      const result = await lancamento.selectAll();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Erro ao selecionar lançamentos", error });
    }
  }

  async selectById(req, res) {
    const { id } = req.params;
    try {
      const result = await lancamento.selectById(id);
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "Lançamento não encontrado" });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro ao selecionar lançamento", error });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    try {
      const result = await lancamento.delete(id);
      if (result) {
        res.status(200).json({ message: "Lançamento deletado com sucesso" });
      } else {
        res.status(404).json({ message: "Lançamento não encontrado" });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro ao deletar lançamento", error });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const {
      id_empresa,
      id_pessoas,
      id_TipoLancamentos,
      numdoc,
      data_movimento,
      data_vecto,
      valor,
      data_pagamento,
      id_usuario,
    } = req.body;
    try {
      const result = await lancamento.update(
        id,
        id_empresa,
        id_pessoas,
        id_TipoLancamentos,
        numdoc,
        data_movimento,
        data_vecto,
        valor,
        data_pagamento,
        id_usuario
      );
      if (result) {
        res.status(200).json({ message: "Lançamento atualizado com sucesso" });
      } else {
        res.status(404).json({ message: "Lançamento não encontrado" });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar lançamento", error });
    }
  }
}

module.exports = new LancamentoController();
