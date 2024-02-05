
import './ezd-web.scss';
// import ezdWebMarkdown from './ezd-web.md';
import React, { useEffect, useState } from 'react';

import Markdown from 'react-markdown';
import { Button, Card, createTheme, ThemeProvider } from '@material-ui/core';
import { EzdButton } from '../components/ezd-button/ezd-button';
import { EzdCard } from '../components/ezd-card/ezd-card';


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
        <div>
          hello
        </div>
        {/* <Card className="ezd-web-content-container window">
          <Button
            variant="outlined"
            className="button-98 ezd-button"
          >
            Test
          </Button>
          <EzdButton>
            Test
          </EzdButton>
          <pre className="pre-98">
            etc
          </pre>
        </Card> */}
        <EzdCard className="ezd-web-content-container">
          <div className="ezd-markdown-content">
            <Markdown>
              {ezdWebMarkdown}
            </Markdown>
          </div>
        </EzdCard>
      </div>
    </div>
  );

  async function init() {
    let ezdWebMarkdownStr: string;
    ezdWebMarkdownStr = (await import('./ezd-web.md?raw')).default;
    setEzdWebMarkdown(ezdWebMarkdownStr);
  }
}