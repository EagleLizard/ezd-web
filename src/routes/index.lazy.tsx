import { createLazyFileRoute } from '@tanstack/react-router';
import { EzdWeb } from '../ezd-web/ezd-web';

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <EzdWeb/>
    // <div className="p-2">
    //   <h3>Welcome Home!</h3>
    // </div>
  )
}