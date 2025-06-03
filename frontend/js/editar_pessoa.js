document.addEventListener("DOMContentLoaded", function () {
  const dados = JSON.parse(localStorage.getItem("pessoaEditando"));
  const pessoaData = dados.message[0];
  if (pessoaData) {
    document.getElementById("idtipocadastro").value = pessoaData.idtipocadastro;
    document.getElementById("idtipopessoa").value = pessoaData.idtipocadastro;
    document.getElementById("cnpj_cpf").value = pessoaData.cnpj_cpf;
    document.getElementById("logradouro").value = pessoaData.logradouro;
    document.getElementById("bairro").value = pessoaData.bairro;
    document.getElementById("n").value = pessoaData.n;
    document.getElementById("complemento").value =
      pessoaData.complemento || " ";
    document.getElementById("cep").value = pessoaData.cep;
    document.getElementById("municipio").value = pessoaData.municipio;
    document.getElementById("uf").value = pessoaData.uf;
    document.getElementById("telefone").value = pessoaData.telefone;
    document.getElementById("razao_social").value = pessoaData.razao_social;

    document
      .getElementById("editPessoa")
      .addEventListener("submit", function (e) {
        e.preventDefault();
        editarPessoa(pessoaData.idpessoas);
      });
  }
});

async function editarPessoa(id) {
  try {
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
      razao_social: document.getElementById("razao_social").value,
    };

    const response = await fetch(`http://35.175.140.204:3000/pessoa/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) throw new Error("Erro ao atualizar empresa");

    const result = await response.json();
    alert("Empresa atualizada com sucesso!");
    localStorage.removeItem("pessoaEditando");
    window.location.href = "people_listing_screen.html";
  } catch (error) {
    console.error("Erro:", error);
    alert(`Erro: ${error.message}`);
  }
}
