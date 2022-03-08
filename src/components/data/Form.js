import { Formik } from 'formik';
import {
  Box,
  Button,
} from '@mui/material';
import DateField from '../form/DateField';
import DateTimeField from '../form/DateTimeField';
import SelectField from '../form/SelectField';
import SwitchField from '../form/SwitchField';
import NumField from '../form/NumField';
import TextField from '../form/TextField';

const Form = ({
  columns,
  initialData,
  onSubmit,
  validationSchema,
  disabled
}) => {
  return (
    <Formik
      initialValues={initialData}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({
        errors,
        handleBlur,
        handleSubmit,
        setFieldValue,
        isSubmitting,
        touched,
        values
      }) => (
        <form onSubmit={handleSubmit}>
          {columns.map((x) => {
            switch (x.type) {
              case 'number':
                return (
                  <NumField
                    key={x.field}
                    fullWidth
                    errorText={touched[x.field] && errors[x.field]}
                    label={x.headerName}
                    name={x.field}
                    onBlur={handleBlur}
                    setValue={setFieldValue}
                    value={values[x.field]}
                    variant="outlined"
                    margin="normal"
                    disabled={disabled}
                  />
                );

              case 'date':
                return (
                  <DateField
                    key={x.field}
                    fullWidth
                    errorText={touched[x.field] && errors[x.field]}
                    label={x.headerName}
                    name={x.field}
                    onBlur={handleBlur}
                    setValue={setFieldValue}
                    value={values[x.field]}
                    variant="outlined"
                    margin="normal"
                    disabled={disabled}
                  />
                );
              case 'dateTime':
                return (
                  <DateTimeField
                    key={x.field}
                    fullWidth
                    errorText={touched[x.field] && errors[x.field]}
                    label={x.headerName}
                    name={x.field}
                    onBlur={handleBlur}
                    setValue={setFieldValue}
                    value={values[x.field]}
                    variant="outlined"
                    margin="normal"
                    disabled={disabled}
                  />
                );
              case 'singleSelect':
                return (
                  <SelectField
                    key={x.field}
                    fullWidth
                    errorText={touched[x.field] && errors[x.field]}
                    label={x.headerName}
                    name={x.field}
                    onBlur={handleBlur}
                    setValue={setFieldValue}
                    value={values[x.field]}
                    variant="outlined"
                    margin="normal"
                    disabled={disabled}
                    data={x.valueOptions}
                  />
                );
              case 'boolean':
                return (
                  <SwitchField 
                    key={x.field}
                    value={values[x.field]}
                    name={x.field}
                    setValue={setFieldValue}
                    label={x.headerName}
                    disabled={disabled}
                  />
                );
              case 'string':
              default:
                return (
                  <TextField
                    key={x.field}
                    fullWidth
                    errorText={touched[x.field] && errors[x.field]}
                    label={x.headerName}
                    name={x.field}
                    margin="normal"
                    onBlur={handleBlur}
                    setValue={setFieldValue}
                    value={values[x.field]}
                    variant="outlined"
                    disabled={disabled}
                  />
                );
            }
          })}
          {!disabled && (
            <Box sx={{ py: 2, display: 'flex', justifyContent: 'end' }}>
              <Button
                color="primary"
                disabled={isSubmitting}
                type="submit"
                variant="contained"
              >
                Save
              </Button>
            </Box>
          )}
        </form>
      )}
    </Formik>
  );
};

export default Form;
