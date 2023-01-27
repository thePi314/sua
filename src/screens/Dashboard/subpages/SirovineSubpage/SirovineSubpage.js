import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../../../components/Button/Button";
import { FlexRow } from "../../../../components/Flex";
import Table from "../../../../components/Table/Table";
import { httpDobavljaci, httpSirovine } from "../../../../services";

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  gap: 10px;
  box-sizing: border-box;
  padding: 16px;
`;

export default function SirovineSubpage() {
  const navigate = useNavigate();

  const [dobavljaci, setDobavljaci] = React.useState(undefined);
  const [data, setData] = React.useState(undefined);
  const [isLoading, setLoading] = React.useState(false);

  React.useEffect(()=>{
    if(dobavljaci) return;
    setLoading(true);
    httpDobavljaci.list()
      .then((res) => {
        setDobavljaci(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  },[])

  React.useEffect(() => {
    if(!dobavljaci) return;
    if(data) return;

    setLoading(true);
    httpSirovine.list()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, [dobavljaci]);

  return (
    <Wrapper>
      <FlexRow>
        <Button action={() => navigate("/dashboard/sirovine/create")}>
          Dodaj Sirovinu
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
            kolicina: {
              label: "Kolicina",
              mapper:(item) => `${item.kolicina.toFixed(5)} ${item.jedinica_mjere}`
            },
            min_kolicina: {
              label: "Minimalna kolicina",
              mapper:(item) => `${item.min_kolicina.toFixed(5)} ${item.jedinica_mjere}`
            },
            cijena: {
              label: "Cijena",
              mapper:(item) => `${item.cijena.toFixed(2)} KM`
            },
            da_li_se_koristi: {
              label: "Korisit li se",
              mapper:(item) => item?.da_li_se_koristi ? "DA" : "NE"
            },
            dobavljac_id: {
              label: "Dobavljac",
              mapper: (item) => dobavljaci.find(dobavljac => dobavljac.id === item.dobavljac_id).naziv,
            },
            actions: {
              label: "Actions",
              mapper: (item) => {
                return (
                  <FlexRow gap="10px">
                    <Button
                      action={() =>
                        navigate(`/dashboard/sirovine/${item.id}/update`)
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
