const {
  constructWhereStatement,
  lazyQueryExec,
  constructInsertStatement,
  constructUpdateStatement,
} = require("../db");

const getProizvodneProcese = async (filters = {}) => {
  const whereStatement = constructWhereStatement(filters);
  const query = `
        SELECT * FROM Proizvodni_proces ${
          whereStatement?.length > 0 ? "WHERE " + whereStatement : ""
        };`;

  return await lazyQueryExec(query);
};

const UpdateProizvodniProces = async (id, data) => {
  await lazyQueryExec(
    constructUpdateStatement("Proizvodni_proces", data, { id: id })
  );
};

const CreateProizvodniProces = async (data) => {
  await lazyQueryExec(constructInsertStatement("Proizvodni_proces", data));
};

const DeleteProizvodniProces = async (filters) => {
  const whereStatement = constructWhereStatement(filters);
  const query = `DELETE FROM Proizvodni_proces ${
    whereStatement?.length > 0 ? "WHERE " + whereStatement : ""
  };`;
  await lazyQueryExec(query);
};

const GetProizvodneProceseStavke = async (filters) => {
  const whereStatement = constructWhereStatement(filters);
  const query = `SELECT * FROM Proizvodi_proces_stavka ${
    whereStatement?.length > 0 ? "WHERE " + whereStatement : ""
  };`;

  return await lazyQueryExec(query);
};

const DeleteProizvodneProceseStavke = async (filters) => {
  const whereStatement = constructWhereStatement(filters);
  const query = `DELETE FROM Proizvodi_proces_stavka ${
    whereStatement?.length > 0 ? "WHERE " + whereStatement : ""
  };`;
  await lazyQueryExec(query);
};

const CreateProizvodneProceseStavke = async (data) => {
  return await lazyQueryExec(constructInsertStatement("Proizvodi_proces_stavka", data));
};

module.exports = {
  getProizvodneProcese,
  UpdateProizvodniProces,
  CreateProizvodniProces,
  DeleteProizvodniProces,
  GetProizvodneProceseStavke,
  DeleteProizvodneProceseStavke,
  CreateProizvodneProceseStavke
};
