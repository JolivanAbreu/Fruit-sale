document.getElementById("loginForm").addEventListener("submit", async function (event) {
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
            // Salva o token e o perfil do usuário no localStorage
            localStorage.setItem("token", data.token);
            localStorage.setItem("perfil", data.perfil);

            // Verifica se é um Administrador
            if (data.perfil === "Administrador") {
                window.location.href = "../views/admin.html";
            } else {
                alert("Acesso negado! Apenas administradores podem entrar.");
            }
        } else {
            alert(data.error);
        }
    } catch (error) {
        console.error("Erro no login:", error);
        alert("Erro ao conectar ao servidor.");
    }
});
