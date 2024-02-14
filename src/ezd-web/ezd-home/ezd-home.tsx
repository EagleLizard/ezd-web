import { useEffect, useState } from 'react';
import Markdown from 'react-markdown';

type EzdHomeProps = {

};

export function EzdHome(props: EzdHomeProps) {

  const [ezdHomeMd, setEzdHomeMd] = useState<string | undefined>();

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
    <div className="ezd-home">
      <div className="ezd-page">
        <div className="ezd-home-content-container">
          <div className="ezd-markdown-content">
            <Markdown>
              {ezdHomeMd}
            </Markdown>
          </div>
        </div>
      </div>
    </div>
  );

  async function init() {
    // let ezdHomeMdStr: string;
    // ezdHomeMdStr = (await import('./ezd-home.md?raw')).default;
    // setEzdHomeMd(ezdHomeMdStr);
  }
}
