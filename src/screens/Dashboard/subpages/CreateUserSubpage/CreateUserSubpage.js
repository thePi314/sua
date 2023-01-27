import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../../../../components/Button/Button";
import { FlexColumn, FlexRow } from "../../../../components/Flex";
import BaseInput from "../../../../components/Input/BaseInput/BaseInput";
import Label from "../../../../components/Label/Label";
import { httpAdmin } from "../../../../services";

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

export default function CreateUsersSubpage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = React.useState({
    username: null,
    password: null,
    role: "",
    ime: null,
    prezime: null,
    broj_telefona: null,
    adresa: null,
    email: null,
  });
  const [errorMessage, setErrorMessage] = React.useState();
  const [isLoading, setLoading] = React.useState(false);

  const submit = async () => {
    setLoading(true)
    try{
      if(!id) await httpAdmin.users.create(data);
      else await httpAdmin.users.update(id, data);
    }
    catch(err){
      setErrorMessage(err.message)
    }
    setLoading(false);
    navigate("/dashboard/users")
  };

  React.useEffect(() => {
    if (!id) return;

    httpAdmin.users
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
        {!id && <h3>Novi Zaposlenik</h3>}
        {id && <h3>Uredi Zaposlenika</h3>}

        {!id && (
          <>
            <Label label="Korisnicko Ime">
              <BaseInput
                value={data.username}
                setValue={(value) => setData({ ...data, username: value })}
                type="text"
                placeholder="Unesite korisnicko ime"
              />
            </Label>
            <Label label="Lozinka">
              <BaseInput
                value={data.password}
                setValue={(value) => setData({ ...data, password: value })}
                type="text"
                placeholder="Unesite lozinku"
              />
            </Label>
          </>
        )}
        <Label label="Je li admin">
          <BaseInput
            value={data.role === "Admin"}
            setValue={(value) =>
              setData({ ...data, role: value ? "Admin" : "" })
            }
            type="checkbox"
          />
        </Label>

        <Label label="Ime Zaposlenika">
          <BaseInput
            value={data.ime}
            setValue={(value) => setData({ ...data, ime: value })}
            type="text"
            placeholder="Unesite ime"
          />
        </Label>

        <Label label="Prezime Zaposlenima">
          <BaseInput
            value={data.prezime}
            setValue={(value) => setData({ ...data, prezime: value })}
            type="text"
            placeholder="Unesite prezime"
          />
        </Label>

        <Label label="Broj telefona">
          <BaseInput
            value={data.broj_telefona}
            setValue={(value) => setData({ ...data, broj_telefona: value })}
            type="text"
            placeholder="Unesite Broj Telefona"
          />
        </Label>

        <Label label="Adresa">
          <BaseInput
            value={data.adresa}
            setValue={(value) => setData({ ...data, adresa: value })}
            type="text"
            placeholder="Unesite adresu"
          />
        </Label>

        <Label label="Broj email">
          <BaseInput
            value={data.email}
            setValue={(value) => setData({ ...data, email: value })}
            type="text"
            placeholder="Unesite email"
          />
        </Label>

        {!!errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

        <FlexRow gap="20px" justifyContent="space-between">
          <Button
            disabled={isLoading}
            action={() => navigate("/dashboard/users")}
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
