# Gabi-Automatic

## Instalação da Aplicação

Para instalar e configurar a aplicação, siga os passos abaixo:

### 1. Configuração das Variáveis de Ambiente
Antes de iniciar a aplicação, configure as variáveis de ambiente necessárias:

```env
JWT_SECRET="chave criptografada"
DURATION_TOKEN="prazo expiracao"
```

Certifique-se de que essas variáveis estejam configuradas corretamente no seu ambiente.

### 2. Instalar Dependências
Para instalar as dependências do projeto, execute o comando:

```bash
yarn install
```

### 3. Configurar o Prisma

#### Executar as Migrations
Para aplicar as migrations do Prisma e configurar o banco de dados, utilize:

```bash
yarn prisma migrate
```

#### Gerar os Dados do Prisma
Para gerar os arquivos necessários para o Prisma funcionar corretamente, execute:

```bash
yarn prisma generate
```

### 4. Executar a Aplicação

#### Ambiente de Produção
Para buildar o aplicativo para produção, execute:

```bash
yarn build
```

Depois de buildar, inicie o aplicativo no modo produção com:

```bash
yarn start:prod
```

#### Ambiente de Desenvolvimento
Para rodar a aplicação no estágio de desenvolvimento, utilize:

```bash
yarn dev
```

## Resumo de Comandos

| Comando                   | Descrição                                      |
|---------------------------|--------------------------------------------------|
| `yarn install`            | Instala todas as dependências do projeto.        |
| `yarn prisma migrate`     | Aplica as migrations do Prisma.                 |
| `yarn prisma generate`    | Gera os arquivos necessários para o Prisma.      |
| `yarn build`              | Builda a aplicação para produção.            |
| `yarn start:prod`         | Inicia a aplicação no modo produção.          |
| `yarn dev`                | Inicia a aplicação no modo desenvolvimento.    |

Com isso, sua aplicação Gabi-Automatic estará pronta para uso!

