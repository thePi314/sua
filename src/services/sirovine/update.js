import { httpPost } from "../../libs/request";

export const update = (id, data) => httpPost(`/sirovine/${id}/update`, data);