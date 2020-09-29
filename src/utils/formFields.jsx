import React from 'react';
import {
  Form,
  TextArea,
  Dropdown,
  Input,
  Label,
  Checkbox,
} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
require('moment/locale/ru');
require('moment/locale/tr');

export const DropdownFormField = props => {
  const {
    label,
    input,
    opts,
    disabled,
    required,
    multiple,
    meta: { touched, error },
  } = props;

  return (
    <Form.Field required={required}>
      <label>{label}</label>

      <Dropdown
        disabled={disabled}
        selection
        options={opts}
        {...input}
        value={input.value}
        // onChange={(param, data) => input.onChange(data.value)}
        onChange={(param, data) => {
          if (multiple) {
            if (data.value.includes(-1)) {
              data.value = [-1];
              input.onChange(data.value);
            }
          }
          input.onChange(data.value);
        }}
        placeholder={label}
        multiple={multiple}
      />
      {touched && error && (
        <Label basic color="red" pointing>
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export const SearchableSingleDropdownFormField = props => {
  const {
    label,
    input,
    opts,
    disabled,
    required,
    meta: { touched, error },
  } = props;

  return (
    <Form.Field required={required}>
      <label>{label}</label>
      <Dropdown
        disabled={disabled}
        selection
        options={opts}
        {...input}
        value={input.value}
        onChange={(param, data) => input.onChange(data.value)}
        placeholder={label}
        search
      />

      {touched && error && (
        <Label basic color="red" pointing>
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export const TextAreaFormField = props => {
  const {
    label,
    input,
    readOnly,
    rows,
    meta: { touched, error },
  } = props;
  return (
    <Form.Field error={touched && error}>
      <label>{label}</label>
      <TextArea
        {...input}
        readOnly={readOnly}
        value={input.value}
        onChange={(e, data) => input.onChange(data.value)}
        placeholder={label}
        rows={rows}
      />
      {touched && error && (
        <Label basic color="red" pointing>
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export const TextInputFormField = props => {
  const {
    label,
    input,
    readOnly,
    meta: { touched, error },
    defaultValue,
  } = props;
  // console.log(input.value,'input.value')
  if (defaultValue !== null && (input.value === null || input.value === '')) {
    input.value = defaultValue;
  }

  return (
    <Form.Field error={touched && error}>
      <label>{label}</label>
      <Input
        {...input}
        readOnly={readOnly}
        value={input.value}
        onChange={(e, data) => input.onChange(data.value)}
        placeholder={label}
      />
      {touched && error && (
        <Label basic color="red" pointing>
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export const DatePickerFormField = props => {
  const {
    label,
    input,
    required,
    meta: { touched, error },
    disabled,
    readOnly,
    dateFormat,
    autoComplete,
  } = props;

  const language = localStorage.getItem('language');
  return (
    <Form.Field required={required}>
      <label>{label}</label>
      <DatePicker
        {...input}
        showYearDropdown
        dateFormat={dateFormat || 'YYYY-MM-DD'}
        selected={input.value ? moment(input.value, 'YYYY-MM-DD') : null}
        autoComplete={autoComplete}
        disabled={disabled}
        readOnly={readOnly}
        locale={language}
      />
      {touched && error && (
        <Label basic color="red" pointing>
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export const CheckBoxFormField = props => {
  const {
    label,
    input,
    readOnly,
    meta: { touched, error },
  } = props;
  return (
    <Form.Field error={touched && error}>
      <label>{label}</label>
      <Checkbox
        {...input}
        readOnly={readOnly}
        value={input.value}
        onChange={(e, data) => input.onChange(data.value)}
      />
      {touched && error && (
        <Label basic color="red" pointing>
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export const DatePickerFormField2 = props => {
  const {
    label,
    input,
    required,
    dateFormat,
    locale,
    //curDate,
    readOnly,
    disabled,
    defaultValue,
    autoComplete,
    meta: { touched, error },
  } = props;
  if (defaultValue !== null && (input.value === null || input.value === '')) {
    input.value = defaultValue;
  }
  // console.log(input)
  return (
    <Form.Field error={touched && error} required={required}>
      <label>{label}</label>

      <DatePicker
        showMonthDropdown
        showYearDropdown
        dropdownMode="select" // timezone="UTC"
        {...input}
        selected={input.value ? moment(input.value, dateFormat) : null}
        locale={locale} // "ru"
        dateFormat={dateFormat} // "DD.MM.YYYY"
        disabled={disabled}
        autoComplete={autoComplete}
        readOnly={readOnly}
      />
      {touched && error && (
        <Label basic color="red" pointing>
          {error}
        </Label>
      )}
    </Form.Field>
  );
};
