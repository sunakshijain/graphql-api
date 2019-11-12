const schema = require("./schema");

const port = process.env.PORT;
const express = require("express"),
  helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(helmet());
const userAuth = require("./middleware/auth");
require("./db/db");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");

app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));

app.use(userAuth());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
