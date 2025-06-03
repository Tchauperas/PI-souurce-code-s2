document.getElementById("empresaForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = {
    razao_social: document.getElementById("razao_social").value,
    cnpj: document.getElementById("cnpj").value,
    logradouro: document.getElementById("logradouro").value,
    bairro: document.getElementById("bairro").value,
    n: document.getElementById("n").value,
    complemento: document.getElementById("complemento").value,
    cep: document.getElementById("cep").value,
    municipio: document.getElementById("municipio").value,
    uf: document.getElementById("uf").value,
    telefone: document.getElementById("telefone").value,
    id_usuario: "1",
  };

  console.log("Dados do formulário:", formData);

  fetch("http://35.175.140.204:3000/empresa", {
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
      alert("Empresa cadastrada com sucesso!");
      window.location.href = "company_listing_screen.html";
    })
    .catch((error) => {
      console.error("Erro:", error);
      alert("Erro ao cadastrar empresa: " + error.message);
    });
});
