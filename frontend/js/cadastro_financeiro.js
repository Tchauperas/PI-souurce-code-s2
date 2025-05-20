document
  .getElementById("lancamentoForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = {
      id_empresa: document.getElementById("id_empresa").value,
      id_pessoas: document.getElementById("id_pessoas").value,
      id_tipolancamentos: document.getElementById("id_tipolancamentos").value,
      numdoc: document.getElementById("numdoc").value,
      data_movimento: document.getElementById("data_movimento").value,
      data_vecto: document.getElementById("data_vecto").value,
      valor: parseFloat(document.getElementById("valor").value),
      data_pagamento: document.getElementById("data_pagamento").value,
      id_usuario: "1",
    };

    console.log(formData);

    fetch("http://localhost:3000/lancamento", {
      method: "POST",
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
        alert("Lançamento cadastrado com sucesso!");
        window.location.href = "financial_screen.html";
      })
      .catch((error) => {
        console.error("Erro:", error);
        alert("Erro ao cadastrar lançamento");
      });
  });
