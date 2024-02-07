
import './ezd-window.scss';
import React, { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { Instance as PopperInstance } from '@popperjs/core'

import CloseSVG from '../../external/icon/close.svg?react';

import { EzdButton } from '../ezd-button/ezd-button';
import { WindowItem } from '../../models/window-item';
import { mergeRefs } from '../../lib/merge-refs';

type EzdWindowProps = {
  children: JSX.Element | null;
  onClose: () => void;

  windowItem: WindowItem;
  popperRef: React.RefObject<PopperInstance>;
};

export const EzdWindow = React.forwardRef<HTMLDivElement, EzdWindowProps>(
  function EzdWindow(props: EzdWindowProps, ref) {
    const [width, setWidth] = useState<number>(200);
    const [height, setHeight] = useState<number>(100);

    const relPos = useRef<{x: number, y: number}>();

    const [isDragging, setIsDragging] = useState(false);

    const [localRef, setLocalRef] = useState<HTMLDivElement>();
    const localRefCb = useCallback((el: HTMLDivElement) => {
      setLocalRef(el);
    }, []);

    useEffect(() => {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      }
    }, [
      isDragging,
    ]);

    return (
      <div
        ref={mergeRefs([
          ref,
          // localRef,
          localRefCb,
        ])}
        className="ezd-window window"
        id={`ezd-window_${props.windowItem.id}`}
      >
        <div className="title-bar">
          <div
            className="title-bar-text-container"
            onMouseDown={handleMouseDown}
          >
            <div className="title-bar-text">
              {props.windowItem.title}
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
    function handleMouseDown($e: React.MouseEvent<HTMLDivElement>) {
      let posX: number;
      let posY: number;

      posX = $e.pageX - props.windowItem.x;
      posY = $e.pageY - props.windowItem.y;

      relPos.current = {
        x: posX,
        y: posY,
      };

      setIsDragging(true);
      $e.preventDefault();
      $e.stopPropagation();
    }

    function handleMouseMove($e: MouseEvent) {
      let nextMouseX: number;
      let nextMouseY: number;
      if(!isDragging) {
        return;
      }

      nextMouseX = $e.pageX - (relPos.current?.x ?? 0);
      nextMouseY = $e.pageY - (relPos.current?.y ?? 0);

      props.windowItem.x = nextMouseX;
      props.windowItem.y = nextMouseY;

      props.popperRef.current?.update();
      $e.preventDefault();
      $e.stopPropagation();
    }

    function handleMouseUp($e: MouseEvent) {
      setIsDragging(false);
      props.popperRef.current?.update();
      $e.preventDefault();
      $e.stopPropagation();
    }

    function handleCloseClick() {
      props.onClose();
    }
  }
)
