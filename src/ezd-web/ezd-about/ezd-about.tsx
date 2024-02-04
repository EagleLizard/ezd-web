
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import './ezd-about.scss';
import React, { useEffect, useState } from 'react';
import { Card, Paper } from '@material-ui/core';

type EzdAboutProps = {

};

export function EzdAbout(props: EzdAboutProps) {

  const [ezdAboutMarkdown, setEzdAboutMarkdown] = useState<string | undefined>();

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
    <div className="ezd-about">
      <Card>
        <div className="ezd-about-content">
          <Markdown rehypePlugins={[rehypeRaw]}>
            {ezdAboutMarkdown}
          </Markdown>
        </div>
      </Card>
    </div>
  );

  async function init() {
    let ezdWebMarkdownStr: string;
    ezdWebMarkdownStr = (await import('./ezd-about.md?raw')).default;
    setEzdAboutMarkdown(ezdWebMarkdownStr);
  }
}
