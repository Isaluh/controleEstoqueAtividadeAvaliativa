const abrirCadastro = document.querySelector('.cadastro')
const span = document.querySelector('.spanCadastro')
const aside = document.querySelector('.asideCadastro')

const nomeProduto = document.getElementById('produto')
const precoProduto = document.getElementById('preco')
const quantidadeProduto = document.getElementById('qnt')

const editar = document.querySelectorAll('.editar')
const excluir = document.querySelectorAll('.excluir')


abrirCadastro.addEventListener('click', () =>{
    aside.classList.remove('hidden')
    span.classList.remove('hidden')

    nomeProduto.removeAttribute('disabled')
    nomeProduto.removeAttribute('style')
    precoProduto.removeAttribute('disabled')
    precoProduto.removeAttribute('style')
    quantidadeProduto.removeAttribute('disabled')
    quantidadeProduto.removeAttribute('style')
    aside.childNodes.item(3).childNodes.item(3).textContent = "Cadastrar"
})

aside.childNodes.item(3).childNodes.item(1).addEventListener('click', cancelar)


aside.childNodes.item(3).childNodes.item(3).addEventListener('click', () => {
    const produtoData = {
        nome: nomeProduto.value,
        preco: precoProduto.value,
        quantidade: quantidadeProduto.value
    };

    let erroOcorreu = false;

    switch (aside.childNodes.item(3).childNodes.item(3).textContent) {
        case "Atualizar":
            (async () => {
                try {
                    const response = await fetch(`http://localhost:8080/produtos/att/${produtoData.nome}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(produtoData)
                    });

                    if (!response.ok) {
                        const errorData = await response.json(); 
                        throw new Error(errorData.message || 'Erro ao cadastrar o produto');
                    }

                    const produtosResponse = await fetch('http://localhost:8080/produtos');
                    const produtos = await produtosResponse.json();
                    atualizarListaDeProdutos(produtos);

                    cancelar();

                } catch (error) {
                    alert(error.message);
                    erroOcorreu = true;
                }
            })();
            break;

        case "Cadastrar":
            (async () => {
                try {
                    const response = await fetch('http://localhost:8080/produtos', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(produtoData)
                    });

                    if (!response.ok) {
                        const errorData = await response.json(); 
                        throw new Error(errorData.message || 'Erro ao cadastrar o produto');
                    }

                    const data = await response.json();
                    console.log('Produto cadastrado com sucesso!', data);

                    const produtosResponse = await fetch('http://localhost:8080/produtos');
                    const produtos = await produtosResponse.json();
                    atualizarListaDeProdutos(produtos);

                    cancelar();

                } catch (error) {
                    alert(error.message);
                    erroOcorreu = true;
                }
            })();
            break;

        case "Excluir":
            (async () => {
                try {
                    const response = await fetch(`http://localhost:8080/produtos/del/${produtoData.nome}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(produtoData)
                    });

                    if (!response.ok) {
                        const errorData = await response.json(); 
                        throw new Error(errorData.message || 'Erro ao cadastrar o produto');
                    }

                    const produtosResponse = await fetch('http://localhost:8080/produtos');
                    const produtos = await produtosResponse.json();
                    atualizarListaDeProdutos(produtos);

                    cancelar();

                } catch (error) {
                    alert(error.message);
                    erroOcorreu = true;
                }
            })();
            break;
    }
});


function atualizarListaDeProdutos(produtos) {
    const listaProdutos = document.querySelector('.lista');
    
    listaProdutos.innerHTML = '';

    if (produtos.length === 0) {
        const mensagemVazia = document.createElement('p');
        mensagemVazia.textContent = 'Nenhum produto cadastrado no momento...';
        listaProdutos.appendChild(mensagemVazia);
    } else {
        produtos.forEach(produto => {
            const produtoItem = document.createElement('div');
            produtoItem.innerHTML = `
                <ul>
                    <li><strong>Produto:</strong> ${produto.nome}</li>
                    <li><strong>Preço:</strong> R$${produto.preco}</li>
                    <li><strong>Quantidade:</strong> ${produto.quantidade}</li>
                </ul>
                <div>
                    <img src="/imgs/editar.svg" alt="Editar" width="20" class="editar" onclick='abrirEditar({"nome": "${produto.nome}","preco": ${produto.preco},"quantidade": ${produto.quantidade}})'>
                    <img src="/imgs/excluir.svg" alt="Excluir" width="20" class="excluir" onclick='abrirExcluir({"nome": "${produto.nome}","preco": ${produto.preco},"quantidade": ${produto.quantidade}})'>
                </div>
            `;
            listaProdutos.appendChild(produtoItem);
        });
    }
}



function cancelar(){
    aside.classList.add('hidden')
    span.classList.add('hidden')
    nomeProduto.value = ''
    precoProduto.value = ''
    quantidadeProduto.value = ''
}

function abrirEditar(produtoJson){
    let produto = produtoJson

    if(typeof(produtoJson) == "string"){
        produto = JSON.parse(produtoJson);
    }

    aside.classList.remove('hidden')
    span.classList.remove('hidden')

    nomeProduto.value = produto.nome
    precoProduto.value = produto.preco
    quantidadeProduto.value = produto.quantidade
    
    nomeProduto.setAttribute('disabled', 'disabled')
    nomeProduto.setAttribute('style', "cursor: not-allowed;")
    precoProduto.removeAttribute('disabled')
    precoProduto.removeAttribute('style')
    quantidadeProduto.removeAttribute('disabled')
    quantidadeProduto.removeAttribute('style')
    aside.childNodes.item(3).childNodes.item(3).textContent = "Atualizar"
}

function abrirExcluir(produtoJson){
    let produto = produtoJson

    if(typeof(produtoJson) == "string"){
        produto = JSON.parse(produtoJson);
    }

    aside.classList.remove('hidden')
    span.classList.remove('hidden')

    nomeProduto.value = produto.nome
    precoProduto.value = produto.preco
    quantidadeProduto.value = produto.quantidade
    
    nomeProduto.setAttribute('disabled', 'disabled')
    nomeProduto.setAttribute('style', "cursor: not-allowed;")
    precoProduto.setAttribute('disabled', 'disabled')
    precoProduto.setAttribute('style', "cursor: not-allowed;")
    quantidadeProduto.setAttribute('disabled', 'disabled')
    quantidadeProduto.setAttribute('style', "cursor: not-allowed;")
    aside.childNodes.item(3).childNodes.item(3).textContent = "Excluir"
}