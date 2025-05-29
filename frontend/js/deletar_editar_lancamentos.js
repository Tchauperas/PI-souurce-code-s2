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

function editarLancamento(id) {
    
}
