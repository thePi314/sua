import { httpPost } from "../../libs/request";

export const create = (data) => httpPost(`/proizvodi/create`, data);