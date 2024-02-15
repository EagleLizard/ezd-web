
import './clock-widget.scss';

type ClockWidgetProps = {
  date: Date;
};

export function ClockWidget(props: ClockWidgetProps) {

  const msMod = props.date.getMilliseconds() / 1000;

  // const secsMod = (props.date.getSeconds() + (props.date.getMilliseconds() / 1000)) / 60;
  const secsMod = (props.date.getSeconds()) / 60;
  // const minsMod = (props.date.getMinutes() + (secsMod )) / 60;
  const minsMod = (props.date.getMinutes()) / 60;
  const hours = props.date.getHours();
  const twelveHours = (hours > 12)
    ? hours - 12
    : hours
  ;
  const hoursMod = (twelveHours + minsMod) / 12;

  return (
    <div className="clock-widget">
      <div className="clock-parts-container">
        <div className="clock-part">
          <div className="clock-face"/>
        </div>
        <div className="clock-part">
          <div
            className="milliseconds-hand"
            style={{
              transform: 'rotate(' + msMod * 360 + 'deg)',
            }}
          >
            <div className="clock-hand-inner"/>
          </div>
          <div
            className="minutes-hand"
            style={{
              transform: 'rotate(' + minsMod * 360 + 'deg)',
            }}
          >
            <div className="clock-hand-inner"/>
          </div>
          <div
            className="hours-hand"
            style={{
              transform: 'rotate(' + hoursMod * 360 + 'deg)',
            }}
          >
            <div className="clock-hand-inner"/>
          </div>
          <div
            className="seconds-hand"
            style={{
              transform: 'rotate(' + secsMod * 360 + 'deg)',
            }}
          >
            <div className="clock-hand-inner"/>
          </div>
        </div>
      </div>
    </div>
  );
}
