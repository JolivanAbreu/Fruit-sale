document.addEventListener("DOMContentLoaded", function () {
    verificarLogin();
});

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    if (username === "admin" && password === "1234") {
        sessionStorage.setItem("perfil", "admin");
    } else if (username === "vendedor" && password === "1234") {
        sessionStorage.setItem("perfil", "vendedor");
    } else {
        alert("Usuário ou senha inválidos!");
        return;
    }
    
    document.getElementById("login").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
}

function logout() {
    sessionStorage.removeItem("perfil");
    location.reload();
}

function showCadastroFrutas() {
    document.getElementById("cadastroFrutas").style.display = "block";
    document.getElementById("listaFrutas").style.display = "none";
}

function listarFrutas() {
    document.getElementById("cadastroFrutas").style.display = "none";
    document.getElementById("listaFrutas").style.display = "block";
    
    fetch("http://localhost:3000/frutas")
        .then(response => response.json())
        .then(data => {
            let frutasHtml = "";
            data.forEach(fruta => {
                frutasHtml += `<p>${fruta.nome} - ${fruta.classificacao} - R$${fruta.valor}</p>`;
            });
            document.getElementById("frutas").innerHTML = frutasHtml;
        })
        .catch(error => console.error("Erro ao carregar frutas:", error));
}

function cadastrarFruta() {
    const fruta = {
        nome: document.getElementById("nomeFruta").value,
        classificacao: document.getElementById("classificacao").value,
        quantidade: document.getElementById("quantidade").value,
        valor: document.getElementById("valor").value
    };

    fetch("http://localhost:3000/frutas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fruta)
    })
    .then(response => response.json())
    .then(data => {
        alert("Fruta cadastrada com sucesso!");
        listarFrutas();
    })
    .catch(error => console.error("Erro ao cadastrar fruta:", error));
}
