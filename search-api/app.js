const schema = require("./schema");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const userAuth = require("./middleware/auth");
require("./db/db");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");

app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));

app.use(userAuth());
