import { v4 as uuid } from 'uuid';
import moment from 'moment';
import { Box, Button, Card, CardHeader, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const products = [
  {
    id: uuid(),
    name: 'Dropbox',
    imageUrl: '/static/images/products/product_1.png',
    updatedAt: moment().subtract(2, 'hours')
  },
  {
    id: uuid(),
    name: 'Medium Corporation',
    imageUrl: '/static/images/products/product_2.png',
    updatedAt: moment().subtract(2, 'hours')
  },
  {
    id: uuid(),
    name: 'Slack',
    imageUrl: '/static/images/products/product_3.png',
    updatedAt: moment().subtract(3, 'hours')
  },
  {
    id: uuid(),
    name: 'Lyft',
    imageUrl: '/static/images/products/product_4.png',
    updatedAt: moment().subtract(5, 'hours')
  },
  {
    id: uuid(),
    name: 'GitHub',
    imageUrl: '/static/images/products/product_5.png',
    updatedAt: moment().subtract(9, 'hours')
  }
];

const LatestProducts = (props) => {
  let navigate = useNavigate();

  return (
    <Card {...props}>
      <CardHeader subtitle={`${products.length} in total`} title="Produkty" />
      <Divider />
      <List>
        {products.map((product, i) => (
          <ListItem divider={i < products.length - 1} key={product.id}>
            <ListItemAvatar>
              <img
                alt={product.name}
                src={product.imageUrl}
                style={{
                  height: 48,
                  width: 48
                }}
              />
            </ListItemAvatar>
            <ListItemText primary={product.name} secondary={`Updated ${product.updatedAt.fromNow()}`} />
            {/* <IconButton edge="end" size="small">
            <MoreVertIcon />
          </IconButton> */}
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        <Button color="primary" endIcon={<ArrowRightIcon />} size="small" variant="text" onClick={() => navigate('/app/produkty')}>
          Všetky
        </Button>
      </Box>
    </Card>
  );
};

export default LatestProducts;
