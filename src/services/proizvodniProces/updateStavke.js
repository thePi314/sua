import { httpPost } from "../../libs/request";

export const updateStavke = (id, data) => httpPost(`/proizvodniproces/${id}/stavke/update`, data);