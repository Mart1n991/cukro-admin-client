import moment from 'moment';
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import AvatarPicker from './AvatarPicker';

const AccountProfile = ({ user, updateUser }) => {
  const onChangeAvatar = async (avatar) => {
    const u = { ...user, avatar: avatar.split(',').pop() };
    await updateUser(u);
  };

  return (
    <Card>
      <CardHeader title="Logo cukrárne" subheader="Zmena loga " />
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <AvatarPicker src={user.avatar} onChange={onChangeAvatar} />
          <Typography color="textPrimary" gutterBottom variant="h3">
            {user.name}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {user.email}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {`${user.city} ${user.country}`}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      {/* <CardActions>
      <Button
        color="primary"
        fullWidth
        variant="text"
      >
        Upload picture
      </Button>
    </CardActions> */}
    </Card>
  );
};

export default AccountProfile;
