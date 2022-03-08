import { useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Divider } from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import TextField from '../form/TextField';

const SettingsPassword = ({ user, updateUser }) => {
  const onSubmit = async (data, { setSubmitting, resetForm }) => {
    const u = { ...user, ...data, avatar: null };
    await updateUser(u);
    setSubmitting(false);
    resetForm({
      values: {
        password: '',
        passwordConfirmation: ''
      }
    });
  };

  return (
    <Formik
      initialValues={{
        password: '',
        passwordConfirmation: ''
      }}
      validationSchema={Yup.object({
        password: Yup.string().required('Heslo je povinné pole').min(6, 'Heslo musí obsahovať minimálne 6 znakov'),
        passwordConfirmation: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Haslá sa musia zhodovať')
          .required('Heslo je povinné pole')
      })}
      onSubmit={onSubmit}
    >
      {({ errors, handleBlur, handleSubmit, setFieldValue, isSubmitting, touched, values }) => (
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader subheader="Zmena hesla" title="Heslo" />
            <Divider />
            <CardContent>
              <TextField
                fullWidth
                errorText={touched.password && errors.password}
                setValue={setFieldValue}
                label="Heslo"
                name="password"
                type="password"
                value={values.password}
                onBlur={handleBlur}
                variant="outlined"
                margin="normal"
              />
              <TextField
                fullWidth
                errorText={touched.passwordConfirmation && errors.passwordConfirmation}
                setValue={setFieldValue}
                label="Zopakujte heslo"
                name="passwordConfirmation"
                type="password"
                value={values.passwordConfirmation}
                onBlur={handleBlur}
                variant="outlined"
                margin="normal"
              />
            </CardContent>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                p: 2
              }}
            >
              {/* <Button
                color="primary"
                variant="contained"
                type="submit"
                disabled={isSubmitting}
              >
                Update
              </Button> */}
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
};

export default SettingsPassword;
