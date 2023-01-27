const { getUserByHash, getUsers } = require("./user");
const { CreateSession, GetUserSession } = require("./session");
const { hashCreds } = require("../utilities/hash");

const login = async (username, password = null, type = "login") => {
  if (type === "login") {
    const passwordHash = hashCreds(username, password);
    const user = await getUserByHash(passwordHash);

    if (!user) throw "Invalid credentials!";

    const session = await CreateSession(user.id);
    return {
      ...user,
      sesijski_kljuc: session.sesijski_kljuc
    };
  }

  const userSession = await GetUserSession({sesijski_kljuc: username});
  if(!userSession) {
    throw "Invalid credentials!";
  }
  
  const users = await getUsers({'Korisnik.id': userSession.korisnik_id});
  console.log('user',users[0])
  return users[0];
};


module.exports = {
  login
};
