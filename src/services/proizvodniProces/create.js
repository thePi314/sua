import { httpPost } from "../../libs/request";

export const create = (data) => httpPost(`/proizvodniproces/create`, data);