# Teste Softplan

[![en](https://img.shields.io/badge/README-English-red.svg)](https://github.com/nardini-22/teste-softplan/blob/main/README-en.md)

## ✏️ Introdução

Repositório para Softplan referente a vaga de desenvolvedor Front-end PL. Criei uma aplicação que conta com um login, tabela de usuários com opção de CRUD para determinado perfil de usuário, controle do usuário logado por meio de [JWT](https://jwt.io/) e cookies. Escolhi vite como minha ferramenta de desenvolvimento de React por preferência pessoal e gosto, foquei em deixar o código com boa qualidade, mantendo ele simples, fácil de ler, entender e alterar. Escolhi tailwind e shadcn/ui para facilitar o desenvolvimento de componentes e me deixar livre para focar nas regras de negócios da aplicação. E por fim, escolhi vitest + react testing library para fazer os testes automatizados. Os repositório front-end e back-end desse teste estão separados pois como a vaga é front-end, deixei as funcionalidades que serão julgadas no repositório principal e a api em outro, o link da Api para mais detalhes está na parte das features.

## 🌐 Demo

https://teste-softplan.vercel.app/

## 👥 Login

Para acessar a aplicação é necessário login e senha, já disponibilizei alguns usuários no "banco de dados" mockado. Caso queira entrar como `admin` pode acessar usando o login `admin@admin.com` e a senha `admin1234`. Agora, se quiser entrar como `user` pode utilizar o login `user2@user.com` e a senha `user2password`.

## 📋 Features

- [x] A aplicação conta com proteção por login e senha;
- [x] 2 tipos de perfis (admin e user);
- [x] Tabela com todos os usuários cadastrados;
- [x] A tabela conta com pesquisa e paginação;
- [x] É possível criar, editar, remover e visualizar um usuário;
- [x] O usuário logado tem a opção de ver o seu perfil e trocar a senha;
- [x] A aplicação conta com testes automatizados;
- [x] A aplicação consome a [Api](https://github.com/nardini-22/teste-softplan-api) criada por mim também.

## 👔 Regras de negócio

- [x] O usuário com acesso admin pode executar o CRUD de
outros usuários e visualizar;
- [x] O usuário com acesso user poderá apenas visualizar os usuários do
sistema.

## 💻 Tecnologias

* [React](https://react.dev/)
* [Vite](https://vitejs.dev/)
* [Typescript](https://www.typescriptlang.org/)
* [Zod](https://zod.dev/)
* [React Hook Form](https://react-hook-form.com/)
* [Tanstack Query](https://tanstack.com/query/latest)
* [Tanstack Table](https://tanstack.com/table/latest)
* [Tailwind CSS](https://tailwindcss.com/)
* [Shadcn/ui](https://ui.shadcn.com/)
* [Biome](https://biomejs.dev/) (Alternativa ao ESlint)
* [Vitest](https://vitest.dev/)
* [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## 🚀 Instalação

Para clonar e rodar essa aplicação, é necessário [Git](https://git-scm.com) e [Node.js](https://nodejs.org/en/download/) (que vem com o [npm](http://npmjs.com)) instalado no seu computador. Na linha de comando:
```bash
# Clone esse repositório
$ git clone https://github.com/nardini-22/teste-softplan.git

# Entre na pasta do repositório
$ cd teste-softplan

# Instale as dependências
$ npm install

# Crie um .env.local com os mesmos valores do .env.example

# Rode a aplicação
$ npm run dev

# Caso queira rodar os testes da aplicação
$ npm run test
```



 ## ❤️ Gostou desse projeto? 
Desenvolvido por Arthur Nardini.

[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/arthur-nardini/)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/nardini-22)
