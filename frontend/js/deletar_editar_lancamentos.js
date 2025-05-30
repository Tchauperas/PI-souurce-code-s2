function deletarLancamento(id) {
  fetch(`http://localhost:3000/lancamento/${id}`, {
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
      alert("Lançamento deletada com sucesso!");
      window.location.reload();
    })
    .catch((error) => {
      alert(`Erro ao deletar lançamento: ${error.message}`);
    });
}

async function editarLancamento(id) {
  try {
    const response = await fetch(`http://localhost:3000/lancamento/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao carregar dados do lancamento");
    }

    const pessoa = await response.json();

    localStorage.setItem("lancamentoEditando", JSON.stringify(pessoa));

    window.location.href = "edit_financial.html";
  } catch (error) {
    console.error("Erro ao editar lancamento:", error);
    alert(`Erro ao editar lancamento: ${error.message}`);
  }
}
