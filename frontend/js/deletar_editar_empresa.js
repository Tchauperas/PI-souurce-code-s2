function deletarEmpresa(id) {
  fetch(`http://35.175.140.204:3000/empresa/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao deletar empresa");
      }
      return response.json();
    })
    .then(() => {
      alert("Empresa deletada com sucesso!");
      window.location.reload();
    })
    .catch((error) => {
      alert(`Erro ao deletar empresa: ${error.message}`);
    });
}

async function editarEmpresa(id) {
  try {
    const response = await fetch(`http://35.175.140.204:3000/empresa/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao carregar dados da empresa");
    }

    const empresa = await response.json();

    localStorage.setItem("empresaEditando", JSON.stringify(empresa));

    window.location.href = "edit_company.html";
  } catch (error) {
    console.error("Erro ao editar empresa:", error);
    alert(`Erro ao editar empresa: ${error.message}`);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const dados = JSON.parse(localStorage.getItem("empresaEditando"));
  const empresaData = dados.values[0];
  if (empresaData) {
    document.getElementById("razao_social").value = empresaData.razao_social;
    document.getElementById("cnpj").value = empresaData.cnpj;
    document.getElementById("logradouro").value = empresaData.logradouro;
    document.getElementById("bairro").value = empresaData.bairro;
    document.getElementById("n").value = empresaData.n;
    document.getElementById("complemento").value =
      empresaData.complemento || "";
    document.getElementById("cep").value = empresaData.cep;
    document.getElementById("municipio").value = empresaData.municipio;
    document.getElementById("uf").value = empresaData.uf;
    document.getElementById("telefone").value = empresaData.telefone;
  }

  document
    .getElementById("empresaEdit")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      atualizarEmpresa(empresaData.idempresa);
    });
});

async function atualizarEmpresa(id) {
  try {
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
    };

    const response = await fetch(`http://35.175.140.204:3000/empresa/${id}`, {
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
    localStorage.removeItem("empresaEditando");
    window.location.href = "company_listing_screen.html";
  } catch (error) {
    console.error("Erro ao atualizar empresa:", error);
    alert(`Erro ao atualizar empresa: ${error.message}`);
  }
}
