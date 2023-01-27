CREATE TABLE Korisnik (
  id int PRIMARY KEY AUTO_INCREMENT,
  korisnicko_ime varchar(255),
  role varchar(255),
  sifra varchar(255)
);

CREATE TABLE Zaposlenik (
  korisnik_id int,
  ime varchar(255),
  prezime varchar(255),
  broj_telefona varchar(255),
  adresa varchar(255),
  email varchar(255),
  datum_zaposlenja int,
  datum_otkaza int
);

CREATE TABLE Sirovina (
  id int PRIMARY KEY AUTO_INCREMENT,
  naziv varchar(255),
  kolicina float,
  min_kolicina float,
  cijena float,
  jedinica_mjere varchar(255),
  da_li_se_koristi tinyint(1),
  dobavljac_id int
);

CREATE TABLE Dobavljac (
  id int PRIMARY KEY AUTO_INCREMENT,
  naziv varchar(255),
  jib varchar(255),
  pdv varchar(255),
  broj_telefona varchar(255),
  kontakt_osoba varchar(255),
  email_adresa varchar(255),
  datum_pocetka int,
  datum_zavrsetka int
);

CREATE TABLE Proizvod (
  id int PRIMARY KEY AUTO_INCREMENT,
  naziv varchar(255),
  slika_proizvoda varchar(255),
  proizvodni_proces_id int,
  marza float,
  cijena float
);

CREATE TABLE Proizvodni_proces (
  id int PRIMARY KEY AUTO_INCREMENT,
  naziv varchar(255),
  datum_pocetka int,
  datum_zavrsetka int,
  cijena float
);

CREATE TABLE Proizvodi_proces_stavka (
  Proizvodni_proces_id int,
  sirovina_id int,
  kolicina float
);

CREATE TABLE Sesija (
  korisnik_id int,
  sesijski_kljuc varchar(255),
  vazi_do int
);

ALTER TABLE Zaposlenik ADD FOREIGN KEY (korisnik_id) REFERENCES Korisnik (id);

ALTER TABLE Sirovina ADD FOREIGN KEY (dobavljac_id) REFERENCES Dobavljac (id);

ALTER TABLE Proizvodi_proces_stavka ADD FOREIGN KEY (sirovina_id) REFERENCES Sirovina (id);

ALTER TABLE Proizvodi_proces_stavka ADD FOREIGN KEY (Proizvodni_proces_id) REFERENCES Proizvodni_proces (id);

ALTER TABLE Proizvod ADD FOREIGN KEY (proizvodni_proces_id) REFERENCES Proizvodni_proces (id);

ALTER TABLE Sesija ADD FOREIGN KEY (korisnik_id) REFERENCES Korisnik (id);
