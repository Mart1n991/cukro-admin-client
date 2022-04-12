import React from 'react';
import { useMatch } from 'react-router';
import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  MenuItem,
  FormControlLabel,
  Switch,
  InputAdornment,
  Button,
  Stack,
  Chip
} from '@mui/material';
import { FieldArray, Formik } from 'formik';
import * as Yup from 'yup';
import { useCukro } from 'src/contexts/cukro';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validationSchema = Yup.object().shape({
  categoryId: Yup.string().min(2).required('Kategória je povinné pole'),
  name: Yup.string().min(1).required('Názov produktu je povinné pole'),
  deliveryDate: Yup.number(),
  weight: Yup.number(),
  hasShape: Yup.boolean(),
  flavour: Yup.string().when('categoryId', {
    is: (categoryId) => categoryId === '6217af354c49a4266b3007ac' || categoryId === '6217ae954c49a4266b3007ab',
    then: Yup.string().required('Príchuť je povinné pole')
  }),
  shape: Yup.string().when('hasShape', { is: true, then: Yup.string().required('Zvoľte tvar') }),
  price: Yup.number().min(1, 'Cena musí byť vyššia ako 0').required('Cena je povinné pole'),
  material: Yup.string().min(4).max(25),
  materials: Yup.array().of(Yup.string()),
  uniqueCategoryId: Yup.string().required('Zadajte ID pre danú kategóriu')
});

