document.addEventListener("DOMContentLoaded", function () {
  const dados = JSON.parse(localStorage.getItem("lancamentoEditando"))
  console.log(dados)
  document.getElementById("id_empresa").value = dados.id_empresa
  document.getElementById("id_pessoas").value = dados.id_pessoas
  document.getElementById("id_tipolancamentos").value = dados.id_tipolancamentos
  document.getElementById("numdoc").value = dados.numdoc
  document.getElementById("data_movimento").value = dados.id_datamovimento
  document.getElementById("data_vecto").value = dados.data_vecto
  document.getElementById("valor").value = dados.valor
  document.getElementById("data_pagamento").value = dados.data_pagamento

  document.getElementById("editLancamento").addEventListener("submit", function(e) {
    e.preventDefault()
    editarLancamento(dados.idlancamentos)
  })
});

async function editarLancamento(id) {
  try {
    const formData = {
      id_empresa: document.getElementById("id_empresa").value,
      id_pessoas: document.getElementById("id_pessoas").value,
      id_tipolancamentos: document.getElementById("id_tipolancamentos").value,
      numdoc: document.getElementById("numdoc").value,
      data_movimento: document.getElementById("data_movimento").value,
      data_vecto: document.getElementById("data_vecto").value,
      valor: parseFloat(document.getElementById("valor").value),
      data_pagamento: document.getElementById("data_pagamento").value,
    };

    console.log(formData);

    fetch(`http://localhost:3000/lancamento/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro na requisição");
        }
        return response.json();
      })
      .then((data) => {
        alert("Lançamento alterado com sucesso!");
        window.location.href = "financial_screen.html";
      })
      .catch((error) => {
        console.error("Erro:", error);
        alert("Erro ao alterar lançamento");
      });
  } catch (error) {
    console.error("Erro:", error);
    alert(`Erro: ${error.message}`);
  }
}
