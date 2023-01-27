const {
  constructWhereStatement,
  constructInsertStatement,
  constructUpdateStatement,
  lazyQueryExec,
  constructDeleteStatement,
} = require("../db");
const { generateRandomString } = require("../utilities/strings");

const GetUserSession = async (filters = {}) => {
  const result = await lazyQueryExec(`SELECT * FROM Sesija WHERE ${constructWhereStatement(filters)}`);
  return result[0];
};

const ValidateSession = async (sessionKey) => {
  const currentTimestamp = Math.round(Date.now() / 1000);
  const userSession = await GetUserSession({ sesijski_kljuc: sessionKey });

  return userSession && currentTimestamp < userSession.vazi_do
    ? userSession
    : null;
};

const CreateSession = async (userId) => {
  const data = {
    korisnik_id: userId,
    sesijski_kljuc: generateRandomString(128),
    vazi_do: Math.round(Date.now() / 1000) + 60 * 60 * 7,
  };

  if (await GetUserSession({ korisnik_id: userId }))
    await lazyQueryExec(
      constructUpdateStatement("Sesija", data, { korisnik_id: userId })
    );
  else await lazyQueryExec(constructInsertStatement("Sesija", data));

  return data;
};

const DeleteSession = async (sessionKey) => {
  await lazyQueryExec(
    constructDeleteStatement("Sesija", { sesijski_kljuc: sessionKey })
  );
};

module.exports = {
  CreateSession,
  ValidateSession,
  GetUserSession,
  DeleteSession,
};
