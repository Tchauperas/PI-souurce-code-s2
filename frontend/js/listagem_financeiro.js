async function carregarLancamentos() {
  try {
    const response = await fetch("http://localhost:3000/lancamentos");
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
      let tipoLancamento;
      if (item.id_tipolancamentos === 1) {
        tipoLancamento = "Crédito";
      } else {
        tipoLancamento = "Débito";
      }
      div.innerHTML = `
            <br>
            <br>
            <h3>Lançamento ${item.numdoc || ""}</h3>
            <p><strong>Empresa:</strong> ${item.id_empresa}</p>
            <p><strong>Pessoa:</strong> ${item.id_pessoas}</p>
            <p><strong>Tipo de Lançamento:</strong> ${
              tipoLancamento
            }</p>
            <p><strong>Data Movimento:</strong> ${item.data_movimento}</p>
            <p><strong>Data Vencimento:</strong> ${item.data_vecto}</p>
            <p><strong>Valor:</strong> R$ ${parseFloat(item.valor).toFixed(
              2
            )}</p>
            <p><strong>Data Pagamento:</strong> ${
              item.data_pagamento || "—"
            }</p>
          `;
      listaContainer.appendChild(div);
    });
  } catch (error) {
    document.getElementById(
      "lancamento-lista"
    ).innerHTML = `<p style="color:red;">Erro ao carregar lançamentos: ${error.message}</p>`;
  }
}

window.onload = carregarLancamentos

