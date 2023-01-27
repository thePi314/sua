import { httpPost } from "../../libs/request";

export const create = (data) => httpPost(`/dobavljaci/create`, data);