import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../../../components/Button/Button";
import { FlexRow } from "../../../../components/Flex";
import Table from "../../../../components/Table/Table";
import { timeConverter } from "../../../../libs/datetime";
import { httpProizvodniProces } from "../../../../services";

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  gap: 10px;
  box-sizing: border-box;
  padding: 16px;
`;

export default function ProizvodniProcesSubpage() {
  const navigate = useNavigate();

  const [data, setData] = React.useState(undefined);
  const [isLoading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    httpProizvodniProces.list()
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
        <Button action={() => navigate("/dashboard/proizvodniproces/create")}>
          Dodaj Proizvodni process
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
            cijena: {
              label: "Cijena",
              mapper:(item) => `${item.cijena.toFixed(2)} KM`
            },
            actions: {
              label: "Actions",
              mapper: (item) => {
                return (
                  <FlexRow gap="10px">
                    <Button
                      action={() =>
                        navigate(`/dashboard/proizvodniproces/${item.id}/update`)
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
