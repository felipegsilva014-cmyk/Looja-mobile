let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
const lista = document.getElementById("lista");
const totalSpan = document.getElementById("total");

function adicionarCarrinho(nome, preco) {
  const item = carrinho.find(p => p.nome === nome);

  if (item) {
    item.qtd++;
  } else {
    carrinho.push({ nome, preco, qtd: 1 });
  }

  salvar();
  renderizar();
}

function remover(nome) {
  carrinho = carrinho.filter(p => p.nome !== nome);
  salvar();
  renderizar();
}

function alterarQtd(nome, delta) {
  const item = carrinho.find(p => p.nome === nome);
  item.qtd += delta;

  if (item.qtd <= 0) remover(nome);

  salvar();
  renderizar();
}

function renderizar() {
  lista.innerHTML = "";
  let total = 0;

  carrinho.forEach(p => {
    total += p.preco * p.qtd;

    const li = document.createElement("li");
    li.innerHTML = `
      ${p.nome} (${p.qtd}) - R$ ${p.preco * p.qtd}
      <div>
        <button onclick="alterarQtd('${p.nome}',1)">+</button>
        <button onclick="alterarQtd('${p.nome}',-1)">-</button>
        <button onclick="remover('${p.nome}')">X</button>
      </div>
    `;
    lista.appendChild(li);
  });

  totalSpan.textContent = total;
}

function salvar() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

renderizar();
