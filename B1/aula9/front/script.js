
const favoritosKey = "velocity_favoritos";

// LOGIN
const formulario = document.getElementById("form-login");

if (formulario) {
  const mensagem = document.getElementById("mensagem-login");

  if (window.location.search.includes("erro=1")) {
    mensagem.textContent = "Código incorreto ou expirado. Solicite outro.";
  }

  formulario.addEventListener("submit", (evento) => {
    const email = document.getElementById("email").value.trim();

    if (!email.includes("@") || !email.includes(".")) {
      evento.preventDefault();
      mensagem.textContent = "Digite um e-mail válido!";
    }
  });
}

// DASHBOARD

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

      // Mostrar cadastro somente ao administrador
      if (dados.tipo === "admin") {
        document.getElementById("area-admin").hidden = false;
      }

      iniciarDashboard(dados.tipo === "admin");
    });
}

async function iniciarDashboard(ehAdmin) {


  // Buscar carros diretamente do SQLite
  let carros = [];

  try {
    const resposta = await fetch("/carros");

    if (!resposta.ok) {
      throw new Error("Erro ao consultar carros");
    }

    carros = await resposta.json();

  } catch (erro) {
    console.error("Erro ao carregar carros:", erro);
    grade.innerHTML = "<p>Erro ao carregar os veículos do banco.</p>";
    return;
  }


  const busca = document.getElementById("busca");
  const categoria = document.getElementById("categoria");
  const ordenacao = document.getElementById("ordenacao");
  const modal = document.getElementById("modal-carro");

  // CADASTRO DE CARROS

  const botaoCadastro = document.getElementById("abrir-cadastro");
  const formCadastro = document.getElementById("form-adicionar-carro");
  const mensagemCadastro = document.getElementById("mensagem-cadastro");

  botaoCadastro.addEventListener("click", () => {
    formCadastro.hidden = !formCadastro.hidden;
  });

  formCadastro.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const dados = new FormData(formCadastro);

    const novoCarro = {
      nome: dados.get("nome"),
      categoria: dados.get("categoria"),
      etiqueta: dados.get("etiqueta"),
      preco: Number(dados.get("preco")),
      imagem: dados.get("imagem"),
      descricao: dados.get("descricao")
    };

    try {
      const resposta = await fetch("/carros", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(novoCarro)
      });

      const resultado = await resposta.json();

      if (!resposta.ok) {
        throw new Error(resultado.erro || "Erro ao cadastrar carro");
      }

      // Atualizar lista diretamente do SQLite
      const consulta = await fetch("/carros");

      if (!consulta.ok) {
        throw new Error("Carro salvo, mas houve erro ao atualizar a lista");
      }

      carros = await consulta.json();

      busca.value = "";
      categoria.value = "todos";
      somenteFavoritos = false;

      mostrarCarros();

      formCadastro.reset();
      mensagemCadastro.textContent = "Carro cadastrado com sucesso!";

    } catch (erro) {
      mensagemCadastro.textContent = erro.message;
    }
  });


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

                
${ehAdmin ? `
    <button type="button" class="excluir-carro" data-excluir="${carro.id}">
        EXCLUIR CARRO
    </button>
` : ""}

            </article>
        `).join("");

    document.getElementById("mensagem-vazia").hidden = lista.length > 0;
  }

  // FAVORITOS E DETALHES

  grade.addEventListener("click", async (evento) => {

    const botaoFavorito = evento.target.closest("[data-favorito]");
    const botaoDetalhes = evento.target.closest("[data-detalhes]");
    const botaoExcluir = evento.target.closest("[data-excluir]");

    // EXCLUIR CARRO
    if (botaoExcluir && ehAdmin) {
      const id = Number(botaoExcluir.dataset.excluir);

      const confirmar = confirm(
        "Tem certeza que deseja excluir este carro?"
      );

      if (!confirmar) return;

      try {
        const resposta = await fetch(`/carros/${id}`, {
          method: "DELETE"
        });

        const resultado = await resposta.json();

        if (!resposta.ok) {
          throw new Error(resultado.erro || "Erro ao excluir carro!");
        }

        // Atualizar o catálogo
        carros = carros.filter(carro => carro.id !== id);

        // Remover dos favoritos
        favoritos = favoritos.filter(item => item !== id);
        localStorage.setItem(favoritosKey, JSON.stringify(favoritos));

        mostrarCarros();

        alert("Carro excluído com sucesso!");

      } catch (erro) {
        alert(erro.message);
      }

      return;
    }


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
