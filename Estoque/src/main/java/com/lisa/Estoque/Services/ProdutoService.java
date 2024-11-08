package com.lisa.Estoque.Services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.lisa.Estoque.Entities.Produto;

@Service
public class ProdutoService {
    private HashMap<String, Produto> produtos = new HashMap<>();

    public ResponseEntity<?> cadastrarProduto(String nome, Float preco, Integer quantidade){
        if(nome == null || preco == null || quantidade == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap("message", "Há campos em branco."));
        }
        if(preco <= 0){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap("message", "Produto não pode ter valor 0 ou menos"));
        }
        if(produtos.containsKey(nome)){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap("message", "Produto já cadastrado"));
        }

        produtos.put(nome, new Produto(nome, preco, quantidade));
        return ResponseEntity.status(HttpStatus.OK).body(Collections.singletonMap("message", "Produto cadastrado!"));
    }

    public ResponseEntity<?> atualizarProduto(String nome, Float preco, Integer quantidade){
        if(nome == null || preco == null || quantidade == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap("message", "Preço nãHá campos em branco."));
        }
        if(preco <= 0){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap("message", "Preço não pode ser atualizado para 0 ou menos"));
        }

        if(!produtos.containsKey(nome)){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap("message", "Produto não encontrado"));
        }

        produtos.replace(nome, new Produto(nome, preco, quantidade));
        return ResponseEntity.status(HttpStatus.OK).body(Collections.singletonMap("message", "Produto alterado!"));
    }

    public List<Produto> listarProdutos(){
        return new ArrayList<>(produtos.values());
    }

    public ResponseEntity<?> removerProduto(String nome, Float preco, Integer quantidade){
        if(nome == null || preco == null || quantidade == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap("message", "Há campos em branco."));
        }
        if(!produtos.containsKey(nome)){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap("message", "Produto não encontrado"));
        }
        produtos.remove(nome);
        return ResponseEntity.status(HttpStatus.OK).body(Collections.singletonMap("message", "Produto removido!"));
    }
}
