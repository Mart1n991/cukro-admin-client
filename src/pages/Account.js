import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@mui/material';
import AccountProfile from '../components/account/AccountProfile';
import AccountProfileDetails from '../components/account/AccountProfileDetails';
import SettingsPassword from '../components/settings/SettingsPassword';
import { useAuth } from 'src/contexts/auth';

const Account = () => {
  const { user, updateUser } = useAuth();

  return (
    <>
      <Helmet>
        <title>Account | KD</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <Box>
                <AccountProfile user={user} updateUser={updateUser} />
              </Box>
              <Box sx={{ marginTop: '30px' }}>
                <SettingsPassword user={user} updateUser={updateUser} />
              </Box>
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <AccountProfileDetails user={user} updateUser={updateUser} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Account;
