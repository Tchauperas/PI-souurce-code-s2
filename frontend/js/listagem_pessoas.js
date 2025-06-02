async function carregarPessoas() {
  try {
    const response = await fetch("http://18.212.54.168:3000/pessoas", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    if (!response.ok) throw new Error("Erro ao carregar pessoas");

    const dados = await response.json();
    console.log("Resposta da API:", dados);
    let pessoas = dados.message;
    const listaContainer = document.getElementById("pessoa-lista");

    if (pessoas.length === 0) {
      listaContainer.innerHTML = "<p>Nenhuma pessoa encontrada.</p>";
      return;
    }

    pessoas.forEach((pessoa) => {
      const div = document.createElement("div");

      let tipoPessoa;
      let tipoCadastro;

      if (pessoa.idtipopessoa === 1) {
        tipoPessoa = "Física";
      } else {
        tipoPessoa = "Jurídica";
      }

      if (pessoa.idtipocadastro === 1) {
        tipoCadastro = "Fornecedor";
      } else if (pessoa.idtipocadastro === 2) {
        tipoCadastro = "Cliente";
      } else {
        tipoCadastro = "Ambos";
      }

      div.className = "pessoa-item";
      div.innerHTML = `
    <h3>${pessoa.razao_social || "Sem razão social"}</h3>
    <ul style="list-style-type: none; padding-left: 0; margin-top: 0.5em;">
        <li><strong>Tipo de Cadastro:</strong> ${tipoCadastro}</li>
        <li><strong>Tipo de Pessoa:</strong> ${tipoPessoa}</li>
        <li><strong>CNPJ/CPF:</strong> ${pessoa.cnpj_cpf}</li>
        <li><strong>Endereço:</strong> ${pessoa.logradouro}, nº ${pessoa.n}${
        pessoa.complemento ? " - " + pessoa.complemento : ""
      }</li>
        <li><strong>Bairro:</strong> ${pessoa.bairro}</li>
        <li><strong>CEP:</strong> ${pessoa.cep}</li>
        <li><strong>Município:</strong> ${pessoa.municipio} - ${pessoa.uf}</li>
        <li><strong>Telefone:</strong> ${pessoa.telefone}</li>
    </ul>
    <div style="margin-top: 20px;">
        <button onClick="editarPessoa(${pessoa.idpessoas})" class="btn-editar">Editar</button>
        <button onClick="deletarPessoa(${pessoa.idpessoas})" class="btn-deletar">Deletar</button>
    </div>
`;
      listaContainer.appendChild(div);
    });
  } catch (error) {
    document.getElementById(
      "pessoa-lista"
    ).innerHTML = `<p style="color:red;">Erro ao carregar pessoas: ${error.message}</p>`;
  }
}

window.onload = carregarPessoas;
