
import { Icon, SvgIcon } from '@mui/material';
import { EzdButton } from '../ezd-button/ezd-button';
import './ezd-window.scss';
import React, { useState } from 'react';

import CloseSVG from '../../external/icon/close.svg?react';
import { WindowItem } from '../../lib/window-manager';

type EzdWindowProps = {
  children: JSX.Element | null;
  onClose: () => void;

  windowItem: WindowItem;
};

export const EzdWindow = React.forwardRef<HTMLDivElement, EzdWindowProps>(
  function EzdWindow(props: EzdWindowProps, ref) {
    const [width, setWidth] = useState<number>(100);
    const [height, setHeight] = useState<number>(100);
    return (
      <div
        ref={ref}
        className="ezd-window window"
      >
        <div className="title-bar">
          <div
            className="title-bar-text-container"
            onMouseDown={handleMouseDown}
          >
            <div className="title-bar-text">
              etc
            </div>
          </div>
          <div className="title-bar-controls">
            <EzdButton
              aria-label="Close"
              className="title-bar-control-btn"
              onClick={handleCloseClick}
            >
              <CloseSVG/>
            </EzdButton>
          </div>
        </div>
        <div
          className="ezd-window-content"
          style={{
            width,
            height,
          }}
        >
          {
            props.children
          }
        </div>
      </div>
    );
    function handleMouseDown($e: React.MouseEvent) {
      console.log($e);
      let posX: number;
      let posY: number;
      posX = $e.pageX - props.windowItem.virtualEl.x;
      posY = $e.pageY - props.windowItem.virtualEl.y;

      console.log({
        posX,
        posY,
      });
    }

    function handleCloseClick() {
      props.onClose();
    }
  }
)
