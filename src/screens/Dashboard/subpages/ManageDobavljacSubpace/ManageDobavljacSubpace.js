import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../../../../components/Button/Button";
import { FlexColumn, FlexRow } from "../../../../components/Flex";
import BaseInput from "../../../../components/Input/BaseInput/BaseInput";
import Label from "../../../../components/Label/Label";
import { httpAdmin, httpDobavljaci } from "../../../../services";

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  gap: 10px;
  box-sizing: border-box;
  padding: 16px;
`;

const ErrorMessage = styled.div`
  padding: 10px 0;
  font-size: 14px;
  /* TODO Change this to be pulled from constants */
  color: red;
`;

export default function ManageDobavljacSubpace() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = React.useState({
    naziv: null,
    jib: null,
    pdv: "",
    broj_telefona: null,
    kontakt_osoba: null,
    email_adresa: null,
  });
  const [errorMessage, setErrorMessage] = React.useState();
  const [isLoading, setLoading] = React.useState(false);

  const submit = async () => {
    setLoading(true);
    try {
      if (!id)
        await httpDobavljaci.create({
          ...data,
          datum_pocetka: Math.round(Date.now() / 1000),
        });
      else await httpDobavljaci.update(id, data);
    } catch (err) {
      setErrorMessage(err.message);
    }
    setLoading(false);
    navigate("/dashboard/dobavljaci");
  };

  React.useEffect(() => {
    if (!id) return;

    httpDobavljaci
      .get(id)
      .then((res) => {
        setData({
          naziv: res.data.naziv,
          jib: res.data.jib,
          pdv: res.data.pdv,
          broj_telefona: res.data.broj_telefona,
          kontakt_osoba: res.data.kontakt_osoba,
          email_adresa: res.data.email_adresa,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Wrapper>
      <FlexColumn justifyContent="center" alignItems="center" gap="10px">
        {!id && <h3>Novi Dobavljac</h3>}
        {id && <h3>Uredi Dobavljaca</h3>}

        <Label label="Naziv Dobavljaca">
          <BaseInput
            value={data.naziv}
            setValue={(value) => setData({ ...data, naziv: value })}
            type="text"
            placeholder="Unesite naziv dobavljaca"
          />
        </Label>
        <Label label="JIB Broj">
          <BaseInput
            value={data.jib}
            setValue={(value) => setData({ ...data, jib: value })}
            type="text"
            placeholder="Unesite jib"
          />
        </Label>


        <Label label="Unesite PDV Broj">
          <BaseInput
            value={data.pdv}
            setValue={(value) => setData({ ...data, pdv: value })}
            type="text"
            placeholder="Unesite pdv"
          />
        </Label>

        <Label label="Kontakt telefon">
          <BaseInput
            value={data.broj_telefona}
            setValue={(value) => setData({ ...data, broj_telefona: value })}
            type="text"
            placeholder="Unesite telefon"
          />
        </Label>

        <Label label="Kontakt Osoba">
          <BaseInput
            value={data.kontakt_osoba}
            setValue={(value) => setData({ ...data, kontakt_osoba: value })}
            type="text"
            placeholder="Unesite ime kontakt osoba"
          />
        </Label>

        <Label label="Kontakt email">
          <BaseInput
            value={data.email_adresa}
            setValue={(value) => setData({ ...data, email_adresa: value })}
            type="text"
            placeholder="Unesite email"
          />
        </Label>

        {!!errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

        <FlexRow gap="20px" justifyContent="space-between">
          <Button
            disabled={isLoading}
            action={() => navigate("/dashboard/dobavljaci")}
          >
            Odustani
          </Button>
          <Button disabled={isLoading} action={submit}>
            Potvrdi
          </Button>
        </FlexRow>
      </FlexColumn>
    </Wrapper>
  );
}
