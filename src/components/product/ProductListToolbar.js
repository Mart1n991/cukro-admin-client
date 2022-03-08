import { Box, Button, Card, CardContent, TextField, InputAdornment, SvgIcon } from '@mui/material';
import { Search as SearchIcon } from 'react-feather';
import { useNavigate } from 'react-router-dom';

const ProductListToolbar = (props) => {
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
            <Box sx={{ maxWidth: 500 }}>
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
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default ProductListToolbar;
