
import React from 'react';

import Input from '../Input';

const emailRegularExpression = /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})$/;

const validations = [{
  rule: email => emailRegularExpression.test(email),
  description: 'Некорретный адрес',
  success: 'Подтвержден!',
}];

const EmailInput = ({ title = 'Email', inputRef, ...inputProps }) => (
  <Input
    title={title}
    keyboardType="email-address"
    autoCapitalize="none"
    autoCorrect={false}
    ref={inputRef}
    required
    validations={validations}
    {...inputProps}
  />
);

export default EmailInput;
