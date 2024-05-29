const express = require("express");
const app = express();
const port = 3000;

const { executeQuery } = require('./config/database');
const { faker } = require('@faker-js/faker');

// Create people table if not exists
executeQuery("CREATE TABLE IF NOT EXISTS people (name VARCHAR(255) NOT NULL);");

app.get("/", (req, res) => {
  try {
    // Insert new random name in table people
    const randomName = faker.person.fullName();
    executeQuery(`INSERT INTO people (name) VALUES ('${randomName}');`);

    // Select all people names in table and list in view
    executeQuery("SELECT * FROM people;", function (error, result) {
      const html = `
        <h1>Full Cycle Rocks!!!</h1>
        <div>
          <ul>
            ${result.map((item) => `<li>${item.name}</li>`).join("")}
          </ul>
        </div
      `;

      res.send(html);
    });
  } catch (e) {
    console.log(e);
  }
});

app.listen(port, () => {
  console.log(`Running on port: ${port}`)
});