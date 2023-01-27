const {
  constructWhereStatement,
  lazyQueryExec,
  constructInsertStatement,
  constructUpdateStatement,
} = require("../db");

const getProizvode = async (filters = {}) => {
  const whereStatement = constructWhereStatement(filters);
  const query = `
    SELECT * FROM Proizvod ${
      whereStatement?.length > 0 ? "WHERE " + whereStatement : ""
    };`;

  return await lazyQueryExec(query);
};

const UpdateProizvod = async (id, data) => {
  await lazyQueryExec(constructUpdateStatement("Proizvod", data, { id: id }));
};

const CreateProizvod = async (data) => {
  await lazyQueryExec(constructInsertStatement("Proizvod", data));
};

const DeleteProizvod = async (filters) => {
    const whereStatement = constructWhereStatement(filters);
    const query = `DELETE FROM Proizvod ${whereStatement?.length > 0 ? "WHERE " + whereStatement : ""};`;
    await lazyQueryExec(query);
};

module.exports = {
    getProizvode,
    UpdateProizvod,
    CreateProizvod,
    DeleteProizvod,
};
