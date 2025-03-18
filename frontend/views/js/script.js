document.addEventListener("DOMContentLoaded", function () {
    verificarAcesso();
    configurarLogin();
    configurarCadastroFrutas();
    configurarVendaFrutas();
    carregarVendedores();
});

// VERIFICAÇÃO DE ACESSO
function verificarAcesso() {
    const perfil = localStorage.getItem("perfil");
    const token = localStorage.getItem("token");
    const pathname = window.location.pathname;

    if (!token) {
        alert("Acesso negado! Faça login.");
        window.location.href = "index.html";
        return;
    }

    if (pathname.includes("admin.html") && perfil !== "Administrador") {
        alert("Acesso negado! Apenas usuários administradores podem acessar.");
        window.location.href = "index.html";
    }

    if (pathname.includes("vendedor.html") && perfil !== "Vendedor") {
        alert("Acesso negado! Apenas usuários vendedores podem acessar.");
        window.location.href = "index.html";
    }
}
// VERIFICAÇÃO DE ACESSO

// CONFIGURAÇÃO DE LOGIN
function configurarLogin() {
    const formLogin = document.getElementById("loginForm");
    if (!formLogin) return;

    formLogin.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = document.getElementById("usuario").value;
        const senha = document.getElementById("senha").value;

        try {
            const response = await fetch("http://localhost:3000/usuarios/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, senha })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("perfil", data.perfil);
                window.location.href = data.perfil === "Administrador" ? "admin.html" : "vendedor.html";
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error("Erro no login:", error);
            alert("Erro ao conectar ao servidor.");
        }
    });
}
// CONFIGURAÇÃO DE LOGIN

// CONFIGURAÇÃO DE CADASTRO DE FRUTAS
function configurarCadastroFrutas() {
    const formCadastro = document.getElementById("cadastroFruta");
    if (!formCadastro) return;

    formCadastro.addEventListener("submit", async function (event) {
        event.preventDefault();

        const fruta = {
            nome: document.getElementById("nomeFruta").value,
            classificacao: document.getElementById("classificacao").value,
            quantidade: document.getElementById("quantidade").value,
            valor: document.getElementById("valor").value
        };

        const response = await fetch("http://localhost:3000/api/frutas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(fruta)
        });

        const data = await response.json();

        if (response.ok) {
            alert("Fruta cadastrada com sucesso!");
            formCadastro.reset();
        } else {
            alert("Erro ao cadastrar fruta: " + data.error);
        }

    });
}
// CONFIGURAÇÃO DE CADASTRO DE FRUTA

// CONFIGURAÇÃO DE VENDA DE FRUTAS
function configurarVendaFrutas() {
    const vendaForm = document.getElementById("vendaForm");
    if (!vendaForm) return;

    carregarFrutas();
    carregarVendedores();

    vendaForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const frutaSelecionada = JSON.parse(document.getElementById("listaFrutas").value);
        const vendedor_id = document.getElementById("listaVendedores").value;
        const quantidade = parseInt(document.getElementById("quantidadeVenda").value);
        const desconto = parseInt(document.getElementById("desconto").value);

        if (!frutaSelecionada || !frutaSelecionada.id) {
            alert("Por favor, selecione uma fruta.");
            return;
        }

        if (!vendedor_id) {
            alert("Por favor, selecione um vendedor.");
            return;
        }

        let valor_total = frutaSelecionada.valor * quantidade;
        valor_total -= (valor_total * desconto) / 100;

        const response = await fetch("http://localhost:3000/api/vendas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                frutaId: frutaSelecionada.id,
                quantidade,
                desconto,
                valor_total,
                vendedor_id
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Venda realizada com sucesso!");
            vendaForm.reset();
            carregarFrutas();
        } else {
            alert("Erro na venda: " + data.error);
        }

    });
}
// CONFIGURAÇÃO DE VENDA DE FRUTAS

//  CONFIGURAÇÃO DE CARREGAR FRUTAS
async function carregarFrutas() {
    const listaFrutas = document.getElementById("listaFrutas");
    if (!listaFrutas) return;

    try {
        const response = await fetch("http://localhost:3000/api/frutas");
        const frutas = await response.json();

        listaFrutas.innerHTML = "<option value=''>Selecione uma fruta</option>";

        frutas.forEach(fruta => {
            const option = document.createElement("option");
            option.value = JSON.stringify({ id: fruta.id, valor: fruta.valor });
            option.textContent = `${fruta.nome} - ${fruta.quantidade} disponíveis - R$${fruta.valor}`;
            listaFrutas.appendChild(option);
        });
    } catch (error) {
        console.error("Erro ao buscar frutas:", error);
        alert("Erro ao carregar frutas.");
    }
}
// CONFIGURAÇÃO DE CARREGAR FRUTAS

// CONFIGURAÇÃO DE CARREGAR VENDEDORES
async function carregarVendedores() {
    const listarVendedores = document.getElementById("listaVendedores");
    if (!listarVendedores) return;

    try {
        const response = await fetch("http://localhost:3000/usuarios/vendedores");
        const vendedores = await response.json();

        listarVendedores.innerHTML = "<option value=''>Selecione um vendedor</option>";

        vendedores.forEach(vendedor => {
            const option = document.createElement("option");
            option.value = JSON.stringify({ id: vendedor.id, name: vendedor.nome});
            option.textContent = `${vendedor.nome} - ${vendedor.email}`;
            listarVendedores.appendChild(option);
        });
    } catch (error) {
        console.error("Erro ao buscar vendedores:", error);
        alert("Erro ao carregar vendedores.");
    }
}
