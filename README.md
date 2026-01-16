# Mon Vieux Grimoire

Voici mon répo du projet numéro 6 de la formation développeur web d'OpenClassRooms

## Configuration

Le projet nécessite un fichier `.env`.

```bash
cp .env.template .env
```

## Lancement


### Build et lancer le backend
```bash
docker-compose up --build
```


### Stopper les conteneurs
```bash
docker-compose stop
```


### Supprimer les conteneurs et volumes
```bash
docker-compose down -v
```


### Supprimer l’image Docker
```bash
docker rmi oc-projet6-backend
```


Le BackEnd écoute sur le port 4000.




## 📝 Description
Vous êtes développeur back-end en freelance depuis maintenant un an dans la région de Lille.

Vous êtes contacté pour travailler sur un projet en mutualisant vos compétences front / back sur un tout nouveau,
projet de site internet.


