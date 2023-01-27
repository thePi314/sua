import { httpPost } from "../../libs/request"

export const httpLogin = (username, password, type='login') => httpPost(`/login`, {username, password, type})