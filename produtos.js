window.onload = () => {
    //carregaProdutosFetchAPI();
    setInterval(carregaProdutosFetchAPI, 10000);
}

function carregaProdutosXMLHttpRequest() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        let produtos = JSON.parse(this.responseText);
        renderizaProdutos(produtos);
    }
    xhttp.open("GET", "http://localhost:3000/produtos", true);
    xhttp.send();
}

function carregaProdutosFetchAPI() {
    fetch("http://localhost:3000/produtos")
        .then(resp => resp.json())
        //.then(produtos => renderizaProdutos(produtos))
        .then(produtos => renderizaProdutosComMap(produtos))
}

function renderizaProdutosComMap(produtos) {
    document.querySelector("#produtos").innerHTML = produtos.map(
        prod => {
            return  `
                <div class="w3-col l4 m6 s12 w3-container w3-padding-16">
                    <div class="w3-card">
                        <div class="w3-container w3-center">
                            <img src="${prod.imagem}" style="width: 70%">
                            <h5>${prod.nome}</h5>
                            <h3 class="w3-blue">R$ ${prod.preco.toFixed(2)}</h3>
                        </div>
                    </div>
                </div>      
            `
    }).join(' ');
}

function renderizaProdutos(produtos) {
    let htmlProdutos = '';
    for(let prod of produtos) {
        htmlProdutos+= `
        <div class="w3-col l4 m6 s12 w3-container w3-padding-16">
            <div class="w3-card">
                <div class="w3-container w3-center">
                    <img src="${prod.imagem}" style="width: 70%">
                    <h5>${prod.nome}</h5>
                    <h3 class="w3-blue">R$ ${prod.preco.toFixed(2)}</h3>
                </div>
            </div>
        </div>      
    `
    }
    document.querySelector("#produtos").innerHTML = htmlProdutos;
}