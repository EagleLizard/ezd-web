import { createLazyFileRoute } from '@tanstack/react-router';
import { EzdLogin } from '../../ezd-web/ezd-login/ezd-login';

export const Route = createLazyFileRoute('/login/register')({
  component: () => {
    return (
      <EzdLogin
        register={true}
      />
    );
  },
});
