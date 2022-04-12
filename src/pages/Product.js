import React, { useEffect } from 'react';
import { useMatch, useParams } from 'react-router';
import { Box, Container, Typography } from '@mui/material';
import { useCukro } from 'src/contexts/cukro';
import ProductForm from 'src/components/product/ProductForm';

export default function Product() {
  const { getCategoryList, categoryList, getProduct } = useCukro();

  // z url odchytit id produktu
  let productId = useParams();
  console.log('productId: ', productId);

  const match = useMatch(`app/produkt/${productId.id}/kopia`);

  useEffect(async () => {
    await getCategoryList();

    //dotiahnuť daný produkt
    if (Object.keys(productId).length > 0) {
      await getProduct(productId.id);
    }
  }, []);

  const productHeading = () => {
    if (Object.keys(productId).length > 0 && match === null) return 'Úprava produktu';
    if (match !== null) return 'Kópia produktu';
    if (Object.keys(productId).length === 0) return 'Nový produkt';
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
        <Typography variant="h1">{productHeading()}</Typography>
      </Box>
      <Container maxWidth="lg">
        <ProductForm categoryList={categoryList} productId={productId.id} />
      </Container>
    </Box>
  );
}
