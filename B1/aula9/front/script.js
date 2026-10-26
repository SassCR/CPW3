
const favoritosKey = "velocity_favoritos";

// LOGIN
const formulario = document.getElementById("form-login");

if (formulario) {
  const mensagem = document.getElementById("mensagem-login");

  if (window.location.search.includes("erro=1")) {
    mensagem.textContent = "E-mail ou senha incorretos!";
  }


  formulario.addEventListener("submit", (evento) => {
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;

    const admin = email === "admin" && senha === "admin";
    const cliente = email.includes("@") && senha.length >= 6;

    if (!admin && !cliente) {
      evento.preventDefault();
      mensagem.textContent = "Usuário ou senha inválidos!";
    }
  });
}

// DASHBOARD
const grade = document.getElementById("grade-carros");

if (grade) {
  fetch("/usuario")
    .then(resposta => {
      if (!resposta.ok) {
        window.location.href = "/login";
        return null;
      }
      return resposta.json();
    })
    .then(dados => {
      if (!dados) return;

      document.getElementById("usuario-logado").textContent =
        dados.usuario.split("@")[0];

      iniciarDashboard();
    });
}

function iniciarDashboard() {

  const carros = [
    {
      id: 1,
      nome: "PFISTER COMET SAFARI",
      categoria: "classico",
      etiqueta: "CLÁSSICO / RALLY",
      preco: 710000,
      imagem: "assets/comet-safari.webp",
      descricao: "Um esportivo com espírito aventureiro."
    },
    {
      id: 2,
      nome: "OCELOT PARIAH",
      categoria: "supercarro",
      etiqueta: "ALTA PERFORMANCE",
      preco: 1420000,
      imagem: "assets/pariah.webp",
      descricao: "Design aerodinâmico e visual marcante."
    },
    {
      id: 3,
      nome: "ÜBERMACHT SC1",
      categoria: "supercarro",
      etiqueta: "EDIÇÃO PREMIUM",
      preco: 1603000,
      imagem: "assets/sc1.webp",
      descricao: "Linhas modernas e acabamento de alto nível."
    }
  ];

  const busca = document.getElementById("busca");
  const categoria = document.getElementById("categoria");
  const ordenacao = document.getElementById("ordenacao");
  const modal = document.getElementById("modal-carro");

  let favoritos = JSON.parse(localStorage.getItem(favoritosKey) || "[]");
  let somenteFavoritos = false;

  // MOSTRAR CARROS

  function mostrarCarros() {
    let lista = carros.filter(carro =>
      carro.nome.toLowerCase().includes(busca.value.toLowerCase()) &&
      (categoria.value === "todos" || carro.categoria === categoria.value) &&
      (!somenteFavoritos || favoritos.includes(carro.id))
    );

    if (ordenacao.value === "menor") {
      lista.sort((a, b) => a.preco - b.preco);
    }

    if (ordenacao.value === "maior") {
      lista.sort((a, b) => b.preco - a.preco);
    }

    document.getElementById("total-carros").textContent = lista.length;
    document.getElementById("titulo-catalogo").textContent =
      somenteFavoritos ? "MEUS FAVORITOS" : "NOVIDADES";

    document.getElementById("contador-favoritos").textContent = favoritos.length;

    grade.innerHTML = lista.map(carro => `
            <article class="cartao-carro">
                <div class="cartao-imagem">
                    <img src="${carro.imagem}" alt="${carro.nome}">
                    <span class="cartao-faixa">${carro.etiqueta}</span>

                    <button class="favoritar ${favoritos.includes(carro.id) ? 'ativo' : ''}"
                        data-favorito="${carro.id}">
                        ${favoritos.includes(carro.id) ? '♥' : '♡'}
                    </button>
                </div>

                <div class="cartao-infos">
                    <div class="cartao-nome">
                        <h3>${carro.nome}</h3>
                        <p>${carro.etiqueta}</p>
                    </div>
                    <div class="preco">
                        $${carro.preco.toLocaleString("en-US")}
                    </div>
                </div>

                <button class="ver-detalhes" data-detalhes="${carro.id}">
                    VER DETALHES ↗
                </button>
            </article>
        `).join("");

    document.getElementById("mensagem-vazia").hidden = lista.length > 0;
  }

  // FAVORITOS E DETALHES

  grade.addEventListener("click", (evento) => {

    const botaoFavorito = evento.target.closest("[data-favorito]");
    const botaoDetalhes = evento.target.closest("[data-detalhes]");

    if (botaoFavorito) {
      const id = Number(botaoFavorito.dataset.favorito);

      if (favoritos.includes(id)) {
        favoritos = favoritos.filter(item => item !== id);
      } else {
        favoritos.push(id);
      }

      localStorage.setItem(favoritosKey, JSON.stringify(favoritos));
      mostrarCarros();
    }

    if (botaoDetalhes) {
      const id = Number(botaoDetalhes.dataset.detalhes);
      const carro = carros.find(item => item.id === id);

      document.getElementById("imagem-modal").src = carro.imagem;
      document.getElementById("imagem-modal").alt = carro.nome;
      document.getElementById("categoria-modal").textContent = carro.etiqueta;
      document.getElementById("titulo-modal").textContent = carro.nome;
      document.getElementById("descricao-modal").textContent = carro.descricao;
      document.getElementById("preco-modal").textContent =
        "$" + carro.preco.toLocaleString("en-US");

      modal.showModal();
    }
  });

  // FILTROS

  busca.addEventListener("input", mostrarCarros);
  categoria.addEventListener("change", mostrarCarros);
  ordenacao.addEventListener("change", mostrarCarros);

  document.getElementById("ver-favoritos").addEventListener("click", () => {
    somenteFavoritos = !somenteFavoritos;
    mostrarCarros();
  });

  document.getElementById("limpar-filtros").addEventListener("click", () => {
    busca.value = "";
    categoria.value = "todos";
    ordenacao.value = "padrao";
    somenteFavoritos = false;
    mostrarCarros();
  });

  // FECHAR DETALHES

  document.getElementById("fechar-modal").addEventListener("click", () => modal.close());
  document.getElementById("fechar-detalhes").addEventListener("click", () => modal.close());

  // SAIR

  document.getElementById("sair").addEventListener("click", () => {
    window.location.href = "/logout";
  });

  mostrarCarros();
}
