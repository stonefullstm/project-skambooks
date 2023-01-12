# Project Skambooks
Uma aplicação full stack para troca de livros entre leitores. Leitores se cadastram na aplicação e adicionam seus livros disponíveis para troca. A cada livro trocado, a pessoa leitora que envia o livro ganha um crédito, o que dá direito a receber outro livro. 

## Status do projeto

<p align="center">
<img src="https://img.shields.io/badge/STATUS-EM DESENVOLVIMENTO-blue"/>
</p>


## Instalação/Execução 
 
Aplicação pode ser executada em https://skambooks-production.up.railway.app/

## Funcionalidades 
 
- Cadastro de leitores na plataforma, com definição de login e senha. Após o login, a pessoa usuária verá um tela como abaixo, onde pode inserir/editar/excluir livros ou enviar um livro para troca. 
![Tela My Books](images/mybooks.png)
- Leitor cadastra seus livros disponíveis para troca (caso seja um leitor novo, este ganha 1 crédito). Os créditos habilitam os leitores a solicitar uma troca (1 crédito = 1 livro)
- Leitor-1 envia livro para o Leitor-2. É necessário que o Leitor-2 tenha créditos
- Leitor-2 recepciona o livro, o qual passa a ser de sua propriedade
- Na tela My Exchanges, a pessoa leitora visualiza todas as suas trocas, enviadas, recebidas, podendo confirmar uma troca recebida ou excluir uma troca que tenha sido enviada
![Tela My Exchanges](images/myexchanges.png) 
- Em Search Books, a pessoa usuária pode pesquisar livros, por Título, por Autor ou mesmo visualizar todos.
![Tela Search Books](images/searchbooks.png)
- A logística da troca não é gerenciada pela aplicação, ficando sob responsabilidade dos leitores
 
## Tecnologias utilizadas
 
<div display="inline-block">
<img width="" src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img width="" src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
<img width="" src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E">
<img width="" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
<img width="" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
<img width="" src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white">
<img width="" src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white">
<img width="" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">
</div>

## Pessoas desenvolvedoras

| [![avatar](https://images.weserv.nl/?url=avatars.githubusercontent.com/u/6804615?v=4&h=80&w=80&fit=cover&mask=circle&maxage=7d)<br><sub>Carlos Araújo</sub>](https://github.com/stonefullstm) |  [![avatar](https://images.weserv.nl/?url=avatars.githubusercontent.com/u/17199815?v=4&h=80&w=80&fit=cover&mask=circle&maxage=7d)<br><sub>Reinaldo Santos</sub>](https://github.com/reinaldoper) |
| :---: | :---: |
