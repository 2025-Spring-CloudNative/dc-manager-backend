# dc-manager-backend

backend for tsmc datacenter management system

## Install NodeJS and NPM

-   [download NodeJS and NPM](https://nodejs.org/zh-tw/download)

### For Windows WSL / MacOS / Linux

```shell
# install node/npm via nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install --lts
```

```shell
# check if node and npm are installed
node --version
npm --version
```

## Install Dependencies

```shell
npm i
```

-   to run an example postgres database, run
    ```shell
    docker run \
        --name drizzle-postgres \
        -e POSTGRES_USER=postgres \
        -e POSTGRES_PASSWORD=mypassword \
        -e POSTGRES_DB=postgres \
        -d -p 5432:5432 postgres
    ```
    ref: [drizzle doc](https://orm.drizzle.team/docs/guides/postgresql-local-setup)
-   under the root folder, remember to create a `.env` file containing `DATABASE_URL`
    ```shell
    DATABASE_URL=postgres://postgres:mypassword@localhost:5432/postgres
    ```

*   generate sql file and metadata in `./migration` folder
    ```shell
    npm run db:generate
    ```

*   run migration for initializing example db **(only need to do it once)**
    ```shell
    npm run db:migrate
    ```

*   visualize db using drizzle-studio
    ```shell
    npm run db:studio
    ```

## Run Local Server

```shell
npm run local
```

## Build the Project

```shell
npm run build
```

## swagger

```shell
npm install swagger-autogen swagger-ui-express  
npm install --save-dev @types/swagger-ui-express
npm run doc:generate
npm run local
```

## Production Environment Setup
Please modify the `.env` file first

```shell
DATABASE_URL=postgres://postgres:mypassword@db:5432/postgres
```

### Start the Service
Start the backend and database services using docker-compose in detached mode
```shell
docker compose up -d
```

### Rebuild the service
Stop the service before rebuilding:

```shell
docker compose down
docker compose build --no-cache
```

### Verify the Service
Check if the containers are running
```shell
docker compose ps
```

View logs for trouble-shooting
```shell
docker compose logs backend
```

### Stopping the Service
To stop the running services

```shell
docker compose down
```