import React, { useState, useContext } from 'react';
import * as cukroUtils from '../utils/cukroUtils';

const CukroContext = React.createContext();

export function CukroProvider({ children }) {
  const [products, setProducts] = useState({
    data: [],
    total: 0
  });

  const [product, setProduct] = useState({
    categoryId: '',
    name: '',
    weight: '',
    deliveryDate: '',
    hasShape: false,
    flavour: '',
    shape: '',
    price: 0,
    material: '',
    materials: [],
    minimumAmount: 1,
    disabled: false,
    promote: false
  });

  const [categoryList, setCategoryList] = useState({
    data: [],
    total: 0
  });

  const [userMeta, setUserMeta] = useState({
    paymentType: 'stripe',
    weddings: false,
    stopProduction: false,
    color: '#E2A3C7'
  });

  async function getProducts(filters, sort, page) {
    try {
      const data = await cukroUtils.getProducts(filters, sort, page);
      setProducts(data);
    } catch (error) {
      throw new Error('Produkty sa nepodarilo načítať');
    }
  }

  async function getProduct(id) {
    const data = await cukroUtils.getProduct(id);
    setProduct({
      categoryId: data.categoryRefs[0].id,
      name: data.name,
      weight: data.weight,
      deliveryDate: data.deliveryDate,
      hasShape: data.variants.shape.length > 0,
      flavour: data.variants.flavour,
      shape: data.variants.shape,
      price: data.price,
      material: '',
      materials: data.materials,
      minimumAmount: data.minimumAmount,
      promote: data.promote
    });
  }

  async function getCategoryList(filters, sort, page) {
    try {
      const res = await cukroUtils.getCategoryList(filters, sort, page);
      setCategoryList(res);
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  async function updateProduct(id, product) {
    const updatedProduct = await cukroUtils.editProduct(id, product);
    const newProductsData = products.data.map((curr) => {
      if (curr._id === id) {
        return updatedProduct;
      }
      return curr;
    });

    setProducts({ total: products.total, data: newProductsData });
  }

  async function deleteProduct(id) {
    try {
      await cukroUtils.deleteProduct(id);

      const newProductsData = products.data.filter((curr) => curr._id !== id);

      setProducts({ total: products.total, data: newProductsData });
    } catch (error) {
      console.log(error);
    }
  }

  async function getUserMeta() {
    try {
      const res = await cukroUtils.userMeta();
      setUserMeta({
        paymentType: res.paymentType,
        weddings: res.weddings,
        stopProduction: res.stopProduction,
        color: res.color
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  return (
    <CukroContext.Provider
      value={{
        products,
        product,
        categoryList,
        getProducts,
        getProduct,
        setProduct,
        getCategoryList,
        addProduct: cukroUtils.addProduct,
        editProduct: cukroUtils.editProduct,
        deleteProduct,
        updateProduct,
        getUserMeta,
        postUserMeta: cukroUtils.postUserMeta,
        userMeta
      }}
    >
      {children}
    </CukroContext.Provider>
  );
}

export function withData(WrappedComponent) {
  function Component(props) {
    return <CukroContext.Consumer>{(data) => <WrappedComponent {...props} data={data} />}</CukroContext.Consumer>;
  }

  return Component;
}

export function useCukro() {
  return useContext(CukroContext);
}
