import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../../../components/Button/Button";
import { FlexRow } from "../../../../components/Flex";
import Table from "../../../../components/Table/Table";
import { timeConverter } from "../../../../libs/datetime";
import { httpAdmin, httpDobavljaci } from "../../../../services";

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  gap: 10px;
  box-sizing: border-box;
  padding: 16px;
`;

export default function DobavljaciSubpage() {
  const navigate = useNavigate();

  const [data, setData] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);

  const submit = async (item) => {
    try {
      const sData = item?.datum_zavrsetka
        ? {
          datum_zavrsetka: null,
            datum_pocetka: Math.round(Date.now() / 1000),
          }
        : {
          datum_zavrsetka: Math.round(Date.now() / 1000),
          };

      await httpDobavljaci.update(item.id, sData);

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
    httpDobavljaci.list()
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
        <Button action={() => navigate("/dashboard/dobavljaci/create")}>
          Dodaj Dobavljaca
        </Button>
      </FlexRow>
      {isLoading && <>Ucitava...</>}
      {!isLoading && (
        <Table
          data={data}
          schema={{
            naziv: {
              label: "Naziv",
            },
            jib: {
              label: "JIB Broj",
            },
            pdv: {
              label: "PDV",
            },
            broj_telefona: {
              label: "Telefon",
            },
            kontakt_osoba: {
              label: "Kontakt Osoba",
            },
            email_adresa: {
              label: "Email",
            },
            datum_pocetka: {
              label: "Datum pocetka",
              mapper: (item) => timeConverter(item.datum_pocetka),
            },
            datum_zavrsetka: {
              label: "Datum zavrsetka",
              mapper: (item) =>
                item.datum_zavrsetka
                  ? timeConverter(item.datum_zavrsetka)
                  : "Neodredjeno",
            },
            actions: {
              label: "Actions",
              mapper: (item) => {
                return (
                  <FlexRow gap="10px">
                    <Button
                      action={() =>
                        navigate(`/dashboard/dobavljaci/${item.id}/update`)
                      }
                    >
                      Uredi
                    </Button>
                    <Button action={() => submit(item)}>
                      {!item?.datum_zavrsetka && <>Zavrsi</>}
                      {item?.datum_zavrsetka && <>Zapocni</>}
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
