async function carregarEmpresas() {
  try {
    const response = await fetch("http://44.212.31.85:3000/empresas", {
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
    <h3>${empresa.razao_social}</h3>
    <hr>
    <ul style="list-style-type: none; padding-left: 0;">
        <li><strong>CNPJ:</strong> ${empresa.cnpj}</li>
        <li><strong>Endereço:</strong> ${empresa.logradouro}, nº ${empresa.n}${
        empresa.complemento ? " - " + empresa.complemento : ""
      }</li>
        <li><strong>Bairro:</strong> ${empresa.bairro}</li>
        <li><strong>CEP:</strong> ${empresa.cep}</li>
        <li><strong>Município:</strong> ${empresa.municipio} - ${
        empresa.uf
      }</li>
        <li><strong>Telefone:</strong> ${empresa.telefone}</li>
    </ul>
    <div class = "botoes-card" style="margin-top: 10px;">
        <button onClick="editarEmpresa(${empresa.idempresa})" class="btn-editar">Editar</button>
        <button onClick="deletarEmpresa(${empresa.idempresa})" class="btn-deletar">Deletar</button>
    </div>
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
