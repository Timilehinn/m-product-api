# Product API

Node.js, Typescript, Express & MongoDB

## .env file

Change the default `env copy` to `.env` by running the below command

```
cp env copy .env
```

## Database

Ensure you have mongodb installed on your machine.

```
brew tap mongodb/brew

brew install mongodb-community@5.0
```

Install [MongoDB Compass](https://www.mongodb.com/try/download/compass) or any mongodb tool of your choice to view &amp; manage DB.

Then create a new mongo database e.g `product-db`
In the .env you will see `DB_URL`, you can change to your choice ;)

## Postman Collection

For fast-paced dev, you can access the endpoints [here](https://documenter.getpostman.com/view/16203148/2s935vmzzM)

- Go to your GUI, Collections > Import
- Select "Link" tab
- Paste the above link in the text box

## To run locally

```
npm install
```

#### Start the server:

```
npm run dev
```
