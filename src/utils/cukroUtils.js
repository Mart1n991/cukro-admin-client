import { ajax } from 'kd-web';

const buildUrl = (path) => {
  return `https://localhost:44388/api/${path}`;
};

export const getProducts = async (filters, sort, page) => {
  const url = buildUrl('product');
  const res = await ajax.get(url, filters, sort, page);
  const productCategoryName = (categoryId) => {
    switch (categoryId) {
      case '6217af354c49a4266b3007ac':
        return 'Koláče';
      case '6217af9b4c49a4266b3007ad':
        return 'Torty';
      default:
        return 'Špeciality';
    }
  };

  const data = res.data.map((x) => {
    return {
      ...x,
      categoryRefs: [{ id: x.categoryRefs[0].id, name: productCategoryName(x.categoryRefs[0].id) }]
    };
  });

  return {
    total: res.total,
    data: data
  };
};

export const getProduct = (id) => {
  const url = buildUrl('product');
  return ajax.getById(url, id);
};

export const addProduct = (data) => {
  const url = buildUrl('product');
  const req = {
    categoryRefs: [{ id: data.categoryId }],
    name: data.name,
    weight: data.weight,
    variants: { flavour: data.flavour, shape: data.shape },
    price: data.price,
    materials: data.materials,
    minimumAmount: data.minimumAmount,
    uniqueCategoryId: data.uniqueCategoryId
  };
  return ajax.post(url, req);
};

export const editProduct = async (id, data) => {
  const url = buildUrl('product');
  const req = {
    categoryRefs: [{ id: data.categoryId }],
    deliveryDate: data.deliveryDate,
    name: data.name,
    weight: data.weight,
    variants: { flavour: data.flavour, shape: data.shape },
    price: data.price,
    materials: data.materials,
    minimumAmount: data.minimumAmount,
    disabled: data.disabled,
    promote: data.promote
  };
  return await ajax.put(url, req, id);
};

export const deleteProduct = async (id) => {
  const url = buildUrl(`product`);
  await ajax.delById(url, id);
};

export const getCategoryList = async (filters, sort, page) => {
  const url = buildUrl('category');
  const res = await ajax.get(url, filters, sort, page);
  const data = res.data.map((x) => {
    return {
      categoryId: x._id,
      name: x.name
    };
  });
  return {
    data: data,
    total: res.total
  };
};

export const userMeta = () => {
  const url = buildUrl('user/meta');
  return ajax.get(url);
};

export const postUserMeta = async (data) => {
  for (let name in data) {
    const url = buildUrl(`user/meta`);
    await ajax.post(url, data[name], { key: name });
  }
};
