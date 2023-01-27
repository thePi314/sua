const {
  constructWhereStatement,
  lazyQueryExec,
  constructInsertStatement,
  constructUpdateStatement,
} = require("../db");

const getSirovine = async (filters = {}) => {
  const whereStatement = constructWhereStatement(filters);
  const query = `
      SELECT * FROM Sirovina ${
        whereStatement?.length > 0 ? "WHERE " + whereStatement : ""
      };`;

  return await lazyQueryExec(query);
};

const UpdateSirovina = async (id, data) => {
  await lazyQueryExec(constructUpdateStatement("Sirovina", data, { id: id }));
};

const CreateSirovina = async (data) => {
  await lazyQueryExec(constructInsertStatement("Sirovina", data));
};

const DeleteSirovina = async (filters) => {
  const whereStatement = constructWhereStatement(filters);
  const query = `DELETE FROM Sirovina ${
    whereStatement?.length > 0 ? "WHERE " + whereStatement : ""
  };`;
  await lazyQueryExec(query);
};

module.exports = {
  getSirovine,
  UpdateSirovina,
  CreateSirovina,
  DeleteSirovina,
};
