import { Helmet } from 'react-helmet';
import { Box, Container } from '@mui/material';
// import SettingsNotifications from '../components/settings/SettingsNotifications';
import SettingsPassword from '../components/settings/SettingsPassword';
import { useAuth } from 'src/contexts/auth';

const SettingsView = () => {
  const { user, updateUser } = useAuth();

  return (
    <>
      <Helmet>
        <title>Settings | KD</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth="lg">
          {/* <SettingsNotifications /> */}
          <Box sx={{ pt: 3 }}>{/* <SettingsPassword user={user} updateUser={updateUser} /> */}</Box>
        </Container>
      </Box>
    </>
  );
};

export default SettingsView;
