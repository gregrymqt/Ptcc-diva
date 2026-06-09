# 💳 feature/checkout — Finalização de Compra

Responsável pelo **processo de finalização de pedido**: coleta o endereço de entrega, a forma de pagamento e cria o registro do pedido.

---

## Fluxo

```
checkout.html → checkout.js
                    ├── [Guard] verifica se o usuário está logado
                    ├── getCart() / getCartTotals() → busca itens e valores do carrinho
                    ├── CheckoutComponent            → renderiza o formulário de checkout
                    └── [Submit Form]
                            ├── valida e aplica máscara no CEP
                            ├── valida e aplica máscara no cartão de crédito
                            └── createOrder()        → salva o pedido no storage
```

---

## Proteção de Rota

A página de checkout **exige que o usuário esteja logado**. Se não houver sessão em `localStorage["usuarioLogado"]`, o usuário é redirecionado automaticamente para a página de login com uma mensagem de erro.

---

## Arquivos

### Ponto de Entrada
| Arquivo        | O que faz                                                                  |
|----------------|----------------------------------------------------------------------------|
| `checkout.js`  | Ponto de entrada completo: verifica sessão, renderiza o formulário, aplica máscaras de input, e submete o pedido. |

### `components/`
| Arquivo                  | O que faz                                                    |
|--------------------------|--------------------------------------------------------------|
| `CheckoutComponent.js`   | Recebe os itens do carrinho e os totais, retorna o HTML completo do formulário de checkout. |

### `services/`
| Função           | O que faz                                                        |
|------------------|------------------------------------------------------------------|
| `createOrder()`  | Cria o objeto do pedido com itens, endereço, pagamento e data. Salva em `localStorage["pedidos"]`. Limpa o carrinho após o sucesso. |

---

## Funcionalidades do Formulário

| Campo              | Comportamento                                                  |
|--------------------|----------------------------------------------------------------|
| CEP                | Máscara automática `XXXXX-XXX`. Botão de finalizar fica desabilitado até preencher corretamente. |
| Cartão de Crédito  | Máscara automática com espaços a cada 4 dígitos (`XXXX XXXX XXXX XXXX`). |
| Forma de Pagamento | Campos de cartão só aparecem se "Cartão de Crédito" for selecionado. |

---

## Storage

Após a finalização, o pedido é salvo em `localStorage["pedidos"]` e o carrinho (`localStorage["carrinho"]`) é esvaziado. Os pedidos podem ser visualizados pelo admin no painel de `create-product.js`.
