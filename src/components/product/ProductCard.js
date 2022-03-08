import PropTypes from 'prop-types';
import { Box, Card, CardContent, Divider, Grid, Typography, Tooltip, IconButton } from '@mui/material';
import ProductIcon from './ProductIcon';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import MoveUpIcon from '@mui/icons-material/MoveUp';
import { useNavigate } from 'react-router';
import { grey } from '@mui/material/colors';

const ProductCard = ({ item, deleteProduct, updateProduct }) => {
  let navigate = useNavigate();

  let newProduct = {
    categoryId: item.categoryRefs[0].id,
    name: item.name,
    weight: item.weight,
    deliveryDate: item.deliveryDate,
    hasShape: item.variants.shape.length > 0,
    flavour: item.variants.flavour,
    shape: item.variants.shape,
    price: item.price,
    material: '',
    materials: item.materials,
    minimumAmount: item.minimumAmount,
    disabled: item.disabled,
    promote: item.promote
  };

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

  const edit = (id) => {
    navigate(`../produkt/${id}`);
  };

  const markAsUnavailble = async (id) => {
    let data = {
      ...newProduct,
      disabled: !item.disabled
    };

    await updateProduct(id, data);
  };

  const promote = async (id) => {
    let data = {
      ...newProduct,
      promote: !item.promote
    };

    await updateProduct(id, data);
  };

  const actions = [
    {
      label: 'edit',
      value: 1,
      element: <ModeEditIcon color="action" />,
      description: 'Upraviť produkt',
      action: edit
    },
    {
      label: 'disable',
      value: 3,
      element: <DoDisturbIcon color={item.disabled ? 'primary' : 'action'} />,
      description: item.disabled ? 'Označiť ako dostupné' : 'Označiť ako nedostupné',
      action: (id) => markAsUnavailble(id)
    },
    {
      label: 'promote',
      value: 5,
      element: <MoveUpIcon color={item.promote ? 'primary' : 'action'} />,
      description: item.promote ? 'Odobrať z úvodnej obrazovky' : 'Pridať na úvodnú obrazovku',
      action: (id) => promote(id)
    },
    {
      label: 'delete',
      value: 7,
      element: <DeleteForeverIcon color="action" />,
      description: 'Odstrániť',
      action: async (id) => {
        await deleteProduct(id);
      }
    }
  ];

  const disableColor = () => item.disabled && { color: grey[500] };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: item.disabled && grey[300]
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            pb: 2
          }}
        >
          <ProductIcon productType={item.categoryRefs[0]?.id} disabled={item.disabled} />
          <Typography color="textPrimary" gutterBottom variant="h4" mx={2} sx={() => disableColor()}>
            {item.name}
          </Typography>
        </Box>

        <Typography pb={2} sx={() => disableColor()}>
          Kategória: {productCategoryName(item.categoryRefs[0].id)}
        </Typography>
        {item.variants !== null && item.variants.flavour.length > 0 && (
          <Typography pb={1} sx={() => disableColor()}>
            Príchuť: {item.variants.flavour}
          </Typography>
        )}
        {item.variants !== null && item.variants.shape.length > 0 && (
          <Typography pb={1} sx={() => disableColor()}>
            Tvar: {item.variants.shape}
          </Typography>
        )}
        {item.weight > 0 && (
          <Typography pb={1} sx={() => disableColor()}>
            Hmotnosť: {item.weight} gramov
          </Typography>
        )}
        {item.deliveryDate > 0 && (
          <Typography pb={1} sx={() => disableColor()}>
            Čas dodania: {item.deliveryDate} {item.deliveryDate === 1 ? 'deň' : 'dni'}
          </Typography>
        )}
        {item.minimumAmount > 0 && (
          <Typography pb={1} sx={() => disableColor()}>
            Minimálny odber: {item.minimumAmount} ks
          </Typography>
        )}
        <Typography pb={1} sx={() => disableColor()}>
          Cena: {item.price}€
        </Typography>
        {item.promote && (
          <Typography pb={2} mt={2} color="primary" sx={() => disableColor()}>
            Produkt je na úvodnej stránke
          </Typography>
        )}
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Box sx={{ p: 2 }}>
        <Grid container sx={{ justifyContent: 'space-around' }}>
          {actions.map((action) => (
            <Tooltip title={action.description} key={action.value}>
              <IconButton onClick={() => action.action(item._id)}>{action.element}</IconButton>
            </Tooltip>
          ))}
        </Grid>
      </Box>
    </Card>
  );
};

ProductCard.propTypes = {
  item: PropTypes.object.isRequired
};

export default ProductCard;
