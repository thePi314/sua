import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../../../../components/Button/Button";
import { FlexColumn, FlexRow } from "../../../../components/Flex";
import BaseInput from "../../../../components/Input/BaseInput/BaseInput";
import Label from "../../../../components/Label/Label";
import { httpAdmin, httpDobavljaci, httpSirovine } from "../../../../services";

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

export default function ManageSirovineSubpage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [dobavljaci, setDobavljaci] = React.useState(undefined);

  const [data, setData] = React.useState({
    naziv: null,
    kolicina: null,
    min_kolicina: null,
    cijena: null,
    jedinica_mjere: null,
    da_li_se_koristi: null,
    dobavljac_id: null,
  });
  const [errorMessage, setErrorMessage] = React.useState();
  const [isLoading, setLoading] = React.useState(false);

  const submit = async () => {
    setLoading(true);
    try {
      if (!id) await httpSirovine.create(data);
      else await httpSirovine.update(id, data);
      
      navigate("/dashboard/sirovine");
    } catch (err) {
      setErrorMessage(err.message);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    if (dobavljaci) return;
    setLoading(true);
    httpDobavljaci
      .list()
      .then((res) => {
        setDobavljaci(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, []);

  React.useEffect(() => {
    if (!id) return;

    httpSirovine
      .get(id)
      .then((res) => {
        setData({
          naziv: res.data.naziv,
          kolicina: res.data.kolicina,
          min_kolicina: res.data.min_kolicina,
          cijena: res.data.cijena,
          jedinica_mjere: res.data.jedinica_mjere,
          da_li_se_koristi: res.data.da_li_se_koristi,
          dobavljac_id: res.data.dobavljac_id,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Wrapper>
      <FlexColumn justifyContent="center" alignItems="center" gap="10px">
        {!id && <h3>Nova Sirovina</h3>}
        {id && <h3>Uredi Sirovinu</h3>}

        <Label label="Naziv Sirovine">
          <BaseInput
            value={data.naziv}
            setValue={(value) => setData({ ...data, naziv: value })}
            type="text"
            placeholder="Unesite naziv"
          />
        </Label>
        <Label label="Kolicina sirovine">
          <BaseInput
            value={data.kolicina}
            setValue={(value) => setData({ ...data, kolicina: +value })}
            type="number"
            placeholder="Unesite kolicinu"
          />
        </Label>
        <Label label="Minimalna kolicina sirovine">
          <BaseInput
            value={data.min_kolicina}
            setValue={(value) => setData({ ...data, min_kolicina: +value })}
            type="number"
            placeholder="Unesite minimalnu kolicinu"
          />
        </Label>
        <Label label="Cijena nabavke">
          <BaseInput
            value={data.cijena}
            setValue={(value) => setData({ ...data, cijena: +value })}
            type="number"
            placeholder="Unesite cijenu"
          />
        </Label>

        <Label label="Jedinica mjere">
          <BaseInput
            value={data.jedinica_mjere}
            setValue={(value) => setData({ ...data, jedinica_mjere: value })}
            type="text"
            placeholder="Unesite jedinicu mjere"
          />
        </Label>

        <Label label="Da li je u upotrebi?">
          <BaseInput
            value={data.da_li_se_koristi}
            setValue={(value) => setData({ ...data, da_li_se_koristi: value })}
            type="checkbox"
          />
        </Label>

        <Label label="Dobavljaci">
          <select
            style={{ width: "100%", padding: "4px 6px", fontSize: "16px" }}
            onChange={e => setData({...data, dobavljac_id: +e.target.value})}
            value={data.dobavljac_id}
            placeholder="Odaberi dobavljaca"
          >
            {dobavljaci?.map((dobavljac) => (
              <option value={dobavljac.id}>
                {dobavljac.naziv}
              </option>
            ))}
          </select>
        </Label>

        {!!errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

        <FlexRow gap="20px" justifyContent="space-between">
          <Button
            disabled={isLoading}
            action={() => navigate("/dashboard/sirovine")}
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
