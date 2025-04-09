# dc-manager-backend

backend for tsmc datacenter management system

## Install NodeJS and NPM

-   [download NodeJS and NPM](https://nodejs.org/zh-tw/download)

### For Windows WSL / MacOS / Linux

```shell
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

-   under the root folder, remember to create a `.env` file containing `DATABASE_URL`

## Run Local Server

```shell
npm run local
```

## Build the Project

```shell
npm run build
```
