# Boas-vindas ao repositório do projeto Trybe Futebol Clube!

O TFC é uma aplicação que fornece informações sobre partidas e classificações de futebol.

# Resumo

Essa é uma aplicação desenvolvida por mim durante meus estudos na [Trybe](https://www.betrybe.com).
No desenvolvimento, foi criada uma API utilizando TDD, integrada a um banco de dados via Docker e Sequelize, com regras de negócio implementadas para alimentar as tabelas exibidas no front-end.

#🚀 Tecnologias utilizadas
---
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" width="40" height="40"/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" width="40" height="40"/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sequelize/sequelize-original.svg" alt="Sequelize" width="40" height="40"/>  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" width="40" height="40"/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" alt="Express" width="40" height="40"/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" alt="Jest" width="40" height="40"/>

> **Este projeto foi desenvolvido utilizando a metodologia TDD**
---

# 🖥️ Iniciando aplicação
• Para copiar o repositório para uma pasta local, use o seguinte comando no terminal:

```bash
git@github.com:Gustavo-GPG/FutebolClube.git
```

Caso você não tenha o Git instalado, você pode instalá-lo usando os seguintes comandos, dependendo do seu sistema operacional:

Debian/Ubuntu (Terminal Bash):
```bash
sudo apt-get install git
```
Windows (PowerShell):
```bash
winget install --id Git.Git -e --source winget
```
Ou você pode seguir a documentação do site [git](https://git-scm.com/downloads) para mais meios de instalação.

• Navegue até a pasta criada no clone e abra o terminal
```bash
npm install
```

## ⚙️ Preparação do Banco de Dados

Antes de iniciar a aplicação com o Docker Compose, é necessário configurar o banco de dados executando as migrações e seeders. Siga os passos abaixo:

1. **Execute as Migrações**: As migrações criam a estrutura do banco de dados.
   ```bash
   npx sequelize db:migrate
   ```
1. **Execute os Seeders**: Os seeders populam o banco de dados com dados iniciais.
   ```bash
   npx sequelize db:seed:all
   ```
   ---

• Para inicializar o container execute o comando
```bash
npm run compose:up
```
• Para vizualizar os logs do container execute o comando
```bash
docker-compose logs backend
```
Para vizualizar a aplicação localmente abra o navegador e cole o endereço:
localhost:3000

⚠️**Atenção:** Lembre-se de ter disponíveis as portas 3000 e 3001 para que os serviços de back-end e front-end possam funcionar
---
Este projeto foi guiado por requisitos pré-estabelecidos pela [Trybe](https://www.betrybe.com).
