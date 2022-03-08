import { auth as a } from "kd-web";

export const auth = (username, password) => a.auth(username, password)

export const updateUser = (data) => a.updateUser(data._id, data);

export const getUsers = (filters, sort, page, search) => a.getUsers(filters, sort, page, search);