import { httpGet } from "../../../libs/request";

export const list = () => httpGet(`/admin/users/`);