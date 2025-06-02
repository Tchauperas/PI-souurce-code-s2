function deletarPessoa(id) {
  fetch(`http://44.212.31.85:3000/pessoa/${id}`, {
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

async function editarPessoa(id) {
  try {
    const response = await fetch(`http://44.212.31.85:3000/pessoa/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao carregar dados da empresa");
    }

    const pessoa = await response.json();

    localStorage.setItem("pessoaEditando", JSON.stringify(pessoa));

    window.location.href = "edit_people.html";
  } catch (error) {
    console.error("Erro ao editar empresa:", error);
    alert(`Erro ao editar empresa: ${error.message}`);
  }
}