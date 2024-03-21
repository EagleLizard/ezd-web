
import './ezd-input.scss';
import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

type EzdInputProps = {

} & TextFieldProps;

export const EzdInput = React.forwardRef<HTMLInputElement, EzdInputProps>(
  function EzdInput(props: EzdInputProps, ref) {
    const {
      className,
      inputProps,
      ...restProps
    } = props;
    const ezdInputProps = {
      className: (inputProps?.className ?? '') + ' input-98',
      ...inputProps
    };
    return (
      <TextField
        className={props.className + ' ezd-input'}
        inputProps={ezdInputProps}
        ref={ref}
        {...restProps}
      />
    );
  }
);
