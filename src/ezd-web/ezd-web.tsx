
import './ezd-web.scss';
// import ezdWebMarkdown from './ezd-web.md';
import React, { useEffect, useState } from 'react';

import Markdown from 'react-markdown';
import { Button, Card, createTheme, ThemeProvider } from '@material-ui/core';


type EzdWebProps = {

};

export function EzdWeb(props: EzdWebProps) {

  const [ezdWebMarkdown, setEzdWebMarkdown] = useState<string | undefined>();

  useEffect(() => {
    (async () => {
      try {
        await init();
      } catch(e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <div className="ezd-web">
      <div className="ezd-page">
        {/* <div>
          <Button>etc</Button>
        </div> */}
        <Card>
          <div className="ezd-web-content">
            <Markdown>
              {ezdWebMarkdown}
            </Markdown>
          </div>
        </Card>
      </div>
    </div>
  );

  async function init() {
    let ezdWebMarkdownStr: string;
    ezdWebMarkdownStr = (await import('./ezd-web.md?raw')).default;
    setEzdWebMarkdown(ezdWebMarkdownStr);
  }
}