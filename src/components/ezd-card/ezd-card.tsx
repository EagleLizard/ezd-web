
import './ezd-card.scss';
import { Card, CardProps } from '@material-ui/core';

type EzdCardProps = {

} & CardProps;

export function EzdCard(props: EzdCardProps) {
  return (
    <div className="ezd-card window">
      <Card
        {...props}
      />
    </div>
  );
}
