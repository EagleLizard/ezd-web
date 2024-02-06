
import './ezd-card.scss';
import { Card, CardProps } from '@mui/material';

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
