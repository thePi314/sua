import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../../../components/Button/Button";
import { FlexRow } from "../../../../components/Flex";
import Table from "../../../../components/Table/Table";
import {
  httpDobavljaci,
  httpProizvodi,
  httpProizvodniProces,
  httpSirovine,
} from "../../../../services";

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  gap: 10px;
  box-sizing: border-box;
  padding: 16px;
`;

export default function ProizvodiSubpage() {
  const navigate = useNavigate();

  const [procesi, setProcese] = React.useState(undefined);
  const [data, setData] = React.useState(undefined);
  const [isLoading, setLoading] = React.useState(false);

  const fetchProcese = () => {
    httpProizvodniProces
      .list()
      .then((res) => {
        setProcese(res.data);
        fetch();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetch = () => {
    setLoading(true);
    httpProizvodi
      .list()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    fetchProcese();
  }, []);

  return (
    <Wrapper>
      <FlexRow>
        <Button action={() => navigate("/dashboard/proizvodi/create")}>
          Dodaj Proizvod
        </Button>
      </FlexRow>
      {isLoading && <>Ucitava...</>}
      {!isLoading && data && (
        <Table
          data={data}
          schema={{
            naziv: {
              label: "Naziv",
            },
            slika_proizvoda: {
              label: "Slika Proizvoda",
              mapper: (item) => (
                <img
                  style={{ width: "64px", height: "64px" }}
                  src={item.slika_proizvoda}
                />
              ),
            },
            marza: {
              label: "Marza",
              mapper: (item) => `${item.marza.toFixed(2)} KM`,
            },
            cijena: {
              label: "Cijena",
              mapper: (item) => `${item.cijena.toFixed(2)} KM`,
            },
            sa_pdvom: {
              label: "Cijena (PDV)",
              mapper: (item) => `${(item.cijena*(1.17)).toFixed(2)} KM`,
            },
            proizvodni_proces_id: {
              label: "Proizvodni proces",
              mapper: (item) => {
                console.log('item',item)
                console.log(procesi)
                const proces = procesi.find(
                  (pItem) => pItem.id === item.proizvodni_proces_id
                );
                return `${proces.naziv}`;
              },
            },
            actions: {
              label: "Akcije",
              mapper: (item) => {
                return (
                  <FlexRow gap="10px">
                    <Button
                      action={() =>
                        navigate(`/dashboard/proizvodi/${item.id}/update`)
                      }
                    >
                      Uredi
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
