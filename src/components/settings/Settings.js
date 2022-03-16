import React from 'react';
import { Grid, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Card, CardContent, Box, Button } from '@mui/material';
import { Field, Formik } from 'formik';
import SwitchField from 'src/components/form/SwitchField';
import { toast, ToastContainer } from 'react-toastify';
import { CirclePicker } from 'react-color';

export default function Settings({ data, postUserMeta }) {
  const onSubmit = (data, { setSubmitting }) => {
    const post = postUserMeta(data);
    toast.promise(post, {
      success: 'Nastavenia bolu uložené 👌',
      pending: 'Nastavenia sa ukladajú',
      error: 'Nastavenia sa nepodarilo uložiť 🤯'
    });

    setSubmitting(false);
  };

  const colors = [
    '#E2A3C7',
    '#e91e63',
    '#9c27b0',
    '#673ab7',
    '#3f51b5',
    '#2196f3',
    '#03a9f4',
    '#00bcd4',
    '#009688',
    '#4caf50',
    '#8bc34a',
    '#cddc39',
    '#ffeb3b',
    '#ffc107',
    '#ff9800',
    '#ff5722',
    '#795548',
    '#607d8b'
  ];

  return (
    <Formik initialValues={data} enableReinitialize={true} onSubmit={onSubmit}>
      {({ values, setFieldValue, isSubmitting, handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <Card>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item lg={6} xs={12}>
                    <FormControl>
                      <FormLabel id="demo-radio-buttons-group-label">Spôsob príjmania platieb za objednávky</FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="stripe"
                        name="paymentType"
                        onChange={(e) => setFieldValue(e.target.name, e.target.value)}
                      >
                        <FormControlLabel value="cash" control={<Radio />} label="Príjmam platby pri odovzdaní objednávky v hotovosti" />
                        <FormControlLabel value="stripe" control={<Radio />} label="Príjmam platby vopred cez platobnú bránu" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <SwitchField
                      value={values.weddings}
                      name="weddings"
                      label="Zabezpečujem aj pečenie na svadby"
                      setValue={setFieldValue}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <SwitchField value={values.stopProduction} name="stopProduction" label="Vypnúť produkciu" setValue={setFieldValue} />
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item lg={6}>
                    <Field name="color">
                      {() => {
                        return <CirclePicker color={values.color} colors={colors} onChange={(e) => setFieldValue('color', e.hex)} />;
                      }}
                    </Field>

                    {/* <FormLabel>Aktuálna farba predajnej stránky</FormLabel> */}
                    {/* <Box sx={{ width: 240, height: 50, backgroundColor: values.color }} /> */}
                  </Grid>
                </Grid>
              </CardContent>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  p: 2
                }}
              >
                <Button color="primary" variant="contained" type="submit" disabled={isSubmitting}>
                  Uložiť zmeny
                </Button>
              </Box>
              <ToastContainer />
            </Card>
          </form>
        );
      }}
    </Formik>
  );
}
