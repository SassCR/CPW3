// Este projeto é apenas uma demonstração frontend.
// Não existe servidor, banco de dados nem autenticação real.

const usuarioKey = 'velocity_usuario';
const favoritosKey = 'velocity_favoritos';
const formatoPreco = valor => '$' + valor.toLocaleString('en-US');

// ===== LOGIN =====
const formulario = document.getElementById('form-login');
if (formulario) {
  const campoSenha = document.getElementById('senha');
  const mostrarSenha = document.getElementById('mostrar-senha');
  const mensagemLogin = document.getElementById('mensagem-login');

  mostrarSenha.addEventListener('click', () => {
    const visivel = campoSenha.type === 'text';
    campoSenha.type = visivel ? 'password' : 'text';
    mostrarSenha.textContent = visivel ? 'Mostrar' : 'Ocultar';
    mostrarSenha.setAttribute('aria-label', visivel ? 'Mostrar senha' : 'Ocultar senha');
  });

  formulario.addEventListener('submit', evento => {
    evento.preventDefault();
    const email = document.getElementById('email').value.trim();
    const senha = campoSenha.value;
    if (!email || !senha || senha.length < 6 || !formulario.checkValidity()) {
      mensagemLogin.textContent = 'Digite um e-mail válido e uma senha de pelo menos 6 caracteres.';
      return;
    }
    // Salva só o e-mail nesta aba, nunca a senha.
    sessionStorage.setItem(usuarioKey, email);
    window.location.href = 'dashboard.html';
  });
}

// ===== DASHBOARD =====
const grade = document.getElementById('grade-carros');
if (grade) {
  const email = sessionStorage.getItem(usuarioKey);
  if (!email) {
    window.location.replace('index.html');
  } else {
    document.getElementById('usuario-logado').textContent = email.split('@')[0];
    iniciarDashboard();
  }
}

function iniciarDashboard() {
  // Preços e modelos mostrados na imagem de referência fornecida.
  const carros = [
    { id: 1, nome: 'PFISTER COMET SAFARI', categoria: 'classico', etiqueta: 'CLÁSSICO / RALLY', preco: 710000, imagem: 'assets/comet-safari.webp', descricao: 'Um esportivo com espírito aventureiro. Mistura linhas clássicas com atitude de corrida e um estilo que não passa despercebido.' },
    { id: 2, nome: 'OCELOT PARIAH', categoria: 'supercarro', etiqueta: 'ALTA PERFORMANCE', preco: 1420000, imagem: 'assets/pariah.webp', descricao: 'Design aerodinâmico, visual marcante e uma proposta feita para quem gosta de velocidade e exclusividade.' },
    { id: 3, nome: 'ÜBERMACHT SC1', categoria: 'supercarro', etiqueta: 'EDIÇÃO PREMIUM', preco: 1603000, imagem: 'Linhas modernas, presença agressiva e acabamento de alto nível para uma garagem de respeito.' }
  ];

  const busca = document.getElementById('busca');
  const categoria = document.getElementById('categoria');
  const ordenacao = document.getElementById('ordenacao');
  const vazio = document.getElementById('mensagem-vazia');
  const contador = document.getElementById('contador-favoritos');
  const modal = document.getElementById('modal-carro');
  let somenteFavoritos = false;
  let favoritos;
  try { favoritos = JSON.parse(localStorage.getItem(favoritosKey) || '[]'); }
  catch { favoritos = []; }
  if (!Array.isArray(favoritos)) favoritos = [];

  function atualizarContador() { contador.textContent = favoritos.length; }

  function desenharCarros() {
    const termo = busca.value.toLocaleLowerCase('pt-BR').trim();
    const selecionados = carros.filter(carro =>
      carro.nome.toLocaleLowerCase('pt-BR').includes(termo) &&
      (categoria.value === 'todos' || carro.categoria === categoria.value) &&
      (!somenteFavoritos || favoritos.includes(carro.id))
    );
    if (ordenacao.value === 'menor') selecionados.sort((a,b) => a.preco - b.preco);
    else if (ordenacao.value === 'maior') selecionados.sort((a,b) => b.preco - a.preco);

    document.getElementById('total-carros').textContent = selecionados.length;
    document.getElementById('titulo-catalogo').textContent = somenteFavoritos ? 'MEUS FAVORITOS' : 'NOVIDADES';
    grade.innerHTML = selecionados.map(carro => `
      <article class="cartao-carro">
        <div class="cartao-imagem">
          <img src="${carro.imagem}" alt="${carro.nome}" loading="lazy">
          <span class="cartao-faixa">${carro.etiqueta}</span>
          <button type="button" class="favoritar ${favoritos.includes(carro.id) ? 'ativo' : ''}" data-favorito="${carro.id}" aria-label="${favoritos.includes(carro.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'} ${carro.nome}" title="Favoritar">${favoritos.includes(carro.id) ? '♥' : '♡'}</button>
        </div>
        <div class="cartao-infos">
          <div class="cartao-nome"><h3>${carro.nome}</h3><p>${carro.etiqueta}</p></div>
          <div class="preco">${formatoPreco(carro.preco)}</div>
        </div>
        <button type="button" class="ver-detalhes" data-detalhes="${carro.id}">VER DETALHES ↗</button>
      </article>
    `).join('');
    vazio.hidden = selecionados.length > 0;
    atualizarContador();
  }

  grade.addEventListener('click', evento => {
    const favorito = evento.target.closest('[data-favorito]');
    if (favorito) {
      const id = Number(favorito.dataset.favorito);
      favoritos = favoritos.includes(id) ? favoritos.filter(item => item !== id) : [...favoritos, id];
      localStorage.setItem(favoritosKey, JSON.stringify(favoritos));
      desenharCarros();
      return;
    }
    const detalhes = evento.target.closest('[data-detalhes]');
    if (detalhes) {
      const carro = carros.find(item => item.id === Number(detalhes.dataset.detalhes));
      if (!carro) return;
      document.getElementById('imagem-modal').src = carro.imagem;
      document.getElementById('imagem-modal').alt = carro.nome;
      document.getElementById('categoria-modal').textContent = carro.etiqueta;
      document.getElementById('titulo-modal').textContent = carro.nome;
      document.getElementById('descricao-modal').textContent = carro.descricao;
      document.getElementById('preco-modal').textContent = formatoPreco(carro.preco);
      modal.showModal();
    }
  });

  [busca, categoria, ordenacao].forEach(elemento => elemento.addEventListener(elemento === busca ? 'input' : 'change', desenharCarros));
  document.getElementById('ver-favoritos').addEventListener('click', () => {
    somenteFavoritos = !somenteFavoritos;
    document.getElementById('ver-favoritos').setAttribute('aria-pressed', String(somenteFavoritos));
    desenharCarros();
    document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' });
  });
  document.getElementById('limpar-filtros').addEventListener('click', () => {
    busca.value = ''; categoria.value = 'todos'; ordenacao.value = 'padrao'; somenteFavoritos = false;
    desenharCarros();
  });
  document.getElementById('fechar-modal').addEventListener('click', () => modal.close());
  document.getElementById('fechar-detalhes').addEventListener('click', () => modal.close());
  modal.addEventListener('click', evento => { if (evento.target === modal) modal.close(); });
  document.getElementById('sair').addEventListener('click', () => {
    sessionStorage.removeItem(usuarioKey);
    window.location.href = 'index.html';
  });
  desenharCarros();
}
