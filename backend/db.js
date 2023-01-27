const config = require("./config");
const mysql = require("mysql");

var db_config = {
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_DATABASE,
};

const connectDB = () => {
  const connection = mysql.createConnection(db_config);

  connection.connect(function (err) {
    if (err) {
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect, 2000);
    }
  });

  connection.on("error", function (err) {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleDisconnect();
    } else {
      throw err;
    }
  });

  return connection;
};

const constructWhereStatement = (filters = {}) => {
  return Object.keys(filters).map((key) => {
    const value = filters[key];
    const valueKey = typeof value === 'string' ? `'${value}'` : value;

    return `${key} = ${valueKey}`;
  }).join(' and ');
};

const constructInsertStatement = (table, values={}) => {
  const fieldsString = Object.keys(values).join(',');

  const valuesString = Object.keys(values).map((key) => {
    const value = values[key];
    return typeof value === 'string' ? `'${value}'` : value;
  }).join(',');

  return `INSERT INTO ${table} (${fieldsString}) VALUES (${valuesString})`
}

const constructUpdateStatement = (table, values={}, filters={}) => {
  const setString = Object.keys(values).map((key) => {
    const value = values[key];
    const preparedValue = typeof value === 'string' ? `'${value}'` : value;
    return `${key} = ${preparedValue}`;
  }).join(',');

  console.log('setString',setString)

  const whereString = constructWhereStatement(filters);
  return `UPDATE ${table} SET ${setString} ${whereString.length > 0 ? ('WHERE '+whereString) : ''};`
}

const constructDeleteStatement = (table, filters={}) => {
  const whereString = constructWhereStatement(filters);
  return `DELETE FROM ${table} ${whereString.length > 0 ? ('WHERE '+whereString) : ''};`;
}

const lazyQueryExec = async (statement) => {
  const connection = connectDB();
  return new Promise((resolve, reject) => {
    connection.query(statement,
      (error, results) => {
        if (error) reject(error);
        else resolve(results);
        connection.end();
      }
    );
  });
}

module.exports = {
  connectDB,
  constructWhereStatement,
  constructInsertStatement,
  constructUpdateStatement,
  constructDeleteStatement,
  lazyQueryExec
};
