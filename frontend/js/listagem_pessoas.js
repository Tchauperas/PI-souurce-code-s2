async function carregarPessoas() {
  try {
    const response = await fetch("http://localhost:3000/pessoas");
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
            <br>
            <br>
            <h3>${pessoa.razao_social || "Sem razão social"}</h3>
            <p><strong>Tipo de Cadastro:</strong> ${tipoCadastro}</p>
            <p><strong>Tipo de Pessoa:</strong> ${tipoPessoa}</p>
            <p><strong>CNPJ/CPF:</strong> ${pessoa.cnpj_cpf}</p>
            <p><strong>Endereço:</strong> ${pessoa.logradouro}, nº ${pessoa.n}${
        pessoa.complemento ? " - " + pessoa.complemento : ""
      }</p>
            <p><strong>Bairro:</strong> ${pessoa.bairro}</p>
            <p><strong>CEP:</strong> ${pessoa.cep}</p>
            <p><strong>Município:</strong> ${pessoa.municipio} - ${
        pessoa.uf
      }</p>
            <p><strong>Telefone:</strong> ${pessoa.telefone}</p>
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
