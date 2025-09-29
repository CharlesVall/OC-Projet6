# Dockerfile
FROM node:20

# Créer le dossier de travail dans le conteneur
WORKDIR /app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du projet
COPY . .

# Exposer le port
EXPOSE 3000

# Lancer l'application
CMD ["node", "server.js"]

