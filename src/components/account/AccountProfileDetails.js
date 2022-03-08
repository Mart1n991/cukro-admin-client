import { Box, Button, Card, CardContent, Divider, Grid, CardHeader } from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import TelField from '../form/TelField';
import TextField from '../form/TextField';
import SelectField from '../form/SelectField';
import countryCodes from './countryCodes';

const AccountProfileDetails = ({ user, updateUser }) => {
  const onSubmit = async (data, { setSubmitting }) => {
    data.avatar = null;
    await updateUser(data);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={user}
      validationSchema={Yup.object().shape({
        name: Yup.string().max(255).required('Name is required')
      })}
      onSubmit={onSubmit}
    >
      {({ errors, handleBlur, handleSubmit, setFieldValue, isSubmitting, touched, values }) => (
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader subheader="Upraviť svoj profil" title="Profil" />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    errorText={touched.name && errors.name}
                    setValue={setFieldValue}
                    label="Meno"
                    name="name"
                    value={values.name}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    errorText={touched.name && errors.name}
                    setValue={setFieldValue}
                    label="Emailová adresa"
                    name="email"
                    disabled
                    onBlur={handleBlur}
                    type="email"
                    value={values.email}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TelField
                    fullWidth
                    errorText={touched.name && errors.name}
                    setValue={setFieldValue}
                    label="Telefón"
                    name="tel"
                    value={values.tel}
                    country={values.country}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    errorText={touched.name && errors.name}
                    setValue={setFieldValue}
                    label="Adresa"
                    name="address"
                    onBlur={handleBlur}
                    value={values.address}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <SelectField
                    fullWidth
                    errorText={touched.name && errors.name}
                    setValue={setFieldValue}
                    label="Krajina"
                    name="countryId"
                    value={values.countryId}
                    variant="outlined"
                    data={countryCodes}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    errorText={touched.name && errors.name}
                    setValue={setFieldValue}
                    label="Mesto"
                    name="city"
                    value={values.city}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    errorText={touched.name && errors.name}
                    setValue={setFieldValue}
                    label="PSČ"
                    name="postCode"
                    value={values.postCode}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                p: 2
              }}
            >
              <Button color="primary" variant="contained" type="submit" disabled={isSubmitting}>
                Uložiť zmeny
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
};

export default AccountProfileDetails;
