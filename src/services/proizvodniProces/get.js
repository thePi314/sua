import { httpGet } from "../../libs/request";

export const get = (id) => httpGet(`/proizvodniproces/${id}`);