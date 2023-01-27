import { httpPost } from "../../libs/request";

export const update = (id, data) => httpPost(`/dobavljaci/${id}/update`, data);