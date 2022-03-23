import { Helmet } from 'react-helmet';
import DataWrapper from '../components/data/DataWrapper';
import { useAuth } from 'src/contexts/auth';

const columns = [
  {
    field: 'name',
    headerName: 'Name'
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 200
  },
  { field: '_id', headerName: 'ID', width: 200 }
];

const OrderList = () => {
  const { users, getUsers } = useAuth();

  return (
    <>
      <Helmet>
        <title>Objednávky | Cukro</title>
      </Helmet>
      <DataWrapper columns={columns} data={users.data} total={users.total} onGet={getUsers} disabled />
    </>
  );
};

export default OrderList;
