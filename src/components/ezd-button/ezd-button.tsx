
import React from 'react';
import './ezd-button.scss';
import { Button, ButtonProps } from '@material-ui/core';

type EzdButtonProps = {

} & ButtonProps;

export const EzdButton = React.forwardRef<HTMLButtonElement, EzdButtonProps>(
  function EzdButton(props: EzdButtonProps, ref) {
    const {
      children,
      ...restProps
    } = props;
    return (
      <Button
        className="ezd-button button-98"
        ref={ref}
        {...restProps}
      >
        <div className="ezd-button-inner">
          {children}
        </div>
      </Button>
    );
  }
)
