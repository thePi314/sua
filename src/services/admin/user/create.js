import { httpPost } from "../../../libs/request";

export const create = (data) => httpPost(`/admin/users/create`, data);