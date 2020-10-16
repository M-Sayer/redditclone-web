import React, { InputHTMLAttributes } from 'react'
import { FormControl, FormLabel, Input, FormErrorMessage, Textarea } from '@chakra-ui/core';
import { useField } from 'formik';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  textarea?: boolean
};

export const InputField: React.FC<InputFieldProps> = ({ size: _, label, textarea, ...props }) => {
  //extract out of Formik Field  
  const [field, { error }] = useField(props);
  let Component = textarea ? Textarea : Input

    return (
      <FormControl isInvalid={ !!error }>
        <FormLabel htmlFor={ field.name }>{ label }</FormLabel>
        <Component { ...field } { ...props } id={ field.name } />
        { error ? <FormErrorMessage>{ error }</FormErrorMessage> : null }
      </FormControl>
);
}