const mongoose = require("mongoose");
const uri =
  "mongodb+srv://team54_8:Xz9n3i4qsKTjk2e5@cluster0.pfr8p.mongodb.net/sirci?retryWrites=true&w=majority";

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((db) => console.log("CONECTADO A LA DB =>", db.connection.name))
  .catch((error) => console.log(error));

module.exports = mongoose;
