import React from 'react';
import { WindowItem, WindowItemParams } from '../window-item';
import { EzdAlert, EzdAlertProps } from '../../ezd-web/ezd-alert/ezd-alert';

export type AlertWinItemParams = {
  ezdAlertProps: EzdAlertProps
} & WindowItemParams;

export class AlertWindowItem extends WindowItem {
  private constructor(params: AlertWinItemParams) {
    super({
      ...params,
    });
  }

  static init(params: AlertWinItemParams): AlertWindowItem {
    let winItem: AlertWindowItem;
    winItem = new AlertWindowItem({
      ...params,
      // title: 'Alert',
      // key: 'alert',
      content: () => {
        return React.createElement(EzdAlert, {
          ...params.ezdAlertProps,
        });
      },
    });
    return winItem;
  }
}
