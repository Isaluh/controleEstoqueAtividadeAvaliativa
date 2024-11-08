package com.lisa.Estoque.Entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Produto {
    private String nome;
    private Float preco;
    private Integer quantidade;
}
