<h1 align="center">
  <img alt="FastFeet" title="FastFeet" src="fastfeet.png" width="200px" />
</h1>

<h2>Desenvolvido apenas para Android<h2>

<h3>
  Projeto final do bootcamp da Rocketseat. No projeto foi feito o backend, o frontend-web e o mobile.
</h3>

<h2>Funcionalidades:</h2>
<p>Backend: Todas as regras de negócio e persitência;</p>
<p>Frontend-web: Aplicativo da entregas, realiza a gestão dos destinatários, entregadoras, entregas e problemas na entrega;</p>
<p>Mobile: Aplicativo do entregador, o entregador pode vizualizar seus pedidos e perfil, vizualizar os detalhes da sua entrega, obter assinatura do destinatário via câmera do celular e relatar problemas na entrega </p>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/jefferson-luis-nascimento/fastFeet?color=%2304D361">

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">

  <a href="https://github.com/jefferson-luis-nascimento/fastFeet/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/jefferson-luis-nascimento/fastFeet?style=social">
  </a>
</p>

## Getting Started

Abaixo seguem as intruções para baixar e executar o projeto em ambiente de desenvolvimento.

## Pre-requisitos
- [Linux Mint 19.02](https://linuxmint.com/release.php?id=35) - Sistema operacional usado para desenvolvimento.
- [NodeJS](https://nodejs.org/en/) - Ambiente de execução do projeto.
- [Yarn](https://yarnpkg.com/en/docs/install) - Gerenciador de pacotes.
- [Docker](https://docs.docker.com/install/) - Container para testar a aplicação.
- [Genymotion](https://www.genymotion.com/fun-zone/) - Emulador Android.

### Caminho para download do projeto
```
$> git@github.com:jefferson-luis-nascimento/fastfeet.git
```

## Instalação

Passo passo de instalação do ambiente de desenvolvimento após feito download:

## Databases

### Utilizando o docker, executar os seguintes comandos:

```
$> docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres:11
```

```
$> docker run --name mongobarber -p 27017:27017 -d -t mongo 
```

```
$> docker run --name redisbarber -p 6379:6379 -d -t redis:alpine
```

## Backend

##### Criar o arquivo .env e preencher de acordo com o arquivo .envexmaple

### Instalar as dependências do backend

```
$> cd ./backend/ && yarn
```
#### Iniciar o servidor
```
$> yarn dev 
```

## Frontend-web
### Instalar as dependências do frontend-web
```
$> cd ./frontend/ && yarn
```
### Executando o aplicativo
```
$> yarn start
```

#### Mobile


#### Ambiente Android
Configurar o ambiente de acordo com a documentação da [Rocketseat](https://react-native.rocketseat.dev/)

### Trocar o baseUrl do arquivo ~/src/services/api.js
### Trocar o host do arquivo ~/src/config/ReactotronConfig.js
### Instalar as dependências do mobile
```
$> cd ./mobile/ && yarn
```
### Executando o aplicativo
```
$> react-native run-android
```
```
$> react-native start --reset-cache
```

#### Feito com

* [Express](https://expressjs.com/pt-br/api.html/) - Um framework restful API 
* [ReactJS](https://pt-br.reactjs.org/) - Uma biblioteca JavaScript para criar interfaces de usuário
* [React Native](https://facebook.github.io/react-native/docs/getting-started/) - Learn once, write anywhere.

### Desenvolvedor

* **Jefferson Luís Nascimento** - *Full-stack developer* - [GitHub profile](https://github.com/jefferson-luis-nascimento)

## Conhecimentos usados

* Node.js
* Express
* MVC design pattern
* Sequelize ORM
* Background mail sendling with Redis
* Sentry
* Multer
* JWT
* Docker
* React ecossystem
* React Hooks
* ReactJS
* React Native
* Reactotron
* React Camera
* React Navigation
* React Router DOM
* React Toastify
* Redux
* Redux Saga
* Redux Persist
* Flux Archtecture
* ESLint
* Prettier
* Styled Components
* Unform
* Axios
* History
* Date-fns
* @Rocketseat/unform
