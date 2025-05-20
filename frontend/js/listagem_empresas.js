async function carregarEmpresas() {
  try {
    const response = await fetch("http://localhost:3000/empresas", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    if (!response.ok) {
      throw new Error("Erro ao carregar empresas");
    }

    const empresas = await response.json();
    const listaContainer = document.getElementById("empresa-lista");

    if (empresas.length === 0) {
      listaContainer.innerHTML = "<p>Nenhuma empresa encontrada.</p>";
      return;
    }

    console.log(empresas);

    empresas.message.forEach((empresa) => {
      const div = document.createElement("div");
      div.className = "empresa-item";
      div.innerHTML = `
            <br>
            <br>
            <h3>${empresa.razao_social}</h3>
            <p><strong>CNPJ:</strong> ${empresa.cnpj}</p>
            <p><strong>Endereço:</strong> ${empresa.logradouro}, nº ${
        empresa.n
      }${empresa.complemento ? " - " + empresa.complemento : ""}</p>
            <p><strong>Bairro:</strong> ${empresa.bairro}</p>
            <p><strong>CEP:</strong> ${empresa.cep}</p>
            <p><strong>Município:</strong> ${empresa.municipio} - ${
        empresa.uf
      }</p>
            <p><strong>Telefone:</strong> ${empresa.telefone}</p>
          `;
      listaContainer.appendChild(div);
    });
  } catch (error) {
    document.getElementById(
      "empresa-lista"
    ).innerHTML = `<p style="color:red;">Erro ao carregar empresas: ${error.message}</p>`;
  }
}

window.onload = carregarEmpresas;
