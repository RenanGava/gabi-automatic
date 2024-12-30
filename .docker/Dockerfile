# Usar uma imagem base do Node.js
FROM node:lts-buster

# Definir o diretório de trabalho no container
WORKDIR /app

USER root

# Copiar os arquivos do projeto para o container
COPY ../package.json .
COPY ../build .


# Atualizar e instalar dependências do sistema para o
# whatsapp-web-js e puppeteer
RUN apt-get update && apt-get install -y \
  ca-certificates \
  fuse3 \
  sqlite3 \
  gconf-service \
  libgbm-dev \
  libasound2 \
  libatk1.0-0 \
  libc6 \
  libcairo2 \
  libcups2 \
  libdbus-1-3 \
  libexpat1 \
  libfontconfig1 \
  libgcc1 \
  libgconf-2-4 \
  libgdk-pixbuf2.0-0 \
  libglib2.0-0 \
  libgtk-3-0 \
  libnspr4 \
  libpango-1.0-0 \
  libpangocairo-1.0-0 \
  libstdc++6 \
  libx11-6 \
  libx11-xcb1 \
  libxcb1 \
  libxcomposite1 \
  libxcursor1 \
  libxdamage1 \
  libxext6 \
  libxfixes3 \
  libxi6 \
  libxrandr2 \
  libxrender1 \
  libxss1 \
  libxtst6 \
  ca-certificates \
  fonts-liberation \
  libappindicator1 \
  libnss3 \
  lsb-release \
  xdg-utils \
  wget


# Tornar o script de entrypoint executável
RUN chmod +x .docker/config/entrypoint.sh

ENTRYPOINT ["/bin/bash", "-c", "./.docker/config/entrypoint.sh"]

# Expor a porta usada pela aplicação
EXPOSE 8080

RUN yarn install

# Comando padrão (o entrypoint será configurado pelo docker-compose)
CMD ["yarn", "start:prod"]