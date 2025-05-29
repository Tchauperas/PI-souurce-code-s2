document
  .getElementById("cadastroForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    // Validar campos obrigatórios
    const requiredFields = ["idtipocadastro", "idtipopessoa", "cnpj_cpf", "uf"];
    for (const fieldId of requiredFields) {
      const field = document.getElementById(fieldId);
      if (!field.value) {
        alert(`Por favor, preencha o campo ${field.labels[0].textContent}`);
        field.focus();
        return;
      }
    }

    // Coletar os dados do formulário
    const formData = {
      idtipocadastro: document.getElementById("idtipocadastro").value,
      idtipopessoa: document.getElementById("idtipopessoa").value,
      cnpj_cpf: document.getElementById("cnpj_cpf").value,
      logradouro: document.getElementById("logradouro").value,
      bairro: document.getElementById("bairro").value,
      n: document.getElementById("n").value,
      complemento: document.getElementById("complemento").value || null,
      cep: document.getElementById("cep").value,
      municipio: document.getElementById("municipio").value,
      uf: document.getElementById("uf").value,
      telefone: document.getElementById("telefone").value,
      id_usuario: "1",
      razao_social: document.getElementById("razao_social").value,
    };

    console.log("Dados do formulário:", formData);

    try {
      // Enviar os dados como JSON para a API
      const response = await fetch("http://localhost:3000/pessoa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao cadastrar pessoa");
      }

      alert("Cadastro realizado com sucesso!");
      window.location.href = "people_listing_screen.html";
    } catch (error) {
      console.error("Erro:", error);
      alert(`Erro: ${error.message}`);
    }
  });
