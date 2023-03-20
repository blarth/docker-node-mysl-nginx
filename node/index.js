const express = require("express");
const app = express();
const mysql = require("mysql");
const port = 3000;
const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};

app.use(express.json());

app.post("/", async (req, res) => {
  try {
    const connection = mysql.createConnection(config);
    connection.connect();
    // Inserir novo registro com o nome enviado no corpo da requisição
    const { name } = req.body;
    const insertSql = `INSERT INTO people(name) values('${name}')`;
    connection.query(insertSql);

    // Obter todos os nomes da tabela "people"
    const namesResult = await new Promise((resolve, reject) => {
      connection.query("SELECT name FROM people", (error, results, fields) => {
        if (error) {
          console.error(error);
          reject(error);
        }
        const names = results.map((result) => result.name);
        resolve(names);
      });
    });
    const resBody = `<h1>Full Cycle Rocks</h1><p> Nomes cadastrados: ${namesResult.join(
      ", "
    )}</p>`;
    connection.end();
    res.send(resBody);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log("Rodando na porta " + port);
});
