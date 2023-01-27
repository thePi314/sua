const express = require("express");
const config = require("./config");
const cors = require("cors");
const bodyParser = require("body-parser");

const { migrations } = require("./migrate");

migrations.forEach(async (migration) => {
  await migration();
});

const { AuthMiddleware, AdminMiddleware } = require("./middleware/auth");
const { login } = require("./models/auth");
const { getUsers, CreateUser, UpdateUser } = require("./models/user");
const { CreateDobavljac, getDobavljaci, UpdateDobavljac } = require("./models/dobavljac");
const { CreateSirovina, getSirovine, UpdateSirovina } = require("./models/sirovina");
const { CreateProizvodniProces, getProizvodneProcese, UpdateProizvodniProces, GetProizvodneProceseStavke, DeleteProizvodneProceseStavke, CreateProizvodneProceseStavke } = require("./models/proizvodniProces");
const { lazyQueryExec } = require("./db");
const { getProizvode, CreateProizvod, UpdateProizvod } = require("./models/proizvod");

const app = express();

const port = config.PORT || 3000;

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "*",
    exposedHeaders: "*",
  })
);
app.use(bodyParser.json());

app.get("/api/health", (req, res, next) =>
  res.status(200).send({ health: "ok" })
);

app.post("/api/login", async (req, res) => {
  try {
    const data = await login(
      req.body.username,
      req.body.password,
      req.body.type ?? "login"
    );
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: "User not found!" });
  }
});

// Admin Roles
app.post(
  "/api/admin/users/create",
  AuthMiddleware,
  AdminMiddleware,
  async (req, res) => {
    try {
      const data = await CreateUser(
        req.body.username,
        req.body.password,
        req.body.role,
        {
          ime: req.body.ime,
          prezime: req.body.prezime,
          broj_telefona: req.body.broj_telefona,
          adresa: req.body.adresa,
          email: req.body.email,
        }
      );
      res.status(200).send(data);
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: err });
    }
  }
);

app.get(
  "/api/admin/users",
  AuthMiddleware,
  AdminMiddleware,
  async (req, res) => {
    try {
      const data = await getUsers();
      res.status(200).send(data);
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: err });
    }
  }
);

app.get(
  "/api/admin/users/:id",
  AuthMiddleware,
  AdminMiddleware,
  async (req, res) => {
    try {
      const id = req.params.id;
      const data = await getUsers({ "Korisnik.id": id });
      res.status(200).send(data.length > 0 ? data[0] : null);
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: err });
    }
  }
);

app.post(
  "/api/admin/users/:id/update",
  AuthMiddleware,
  AdminMiddleware,
  async (req, res) => {
    try {
      const id = +req.params.id;
      const data = req.body;


      await UpdateUser(id, req.body.role, data);

      res.status(200).send();
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: err });
    }
  }
);

// Dobavljaci
app.post(
  "/api/dobavljaci/create",
  AuthMiddleware,
  async (req, res) => {
    try {
      await CreateDobavljac(req.body);
      res.status(200).send(data);
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: err });
    }
  }
);

app.get(
  "/api/dobavljaci",
  AuthMiddleware,
  async (req, res) => {
    try {
      const data = await getDobavljaci();
      res.status(200).send(data);
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: err });
    }
  }
);

app.get(
  "/api/dobavljaci/:id",
  AuthMiddleware,
  async (req, res) => {
    try {
      const id = +req.params.id;
      const data = await getDobavljaci({ "id": id });
      res.status(200).send(data.length > 0 ? data[0] : null);
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: err });
    }
  }
);

app.post(
  "/api/dobavljaci/:id/update",
  AuthMiddleware,
  async (req, res) => {
    try {
      const id = +req.params.id;
      const data = req.body;

      await UpdateDobavljac(id, data);
      res.status(200).send();
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: err });
    }
  }
);


