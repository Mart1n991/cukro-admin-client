import { useState } from 'react';
import { Grid, Box, Button, Card, CardContent, TextField, InputAdornment, SvgIcon } from '@mui/material';
import { Search as SearchIcon } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const ProductListToolbar = (props) => {
  const [activeFilter, setActiveFilter] = useState('all');
  console.log('activeFilter: ', activeFilter);
  let navigate = useNavigate();

  const newProduct = () => {
    navigate('../produkt/novy');
    props.setProduct({
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
      minimumAmount: 1
    });
  };

  const filterProducts = (op, categoryId) => {
    const filter = [{ field: 'categoryRefs.id', op: op, value: categoryId }];
    const response = categoryId === '' ? props.getProducts() : props.getProducts(filter);
    toast.promise(response, {
      pending: 'Produkty sa načítavajú',
      error: 'Produkty sa nepodarilo načítať'
    });

    switch (categoryId) {
      case '6217af9b4c49a4266b3007ad':
        setActiveFilter('torty');
        break;
      case '6217af354c49a4266b3007ac':
        setActiveFilter('kolace');
        break;
      case '6217ae954c49a4266b3007ab':
        setActiveFilter('speciality');
        break;
      default:
        setActiveFilter('all');
    }
  };

  return (
    <Box {...props}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Button color="primary" variant="contained" onClick={newProduct}>
          Pridať produkt
        </Button>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Grid container>
              <Grid item lg={6} sx={{ maxWidth: '500px' }}>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon fontSize="small" color="action">
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    )
                  }}
                  placeholder="Vyhľadať produkt"
                  variant="outlined"
                />
              </Grid>
              <Grid item lg={6} px={2} sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <Button variant={activeFilter === 'all' ? 'contained' : 'outlined'} onClick={() => filterProducts('Eq', '')}>
                  Všetko
                </Button>
                <Button
                  variant={activeFilter === 'torty' ? 'contained' : 'outlined'}
                  onClick={() => filterProducts('Eq', '6217af9b4c49a4266b3007ad')}
                >
                  Torty
                </Button>
                <Button
                  variant={activeFilter === 'speciality' ? 'contained' : 'outlined'}
                  onClick={() => filterProducts('Eq', '6217ae954c49a4266b3007ab')}
                >
                  Špeciality
                </Button>
                <Button
                  variant={activeFilter === 'kolace' ? 'contained' : 'outlined'}
                  onClick={() => filterProducts('Eq', '6217af354c49a4266b3007ac')}
                >
                  Koláče
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default ProductListToolbar;
