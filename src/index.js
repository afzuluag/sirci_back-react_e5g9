const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const bodyparser = require("body-parser");

require("./database");

app.use(morgan("dev"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

//Rutas
app.use("/usuario", require("./routes/Usuarios.route"));

//Generacion del Puerto
app.set("port", process.env.PORT || 4000);
app.listen(app.get("port"), () => {
  console.log("app listening on port " + app.get("port"));
});
