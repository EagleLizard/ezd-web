/*
  Credit: https://codepen.io/Painatalman/pen/ExxdNXy
*/

import './ezd-spinner.scss';

type EzdSpinnerProps = {
  className?: string;
};

export function EzdSpinner(props: EzdSpinnerProps) {
  return (
    <div
      className={'ezd-spinner ' + (props.className ?? '')}
    >
      <div className="placeholder">
        loading...
      </div>
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        className="hourglass-icon"
        // width="17px"
        viewBox="0 0 17 27"
        fill="black"
      >
        <g className="hourglass-icon__device">
          <rect x="0" y="0" width="17" height="2" />
          <rect x="0" y="0" width="2" height="3" />
          <rect x="0" y="2" width="2" height="1" />
          <rect x="0" y="24" width="2" height="1" />
          <rect x="0" y="24" width="2" height="3" />
          <rect x="0" y="25" width="17" height="2" />
          <rect x="1" y="2" width="1" height="3" />
          <rect x="1" y="3" width="15" height="1" />
          <rect x="1" y="4" width="2" height="4" />
          <rect x="1" y="19" width="2" height="5" />
          <rect x="1" y="23" width="15" height="1" />
          <rect x="2" y="3" width="1" height="2" />
          <rect x="2" y="7" width="1" height="2" />
          <rect x="2" y="8" width="2" height="1" />
          <rect x="3" y="8" width="1" height="2" />
          <rect x="2" y="18" width="2" height="1" />
          <rect x="2" y="18" width="1" height="2" />
          <rect x="3" y="9" width="2" height="1" />
          <rect x="3" y="17" width="2" height="1" />
          <rect x="3" y="17" width="1" height="2" />
          <rect x="4" y="9" width="1" height="2" />
          <rect x="4" y="10" width="2" height="1" />
          <rect x="4" y="16" width="1" height="2" />
          <rect x="4" y="16" width="2" height="1" />
          <rect x="5" y="10" width="1" height="2" />
          <rect x="5" y="11" width="2" height="1" />
          <rect x="5" y="15" width="1" height="2" />
          <rect x="5" y="15" width="2" height="1" />
          <rect x="6" y="11" width="1" height="2" />
          <rect x="6" y="12" width="2" height="3" />
          <rect x="6" y="14" width="1" height="2" />
          <rect x="9" y="12" width="2" height="3" />
          <rect x="10" y="11" width="2" height="1" />
          <rect x="10" y="11" width="1" height="2" />
          <rect x="10" y="15" width="2" height="1" />
          <rect x="10" y="14" width="1" height="2" />
          <rect x="11" y="10" width="2" height="1" />
          <rect x="11" y="10" width="1" height="2" />
          <rect x="11" y="15" width="1" height="2" />
          <rect x="11" y="16" width="2" height="1" />
          <rect x="12" y="9" width="2" height="1" />
          <rect x="12" y="9" width="1" height="2" />
          <rect x="12" y="16" width="1" height="2" />
          <rect x="12" y="17" width="2" height="1" />
          <rect x="13" y="8" width="2" height="1" />
          <rect x="13" y="8" width="1" height="2" />
          <rect x="13" y="17" width="1" height="2" />
          <rect x="13" y="18" width="2" height="1" />
          <rect x="14" y="3" width="2" height="2" />
          <rect x="14" y="4" width="2" height="4" />
          <rect x="14" y="7" width="1" height="2" />
          <rect x="14" y="18" width="1" height="2" />
          <rect x="14" y="19" width="2" height="4" />
          <rect x="14" y="22" width="1" height="2" />
          <rect x="15" y="0" width="2" height="3" />
          <rect x="15" y="2" width="2" height="1" />
          <rect x="15" y="2" width="1" height="2" />
          <rect x="15" y="22" width="1" height="3" />
          <rect x="15" y="24" width="2" height="1" />
          <rect x="16" y="24" width="1" height="2" />
        </g>
        <g className="hourglass-icon__dots">
          <rect className="hourglass-icon__dot" x="4" y="6" width="1" height="1"></rect>
          <rect className="hourglass-icon__dot" x="6" y="6" width="1" height="1"></rect>
          <rect className="hourglass-icon__dot" x="8" y="6" width="1" height="1"></rect>
          <rect className="hourglass-icon__dot" x="10" y="6" width="1" height="1"></rect>
          <rect className="hourglass-icon__dot" x="12" y="6" width="1" height="1"></rect>
          <rect className="hourglass-icon__dot" x="5" y="7" width="1" height="1"></rect>
          <rect className="hourglass-icon__dot" x="7" y="7" width="1" height="1"></rect>
          <rect className="hourglass-icon__dot" x="9" y="7" width="1" height="1"></rect>
          <rect className="hourglass-icon__dot" x="11" y="7" width="1" height="1"></rect>
          <rect className="hourglass-icon__dot" x="6" y="8" width="1" height="1"></rect>
          <rect className="hourglass-icon__dot" x="8" y="8" width="1" height="1"></rect>
          <rect className="hourglass-icon__dot" x="10" y="8" width="1" height="1"></rect>
          <rect className="hourglass-icon__dot" x="7" y="9" width="1" height="1"></rect>
          <rect className="hourglass-icon__dot" x="9" y="9" width="1" height="1"></rect>
          <rect className="hourglass-icon__dot" x="8" y="10" width="1" height="1"></rect>
        </g>
      </svg> */}
    </div>
  );
}