const ProductForm = ({ categoryList, productId }) => {
  const { addProduct, editProduct, product } = useCukro();

  const match = useMatch(`app/produkt/${productId}/kopia`);

  const productShape = [
    { value: 1, label: 'Kruh' },
    { value: 3, label: 'Štvorec' },
    { value: 5, label: 'Šesťuholník' },
    { value: 7, label: 'Hviezda' },
    { value: 9, label: 'Srdce' },
    { value: 11, label: 'Trojuholník' }
  ];

  const onSubmit = async (data, { setSubmitting, resetForm }) => {
    if (productId !== undefined && match === null) {
      const edit = editProduct(productId, data);
      toast.promise(edit, {
        success: 'Produkt bol úspešne upravený 👌',
        error: 'Produkt sa nepodarilo upraviť 🤯'
      });
    }

    if (match !== null || productId === undefined) {
      const add = addProduct(data);
      toast.promise(add, {
        success: 'Produkt bol úspešne pridaný 👌',
        error: 'Produkt sa nepodarilo pridať 🤯'
      });
      resetForm();
    }
    setSubmitting(false);
  };

  const onChange = (e, setValue) => {
    setValue(e.target.name, e.target.value);
  };

  return (
    <Formik initialValues={product} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize={true}>
      {({ values, handleSubmit, setFieldValue, isSubmitting, errors, touched }) => {
        return (
          <form onSubmit={handleSubmit}>
            <Card>
              <CardContent>
                <Grid container spacing={5}>
                  <Grid
                    item
                    lg={4}
                    md={6}
                    xs={12}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <TextField
                      label="Kategória produktu"
                      value={values.categoryId}
                      name={`categoryId`}
                      onChange={(e) => onChange(e, setFieldValue)}
                      select
                      margin="normal"
                      error={Boolean(touched.categoryId && errors.categoryId)}
                      helperText={touched.categoryId && errors.categoryId}
                    >
                      {categoryList.data.map((option) => (
                        <MenuItem key={option.categoryId} value={option.categoryId}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>

                    <TextField
                      label="Názov produktu"
                      name="name"
                      value={values.name}
                      onChange={(e) => onChange(e, setFieldValue)}
                      margin="normal"
                      error={Boolean(touched.name && errors.name)}
                      helperText={touched.name && errors.name}
                    />
                    {(values.categoryId === '6217af354c49a4266b3007ac' || values.categoryId === '6217ae954c49a4266b3007ab') && (
                      <TextField
                        label="Príchuť"
                        name="flavour"
                        value={values.flavour}
                        onChange={(e) => onChange(e, setFieldValue)}
                        margin="normal"
                        error={Boolean(touched.flavour && errors.flavour)}
                        helperText={touched.flavour && errors.flavour}
                      />
                    )}

                    <TextField
                      label="Hmotnosť"
                      name="weight"
                      value={values.weight}
                      onChange={(e) => onChange(e, setFieldValue)}
                      margin="normal"
                      type="number"
                      InputProps={{
                        endAdornment: <InputAdornment position="end">gramov</InputAdornment>
                      }}
                    />
                    <TextField
                      label="Čas dodania"
                      name="deliveryDate"
                      value={values.deliveryDate}
                      onChange={(e) => onChange(e, setFieldValue)}
                      margin="normal"
                      type="number"
                      placeholder="Zadajte počet dní"
                      InputProps={{
                        endAdornment: <InputAdornment position="end">dní</InputAdornment>
                      }}
                    />
                  </Grid>
                  <Grid item lg={4} md={6} xs={12} sx={{ display: 'flex', flexDirection: 'column' }}>
                    <TextField name="photo" type="file" margin="normal" />
                    {values.categoryId === '6217ae954c49a4266b3007ab' && (
                      <FormControlLabel
                        control={
                          <Switch
                            name="hasShape"
                            checked={values.hasShape}
                            onChange={(e) => setFieldValue(e.target.name, e.target.checked)}
                          />
                        }
                        label="Má produkt tvar?"
                        style={{ margin: '21px 0px' }}
                      />
                    )}

                    {values.hasShape && (
                      <TextField
                        label="Tvar produktu"
                        name="shape"
                        value={values.shape}
                        onChange={(e) => onChange(e, setFieldValue)}
                        select
                        margin="normal"
                        error={Boolean(touched.shape && errors.shape)}
                        helperText={touched.shape && errors.shape}
                      >
                        {productShape.map((option) => (
                          <MenuItem key={option.value} value={option.label}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}

                    <TextField
                      label="Minimálny odber"
                      name="minimumAmount"
                      value={values.minimumAmount}
                      margin="normal"
                      type="number"
                      onChange={(e) => onChange(e, setFieldValue)}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">KUS</InputAdornment>
                      }}
                    />
                    <TextField
                      label="Cena"
                      name="price"
                      value={values.price}
                      onChange={(e) => onChange(e, setFieldValue)}
                      margin="normal"
                      type="number"
                      InputProps={{
                        endAdornment: <InputAdornment position="end">EUR</InputAdornment>
                      }}
                      error={Boolean(touched.price && errors.price)}
                      helperText={touched.price && errors.price}
                    />
                  </Grid>
                  <Grid item lg={4} md={12} xs={12} sx={{ display: 'flex', flexDirection: 'column' }}>
                    <TextField
                      label="Unikátny identifikátor"
                      name="uniqueCategoryId"
                      value={values.uniqueCategoryId}
                      onChange={(e) => onChange(e, setFieldValue)}
                      margin="normal"
                      type="text"
                      error={Boolean(touched.uniqueCategoryId && errors.uniqueCategoryId)}
                      helperText={touched.uniqueCategoryId && errors.uniqueCategoryId}
                    />
                    <FieldArray name="materials">
                      {(fieldArrayProps) => {
                        const { push, remove, form } = fieldArrayProps;
                        const { values, setFieldValue } = form;
                        const addMaterial = (material) => {
                          material.length > 2 && push(material);
                          setFieldValue('material', '');
                        };
                        return (
                          <>
                            <TextField
                              fullWidth
                              label="Zloženie"
                              name="material"
                              value={values.material}
                              onChange={(e) => onChange(e, setFieldValue)}
                              margin="normal"
                              placeholder="Zadajte vždy len 1 surovinu a pridajte"
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <Button variant="contained" onClick={() => addMaterial(values.material)}>
                                      Pridať
                                    </Button>
                                  </InputAdornment>
                                )
                              }}
                            />
                            {values.materials.length > 0 && (
                              <Stack spacing={1} direction="row" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                {values.materials.map((material, index) => (
                                  <Chip key={index} label={material} onDelete={() => remove(index)} />
                                ))}
                              </Stack>
                            )}
                          </>
                        );
                      }}
                    </FieldArray>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
              <Button variant="contained" type="submit" disabled={isSubmitting}>
                Uložiť
              </Button>
              <ToastContainer />
            </Box>
          </form>
        );
      }}
    </Formik>
  );
};

export default ProductForm;
