
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import './ezd-about.scss';
import React, { useEffect, useState } from 'react';
import { EzdCard } from '../../components/ezd-card/ezd-card';

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
      <EzdCard>
        <div className="ezd-about-content-container">
          <div className="ezd-about-markdown">
            <Markdown rehypePlugins={[rehypeRaw]}>
              {ezdAboutMarkdown}
            </Markdown>
          </div>
        </div>
      </EzdCard>
    </div>
  );

  async function init() {
    let ezdWebMarkdownStr: string;
    ezdWebMarkdownStr = (await import('./ezd-about.md?raw')).default;
    setEzdAboutMarkdown(ezdWebMarkdownStr);
  }
}
