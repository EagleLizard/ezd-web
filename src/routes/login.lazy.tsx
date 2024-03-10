import { createLazyFileRoute } from '@tanstack/react-router';
import { EzdAbout } from '../ezd-web/ezd-about/ezd-about';

export const Route = createLazyFileRoute('/login')({
  component: Login,
});

function Login() {
  return (
    <div>
      login
    </div>
  );
}
