import { httpPost } from "../../libs/request";

export const create = (data) => httpPost(`/sirovine/create`, data);