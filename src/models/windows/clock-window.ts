import React from 'react';
import { EzdClock } from '../../ezd-web/ezd-clock/ezd-clock';
import { WindowItem, WindowItemParams } from '../window-item';

type ClockWindowItemParams = {
  initTimestamp: number;
} & Omit<WindowItemParams, 'content' | 'key' | 'title'>;

export class ClockWindowItem extends WindowItem {
  private constructor(params: WindowItemParams) {
    super({
      ...params,
    });
  }

  static init(params: ClockWindowItemParams): ClockWindowItem {
    let winItem: ClockWindowItem;
    winItem = new ClockWindowItem({
      title: 'Clock',
      key: 'clock',
      content: () => {
        return React.createElement(EzdClock, {
          initTimestamp: params.initTimestamp,
        });
      },
      ...params,
    })
    return winItem;
  }
}
