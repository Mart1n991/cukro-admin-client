import { store } from 'kd-web';

export const getEnums = (filters, sort, page) =>
  store.get('enums', filters, sort, page);

export const addEnum = (data) => store.post('enums', data);

export const editEnum = (data) => store.put('enums', data, data._id);

export const deleteEnum = (id) => store.delById('enums', id);
