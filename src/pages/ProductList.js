import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container, Grid, Pagination } from '@mui/material';
import ProductListToolbar from '../components/product/ProductListToolbar';
import ProductCard from '../components/product/ProductCard';
import { useCukro } from 'src/contexts/cukro';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductList = () => {
  const { products, getProducts, deleteProduct, setProduct, updateProduct } = useCukro();
  useEffect(() => {
    const response = getProducts();
    toast.promise(response, {
      pending: 'Produkty sa načítavajú',
      error: 'Produkty sa nepodarilo načítať'
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Produkty | Cukro</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <ProductListToolbar setProduct={setProduct} getProducts={getProducts} />
          <Box sx={{ pt: 5 }}>
            <Grid container spacing={3}>
              {products.data.map((item) => (
                <Grid item key={item._id} lg={3} md={4} xs={12}>
                  <ProductCard item={item} deleteProduct={deleteProduct} updateProduct={updateProduct} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pt: 3
            }}
          >
            {/* <Pagination color="primary" count={3} size="small" /> */}
          </Box>
        </Container>
        <ToastContainer />
      </Box>
    </>
  );
};

export default ProductList;
