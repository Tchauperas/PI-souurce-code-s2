document
  .getElementById("login-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const login = document.getElementById("login").value;
    const password = document.getElementById("senha").value;

    try {
      const resposta = await fetch("http://172.31.88.252:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });

      const data = await resposta.json();

      if (resposta.ok && data.token) {
        localStorage.setItem("authToken", data.token);
        window.location.href = "home_screen.html";
      } else {
        document.getElementById("mensagem-erro").textContent =
          data.mensagem || "Login ou senha inválidos.";
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      document.getElementById("mensagem-erro").textContent =
        "Erro ao conectar com o servidor.";
    }
  });
