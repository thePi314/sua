import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../../../components/Button/Button";
import { FlexRow } from "../../../../components/Flex";
import Table from "../../../../components/Table/Table";
import { timeConverter } from "../../../../libs/datetime";
import { httpAdmin } from "../../../../services";

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  gap: 10px;
  box-sizing: border-box;
  padding: 16px;
`;

export default function UserSubpage() {
  const navigate = useNavigate();

  const [data, setData] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);

  const submit = async (item) => {
    try {
      const sData = item?.datum_otkaza
        ? {
            datum_otkaza: null,
            datum_zaposlenja: Math.round(Date.now() / 1000),
          }
        : {
            datum_otkaza: Math.round(Date.now() / 1000),
          };

      await httpAdmin.users.update(item.id, sData);

      setData(
        data.map((dItem) => {
          if (dItem.id === item.id)
            return {
              ...dItem,
              ...sData,
            };

          return dItem;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    setLoading(true);
    httpAdmin.users
      .list()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Wrapper>
      <FlexRow>
        <Button action={() => navigate("/dashboard/users/create")}>
          Dodaj korisnika
        </Button>
      </FlexRow>
      {isLoading && <>Ucitava...</>}
      {!isLoading && (
        <Table
          data={data}
          schema={{
            korisnicko_ime: {
              label: "Koriscnicko ime",
            },
            ime: {
              label: "Ime",
            },
            prezime: {
              label: "Prezime",
            },
            broj_telefona: {
              label: "Telefon",
            },
            adresa: {
              label: "Adresa",
            },
            email: {
              label: "Email",
            },
            datum_zaposlenja: {
              label: "Datum zaposlenja",
              mapper: (item) => timeConverter(item.datum_zaposlenja),
            },
            datum_otkaza: {
              label: "Datum otkaza",
              mapper: (item) =>
                item.datum_otkaza
                  ? timeConverter(item.datum_otkaza)
                  : "Neodredjeno",
            },
            actions: {
              label: "Actions",
              mapper: (item) => {
                return (
                  <FlexRow gap="10px">
                    <Button
                      action={() =>
                        navigate(`/dashboard/users/${item.id}/update`)
                      }
                    >
                      Uredi
                    </Button>
                    <Button action={() => submit(item)}>
                      {!item?.datum_otkaza && <>Otpusti</>}
                      {item?.datum_otkaza && <>Vrati na poziciju</>}
                    </Button>
                  </FlexRow>
                );
              },
            },
          }}
        />
      )}
    </Wrapper>
  );
}
