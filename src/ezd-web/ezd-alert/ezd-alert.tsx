
import { EzdButton } from '../../components/ezd-button/ezd-button';
import './ezd-alert.scss';

export type EzdAlertProps = {
  alertMessage?: React.ReactElement | string;
};

export function EzdAlert(props: EzdAlertProps) {
  return (
    <div className="ezd-alert">
      <div className="alert-content">
        <div className="alert-image-container">
          <img
            src="../../external/windows98-icons/msg_warning-0.png"
          />
        </div>
        <div className="alert-message">
          {props.alertMessage}
        </div>
      </div>
      <div className="alert-action-container">
        <EzdButton>
          Ok
        </EzdButton>
      </div>
    </div>
  );
}
