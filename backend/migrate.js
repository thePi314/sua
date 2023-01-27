const config = require("./config");
const { lazyQueryExec, constructInsertStatement } = require("./db");
const { hashCreds } = require("./utilities/hash");

const SysAdminKorisnik = {
  korisnicko_ime: config.SYS_ADMIN_USERNAME,
  role: "Admin",
  sifra: hashCreds(config.SYS_ADMIN_USERNAME, config.SYS_ADMIN_PASSWORD),
};

const migrations = [
  async () => {
    // Provjera postojanja administratora
    let admin = (await lazyQueryExec(`SELECT * FROM Korisnik WHERE korisnicko_ime='${SysAdminKorisnik.korisnicko_ime}'`))[0];
    if (!admin) {
      console.log('[INFO] SysAdmin user does not exists');
      console.log('[INFO] Creating SysAdmin user');
      // Kreiranje Sistemskog Administratora
      await lazyQueryExec(constructInsertStatement("Korisnik", SysAdminKorisnik));

      admin = (await lazyQueryExec(`SELECT * FROM Korisnik WHERE korisnicko_ime='${SysAdminKorisnik.korisnicko_ime}'`))[0];
      await lazyQueryExec(constructInsertStatement("Zaposlenik", {korisnik_id: admin.id}));
    }
    else {
      console.log('[INFO] SysAdmin user exists');
    }
  },
];

module.exports = {
  migrations
}
