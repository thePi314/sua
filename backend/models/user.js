const {
  constructWhereStatement,
  lazyQueryExec,
  constructInsertStatement,
  constructUpdateStatement,
} = require("../db");
const { hashCreds } = require("../utilities/hash");

const getUserByHash = async (hash) => {
  const users = await getUsers({ "Korisnik.sifra": hash });
  return users[0] ?? null;
};

const getUsers = async (filters = {}) => {
  const whereStatement = constructWhereStatement(filters);
  const query = `
  SELECT 
    Korisnik.id, 
    Korisnik.role, 
    Korisnik.korisnicko_ime,  
    Zaposlenik.ime,
    Zaposlenik.prezime,
    Zaposlenik.broj_telefona,
    Zaposlenik.adresa,
    Zaposlenik.datum_zaposlenja,
    Zaposlenik.datum_otkaza,
    Zaposlenik.email
  FROM Korisnik,Zaposlenik WHERE Zaposlenik.korisnik_id=Korisnik.id ${
    whereStatement?.length > 0 ? "AND " + whereStatement : ""
  };`;

  return await lazyQueryExec(query);
};

const UpdateUser = async (id, role, data) => {
  if (role)
    await lazyQueryExec(
      constructUpdateStatement("Korisnik", { role: role }, { id: id })
    );
  await lazyQueryExec(
    constructUpdateStatement("Zaposlenik", data, { korisnik_id: id })
  );
};

const CreateUser = async (username, password, role, data) => {
  const passwordHash = hashCreds(username, password);

  const users = await lazyQueryExec(
    `SELECT * FROM Korisnik WHERE ${constructWhereStatement({
      korisnicko_ime: username,
    })}`
  );
  if (!users || users?.length > 0) throw "Username is taken!";

  await lazyQueryExec(
    constructInsertStatement("Korisnik", {
      korisnicko_ime: username,
      sifra: passwordHash,
      role: role,
    })
  );
  const korisnik = (
    await lazyQueryExec(
      `SELECT * FROM Korisnik WHERE ${constructWhereStatement({
        korisnicko_ime: username,
      })}`
    )
  )[0];

  await lazyQueryExec(
    constructInsertStatement("Zaposlenik", {
      korisnik_id: korisnik.id,
      ...data,
      datum_zaposlenja: Math.round(Date.now() / 1000),
    })
  );

  return (await getUsers({ "Korisnik.id": korisnik.id }))[0];
};

module.exports = {
  getUserByHash,
  getUsers,
  CreateUser,
  UpdateUser,
};
