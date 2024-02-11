
import './ezd-web.scss';
// import ezdWebMarkdown from './ezd-web.md';
import { useEffect, useState } from 'react';

import Markdown from 'react-markdown';
import { EzdCard } from '../components/ezd-card/ezd-card';
import { useWinCtx } from '../lib/win-context';


type EzdWebProps = {

};

export function EzdWeb(props: EzdWebProps) {

  return (
    <div className="ezd-web">
      <div className="ezd-page">
        {/* hello */}
      </div>
    </div>
  );
}