import { createLazyFileRoute } from '@tanstack/react-router';
import { EzdAbout } from '../ezd-web/ezd-about/ezd-about';

export const Route = createLazyFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <EzdAbout/>
  )
}