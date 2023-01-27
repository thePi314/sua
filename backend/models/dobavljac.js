const {
  constructWhereStatement,
  lazyQueryExec,
  constructInsertStatement,
  constructUpdateStatement,
} = require("../db");

const getDobavljaci = async (filters = {}) => {
  const whereStatement = constructWhereStatement(filters);
  const query = `
    SELECT * FROM Dobavljac ${
      whereStatement?.length > 0 ? "WHERE " + whereStatement : ""
    };`;

  return await lazyQueryExec(query);
};

const UpdateDobavljac = async (id, data) => {
  await lazyQueryExec(constructUpdateStatement("Dobavljac", data, { id: id }));
};

const CreateDobavljac = async (data) => {
  await lazyQueryExec(constructInsertStatement("Dobavljac", data));
};

const DeleteDobavljac = async (filters) => {
    const whereStatement = constructWhereStatement(filters);
    const query = `DELETE FROM Dobavljac ${whereStatement?.length > 0 ? "WHERE " + whereStatement : ""};`;
    await lazyQueryExec(query);
};

module.exports = {
    getDobavljaci,
    UpdateDobavljac,
    CreateDobavljac,
    DeleteDobavljac,
};
