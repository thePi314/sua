import { httpPost } from "../../libs/request";

export const update = (id, data) => httpPost(`/proizvodniproces/${id}/update`, data);