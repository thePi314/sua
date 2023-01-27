import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../../../../components/Button/Button";
import { FlexColumn, FlexRow } from "../../../../components/Flex";
import BaseInput from "../../../../components/Input/BaseInput/BaseInput";
import Label from "../../../../components/Label/Label";
import { httpProizvodi, httpProizvodniProces } from "../../../../services";

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

export default function ManageProizvodiSubpage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [procesi, setProcesi] = React.useState(undefined);

  const [data, setData] = React.useState({
    naziv: null,
    slika_proizvoda: null,
    marza: null,
    proizvodni_proces_id: null,
    cijena: null,
  });
  const [errorMessage, setErrorMessage] = React.useState();
  const [isLoading, setLoading] = React.useState(false);

  const submit = async () => {
    setLoading(true);
    try {
      if (!id)
        await httpProizvodi.create({
          ...data,
          cijena:
            procesi?.find((proces) => proces.id === data.proizvodni_proces_id)
              .cijena * data.marza,
        });
      else
        await httpProizvodi.update(id, {
          ...data,
          cijena:
            procesi?.find((proces) => proces.id === data.proizvodni_proces_id)
              .cijena * data.marza,
        });

      navigate("/dashboard/proizvodi");
    } catch (err) {
      setErrorMessage(err.message);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    if (procesi) return;
    setLoading(true);
    httpProizvodniProces
      .list()
      .then((res) => {
        setProcesi(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, []);

  React.useEffect(() => {
    if (!id) return;

    httpProizvodi
      .get(id)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Wrapper>
      <FlexColumn justifyContent="center" alignItems="center" gap="10px">
        {!id && <h3>Novi Proizvod</h3>}
        {id && <h3>Uredi Proizvod</h3>}

        <Label label="Naziv Proizvoda">
          <BaseInput
            value={data.naziv}
            setValue={(value) => setData({ ...data, naziv: value })}
            type="text"
            placeholder="Unesite naziv"
          />
        </Label>
        <Label label="URL Slika Proizvoda">
          <BaseInput
            value={data.slika_proizvoda}
            setValue={(value) => setData({ ...data, slika_proizvoda: value })}
            type="text"
            placeholder="Unesite url"
          />
        </Label>
        <Label label="Marza">
          <BaseInput
            value={data.marza}
            setValue={(value) => setData({ ...data, marza: +value })}
            type="number"
            placeholder="Unesite marzu"
          />
        </Label>
        <Label label="Cijena">
          <span style={{ fontSize: "16px" }}>
            {data.proizvodni_proces_id && data.marza
              ? procesi?.find(
                  (proces) => proces.id === data.proizvodni_proces_id
                ).cijena *
                  data.marza +
                " KM"
              : "Nije postavljeno"}
          </span>
        </Label>
        <Label label="Proizvodni Proces">
          <select
            style={{ width: "100%", padding: "4px 6px", fontSize: "16px" }}
            onChange={(e) =>
              setData({ ...data, proizvodni_proces_id: +e.target.value })
            }
            value={data.proizvodni_proces_id}
            placeholder="Odaberi Proces"
          >
            {procesi?.map((proces) => (
              <option value={proces.id}>{proces.naziv}</option>
            ))}
          </select>
        </Label>

        {!!errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

        <FlexRow gap="20px" justifyContent="space-between">
          <Button
            disabled={isLoading}
            action={() => navigate("/dashboard/proizvodi")}
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
