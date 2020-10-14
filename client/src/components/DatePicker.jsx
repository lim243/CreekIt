import React from "react";
import { useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import moment from "moment";

export const DatePickerField = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  return (
    <DatePicker
      {...field}
      {...props}
      selected={(field.value && new Date(field.value)) || null}
      onChange={val => {
        setFieldValue(field.name, val);
      }}
      maxDate={new Date((new Date()).setFullYear((new Date).getFullYear() - 13))}
      showDisabledMonthNavigation
      placeholderText="Birthdate: MM/DD/YYYY"
    />
  );
};

export default DatePickerField;
