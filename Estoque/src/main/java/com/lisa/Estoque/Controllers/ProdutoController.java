package com.lisa.Estoque.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lisa.Estoque.Entities.Produto;
import com.lisa.Estoque.Services.ProdutoService;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    @PostMapping()
    public ResponseEntity<?> addProduto(@RequestBody Produto produto) {
        return produtoService.cadastrarProduto(produto.getNome(), produto.getPreco(), produto.getQuantidade());
    }

    @PostMapping("/att/{name}")
    public ResponseEntity<?> attProduto(@RequestBody Produto produto){
        return produtoService.atualizarProduto(produto.getNome(), produto.getPreco(), produto.getQuantidade());
    }

    @GetMapping
    public List<Produto> allProdutos(){
        return produtoService.listarProdutos();
    }

    @PostMapping("/del/{name}")
    public ResponseEntity<?> delProduto(@RequestBody Produto produto){
        return produtoService.removerProduto(produto.getNome(), produto.getPreco(), produto.getQuantidade());
    }
}
