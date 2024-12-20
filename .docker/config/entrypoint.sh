#!/bin/bash
# Este arquivo deve ser executável: chmod +x .docker/config/entrypointPrisma.sh

# Esperar o banco de dados estar pronto, se necessário
echo "Aguardando o banco de dados..."
sleep 5 # Pode ser ajustado para o tempo necessário

# Rodar as migrations do Prisma
echo "Rodando as migrations do Prisma..."
yarn prisma generate
yarn prisma migrate deploy

echo "Buildando a aplicação..."
yarn build

# Rodar a aplicação
echo "Iniciando a aplicação..."
#esse comando faz o processo deste script pegar o mesmo ID do processo iniciado no docker


# Instalando dependencias
yarn install

# yarn start:prod
exec "$@"