import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@mui/material';
import Settings from 'src/components/settings/Settings';
import { useCukro } from '../contexts/cukro';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const SettingsView = () => {
  const { userMeta, getUserMeta, postUserMeta } = useCukro();
  useEffect(() => {
    const response = getUserMeta();
    toast.promise(response, {
      pending: 'Nastavenia sa načítavajú',
      error: 'Nastavenia sa nepodarilo načítať'
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Nastavenie | CUKRO</title>
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
            <Grid item lg={12} md={6} xs={12}>
              <Settings data={userMeta} postUserMeta={postUserMeta} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default SettingsView;
