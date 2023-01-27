import { httpGet } from "../../libs/request";

export const listStavke = (id) => httpGet(`/proizvodniproces/${id}/stavke`);