// Sirovine
app.post(
  "/api/sirovine/create",
  AuthMiddleware,
  async (req, res) => {
    try {
      await CreateSirovina(req.body);
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: err });
    }
  }
);

app.get(
  "/api/sirovine",
  AuthMiddleware,
  async (req, res) => {
    try {
      const data = await getSirovine();
      res.status(200).send(data);
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: err });
    }
  }
);

app.get(
  "/api/sirovine/:id",
  AuthMiddleware,
  async (req, res) => {
    try {
      const id = +req.params.id;
      const data = await getSirovine({ "id": id });
      res.status(200).send(data.length > 0 ? data[0] : null);
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: err });
    }
  }
);

app.post(
  "/api/sirovine/:id/update",
  AuthMiddleware,
  async (req, res) => {
    try {
      const id = +req.params.id;
      const data = req.body;

      await UpdateSirovina(id, data);
      res.status(200).send();
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: err });
    }
  }
);


// Proizvodni Proces
app.post(
  "/api/proizvodniproces/create",
  AuthMiddleware,
  async (req, res) => {
    try {
      await CreateProizvodniProces(req.body);
      const id = (await lazyQueryExec(`SELECT id FROM Proizvodni_proces ORDER BY id DESC LIMIT 1;`))[0];
      res.status(200).send({id: id})
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: err });
    }
  }
);

app.get(
  "/api/proizvodniproces",
  AuthMiddleware,
  async (req, res) => {
    try {
      const data = await getProizvodneProcese();
      res.status(200).send(data);
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: err });
    }
  }
);

app.get(
  "/api/proizvodniproces/:id",
  AuthMiddleware,
  async (req, res) => {
    try {
      const id = +req.params.id;
      const data = await getProizvodneProcese({ "id": id });
      res.status(200).send(data.length > 0 ? data[0] : null);
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: err });
    }
  }
);

app.post(
  "/api/proizvodniproces/:id/update",
  AuthMiddleware,
  async (req, res) => {
    try {
      const id = +req.params.id;
      const data = req.body;

      await UpdateProizvodniProces(id, data);
      res.status(200).send();
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: err });
    }
  }
);

app.get(
  "/api/proizvodniproces/:id/stavke",
  AuthMiddleware,
  async (req, res) => {
    try {
      const id = +req.params.id;
      const data = await GetProizvodneProceseStavke({ "Proizvodni_proces_id": id });
      res.status(200).send(data);
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: err });
    }
  }
);

app.post(
  "/api/proizvodniproces/:id/stavke/update",
  AuthMiddleware,
  async (req, res) => {
    try {
      const id = +req.params.id;
      await DeleteProizvodneProceseStavke({ "Proizvodni_proces_id": id });
      const stavke = req.body.stavke ?? [];

      for(let i=0;i<stavke.length; i++){
        const stavka = stavke[i];
        await CreateProizvodneProceseStavke({...stavka,Proizvodni_proces_id: id});
      }
      
      res.status(200).send();
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: err });
    }
  }
);



// Sirovine
app.post(
  "/api/proizvodi/create",
  AuthMiddleware,
  async (req, res) => {
    try {
      await CreateProizvod(req.body);
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: err });
    }
  }
);

app.get(
  "/api/proizvodi",
  AuthMiddleware,
  async (req, res) => {
    try {
      const data = await getProizvode();
      res.status(200).send(data);
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: err });
    }
  }
);

app.get(
  "/api/proizvodi/:id",
  AuthMiddleware,
  async (req, res) => {
    try {
      const id = +req.params.id;
      const data = await getProizvode({ "id": id });
      res.status(200).send(data.length > 0 ? data[0] : null);
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: err });
    }
  }
);

app.post(
  "/api/proizvodi/:id/update",
  AuthMiddleware,
  async (req, res) => {
    try {
      const id = +req.params.id;
      const data = req.body;

      await UpdateProizvod(id, data);
      res.status(200).send();
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: err });
    }
  }
);


app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
