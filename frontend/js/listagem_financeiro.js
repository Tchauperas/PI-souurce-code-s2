async function carregarLancamentos() {
  try {
    const response = await fetch("http://35.175.140.204:3000/lancamentos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });

    if (!response.ok) throw new Error("Erro ao carregar lançamentos");

    const dados = await response.json();
    console.log("Resposta da API:", dados);

    let lancamentos;
    if (Array.isArray(dados)) {
      lancamentos = dados;
    } else if (Array.isArray(dados.lancamentos)) {
      lancamentos = dados.lancamentos;
    } else if (Array.isArray(dados.dados)) {
      lancamentos = dados.dados;
    } else {
      throw new Error("Formato inesperado da resposta da API");
    }

    const listaContainer = document.getElementById("lancamento-lista");

    if (lancamentos.length === 0) {
      listaContainer.innerHTML = "<p>Nenhum lançamento encontrado.</p>";
      return;
    }

    lancamentos.forEach((item) => {
      const div = document.createElement("div");
      div.className = "lancamento-item";

      // Tipo do lançamento
      let tipoLancamento = item.id_tipolancamentos === 1 ? "Crédito" : "Débito";

      // Função para formatar data
      function formatarData(data) {
        if (!data) return "—";
        const date = new Date(data);
        if (isNaN(date.getTime())) return data;
        const dia = String(date.getDate()).padStart(2, "0");
        const mes = String(date.getMonth() + 1).padStart(2, "0");
        const ano = date.getFullYear();
        return `${dia}/${mes}/${ano}`;
      }

      // Lógica de status de pagamento
      let status;
      const hoje = new Date();
      const dataPagamento = item.data_pagamento
        ? new Date(item.data_pagamento)
        : null;
      const dataVencimento = item.data_vecto ? new Date(item.data_vecto) : null;

      if (dataPagamento) {
        status = 2; // Pago
      } else if (dataVencimento && dataVencimento < hoje) {
        status = 3; // Vencido
      } else {
        status = 1; // Em aberto
      }

      // Montagem do HTML
      div.innerHTML = `
        <div class="item-conteudo-lancamento">
          <h3>Lançamento N° ${item.numdoc || ""}</h3>
        <ul>
          <li><strong>Empresa:</strong> ${item.empresa_razao_social}</li>
          <li><strong>Pessoa:</strong> ${item.pessoa_razao_social}</li>
          <li><strong>Tipo de Lançamento:</strong> ${tipoLancamento}</li>
          <li><strong>Data Movimento:</strong> ${formatarData(
            item.data_movimento
          )}</li>
          <li><strong>Data Vencimento:</strong> ${formatarData(
            item.data_vecto
          )}</li>
          <li><strong>Valor:</strong> R$ ${parseFloat(item.valor).toFixed(
            2
          )}</li>
          <li><strong>Data Pagamento:</strong> ${formatarData(
            item.data_pagamento
          )}</li>
          <br>
                    <li><strong>Status:</strong> ${
                      status === 1
                        ? "Em aberto"
                        : status === 2
                        ? "Pago"
                        : "Vencido"
                    }</li>
        </ul>
        <div class="botoes-card" style="margin-top: 20px;">
          <button onClick="editarLancamento(${
            item.idlancamentos
          })" class="btn-editar">Editar</button>
          <button onClick="deletarLancamento(${
            item.idlancamentos
          })" class="btn-deletar">Deletar</button>
        </div>
        </div>
      `;
      listaContainer.appendChild(div);
    });
  } catch (error) {
    document.getElementById(
      "lancamento-lista"
    ).innerHTML = `<p style="color:red;">Erro ao carregar lançamentos: ${error.message}</p>`;
  }
}

window.onload = carregarLancamentos;
