import { httpPost } from "../../../libs/request";

export const update = (id, data) => httpPost(`/admin/users/${id}/update`, data);