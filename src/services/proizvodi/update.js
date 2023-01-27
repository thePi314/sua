import { httpPost } from "../../libs/request";

export const update = (id, data) => httpPost(`/proizvodi/${id}/update`, data);