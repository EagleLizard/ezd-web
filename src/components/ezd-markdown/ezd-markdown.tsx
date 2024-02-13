
import { useEffect, useState } from 'react';
import './ezd-markdown.scss';
import Markdown, { Options as MarkdownOptions } from 'react-markdown';
import rehypeRaw from 'rehype-raw';

export type EzdMarkdownProps = {
  mdUrl: string;
};

export function EzdMarkdown(props: EzdMarkdownProps) {
  const [mdContent, setMdContent] = useState<string>();

  useEffect(() => {
    (async () => {
      try {
        await init();
      } catch(e) {
        console.error(e);
        throw e;
      }
    })();
  }, []);

  return (
    <div className="ezd-markdown">
      <Markdown rehypePlugins={[rehypeRaw]}>
        {mdContent}
      </Markdown>
    </div>
  );
  async function init() {
    let nextMdContent: string;
    nextMdContent = (await import(`${props.mdUrl}.md?raw`)).default;
    setMdContent(nextMdContent);
  }
}
