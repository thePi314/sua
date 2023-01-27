import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../../../../components/Button/Button";
import { FlexColumn, FlexRow } from "../../../../components/Flex";
import BaseInput from "../../../../components/Input/BaseInput/BaseInput";
import Label from "../../../../components/Label/Label";
import { httpProizvodniProces, httpSirovine } from "../../../../services";

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

export default function ManageProizvodniProcesSubpage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [sirovine, setSirovine] = React.useState(undefined);

  const [data, setData] = React.useState({
    naziv: null,
    cijena: null,
    sirovine: [],
  });
  const [errorMessage, setErrorMessage] = React.useState();
  const [isLoading, setLoading] = React.useState(false);

  const [price, setPrice] = React.useState(0);

  const updateStavke = async (iId) => {
    httpProizvodniProces
      .updateStavke(iId, {
        stavke: data.sirovine
          .filter((sItem) => sItem.sirovina_id)
          .map((sItem) => ({
            sirovina_id: sItem.sirovina_id,
            kolicina: sItem.kolicina,
          })),
      })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  const submitCreate = () => {
    setLoading(true);

    httpProizvodniProces
      .create({
        naziv: data.naziv,
        cijena: price,
      })
      .then(async (res) => {
        const resId = res.data.id.id;
        await updateStavke(resId);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  };

  const submitUpdate = () => {
    setLoading(true);

    httpProizvodniProces
      .update(id, {
        naziv: data.naziv,
        cijena: price,
      })
      .then(async (res) => {
        await updateStavke(id);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  };

  const submit = async () => {
    try {
      if (!id) await submitCreate();
      else await submitUpdate();

      navigate("/dashboard/proizvodniproces");
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const fetchPostojeceStavke = (tData) => {
    httpProizvodniProces
      .listStavke(id)
      .then((res) => {
        setData({
          ...tData,
          sirovine: res.data.map((sItem) => ({
            kolicina: sItem.kolicina,
            sirovina_id: sItem.sirovina_id,
          })),
        });
      })
      .catch((err) => console.log(err));
  };

  const fetchSirovine = () => {
    httpSirovine
      .list()
      .then((res) => {
        setSirovine(res.data);
        if (id) fetch();
      })
      .catch((err) => console.log(err));
  };

  const fetch = () => {
    httpProizvodniProces
      .get(id)
      .then((res) => {
        fetchPostojeceStavke({
          naziv: res.data.naziv,
          cijena: res.data.cijena,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const calculatePrice = () => {
    let price = 0;
    for (let i = 0; i < data.sirovine.length; i++) {
      if (!data.sirovine[i].sirovina_id) continue;
      const sirovina = sirovine.find(
        (sItem) => sItem.id === data.sirovine[i].sirovina_id
      );
      price += sirovina.cijena * data.sirovine[i].kolicina;
    }

    setPrice(price);
  };

  React.useEffect(() => {
    fetchSirovine();
  }, []);

  React.useEffect(() => {
    calculatePrice();
  }, [data.sirovine]);

  return (
    <Wrapper>
      <FlexColumn justifyContent="center" alignItems="center" gap="10px">
        {!id && <h3>Novi Proizvodni proces</h3>}
        {id && <h3>Uredi Proizvodni proces</h3>}

        <Label label="Naziv Proizvodnog procesa">
          <BaseInput
            value={data.naziv}
            setValue={(value) => setData({ ...data, naziv: value })}
            type="text"
            placeholder="Unesite naziv"
          />
        </Label>
        <Label label="Cijena">
          <span style={{ fontSize: "16px" }}>{price.toFixed(2)} KM</span>
        </Label>
        <Label
          label={
            <FlexRow gap="20px">
              <span>Sirovine</span>
              <Button
                action={() =>
                  setData({
                    ...data,
                    sirovine: [
                      ...data.sirovine,
                      { sirovina_id: null, kolicina: 0 },
                    ],
                  })
                }
              >
                Dodaj
              </Button>
            </FlexRow>
          }
        >
          <FlexColumn gap="20px">
            {data?.sirovine &&
              data?.sirovine?.map((sItem, index) => {
                return (
                  <FlexRow gap="20px" alignItems="center">
                    <Label label="Odaberi sirovinu">
                      <select
                        style={{
                          width: "100%",
                          padding: "4px 6px",
                          fontSize: "16px",
                        }}
                        onChange={(e) => {
                          setData({
                            ...data,
                            sirovine: data.sirovine.map((dsItem, dsIndex) => {
                              if (dsIndex === index) {
                                return {
                                  ...dsItem,
                                  sirovina_id: +e.target.value,
                                };
                              }

                              return dsItem;
                            }),
                          });
                        }}
                        value={sItem.sirovina_id}
                        placeholder="Odaberi sirovinu"
                      >
                        {sirovine?.map((sirovina) => (
                          <option value={sirovina.id}>{sirovina.naziv}</option>
                        ))}
                      </select>
                    </Label>
                    <Label label="Cijena nabavke">
                      <BaseInput
                        value={sItem.kolicina}
                        setValue={(value) =>
                          setData({
                            ...data,
                            sirovine: data.sirovine.map((dsItem, dsIndex) => {
                              if (dsIndex === index) {
                                return {
                                  ...dsItem,
                                  kolicina: +value,
                                };
                              }

                              return dsItem;
                            }),
                          })
                        }
                        type="number"
                        placeholder="Unesite kolicinu"
                      />
                    </Label>
                    <Button
                      style={{ height: "max-content" }}
                      action={() =>
                        setData({
                          ...data,
                          sirovine: data.sirovine.filter(
                            (_, sdIndex) => sdIndex !== index
                          ),
                        })
                      }
                    >
                      Izbaci
                    </Button>
                  </FlexRow>
                );
              })}
          </FlexColumn>
        </Label>

        {!!errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

        <FlexRow gap="20px" justifyContent="space-between">
          <Button
            disabled={isLoading}
            action={() => navigate("/dashboard/proizvodniproces")}
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
