# Quick Comanda

Quick Comanda é um projeto baseado em Angular e Ionic, projetado para criar uma aplicação moderna e responsiva. Ele utiliza as melhores práticas de desenvolvimento para fornecer uma base sólida para o desenvolvimento de aplicativos.

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [npm](https://www.npmjs.com/) (geralmente instalado junto com o Node.js)
- [Ionic CLI](https://ionicframework.com/docs/cli) (instale com `npm install -g @ionic/cli`)

## Configuração do Projeto

1. Clone o repositório:

   ```bash
   git clone https://github.com/BrininhoBru/quick-comanda.git
   cd quick-comanda

2. Instale as dependências:]

    ```npm install```

## Inicialização do Projeto

1. Para iniciar o servidor de desenvolvimento, execute: npm start

    ```npm start```

2. Abra o navegador e acesse http://localhost:4200 para visualizar o aplicativo.


## Scripts Disponíveis

- ```npm start```: Inicia o servidor de desenvolvimento.
- ```npm run``` build: Compila o projeto para produção.
- ```npm test```: Executa os testes unitários.
- ```npm run``` lint: Verifica o código com o ESLint.

## Estrutura do Projeto

- __src/__: Contém o código-fonte do aplicativo.
- __src/app/__: Contém os componentes e páginas do aplicativo.
- __src/environments/__: Configurações de ambiente (desenvolvimento e produção).
- __src/theme/__: Arquivos de tema e estilos globais.

## Interface de Produto

A interface `Product` é utilizada para representar os produtos no sistema. Ela está localizada em `src/app/shared/models/Product.ts` e possui as seguintes propriedades:

- `id?` (string): Identificador único do produto.
- `name` (string): Nome do produto.
- `price` (number): Preço do produto.
- `category` (ProductCategory): Categoria do produto, que pode ser:
  - `food`: Comida
  - `drink`: Bebida
  - `portion`: Porção
  - `other`: Outro
- `isAvailable` (boolean): Indica se o produto está disponível.
- `imageUrl?` (string): URL da imagem do produto (opcional).
- `createdAt` (FieldValue): Data de criação do produto.
- `updatedAt` (FieldValue): Data da última atualização do produto.

A interface também utiliza o tipo `ProductCategory` para definir as categorias disponíveis.