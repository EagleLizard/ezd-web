import React from 'react';
import { EzdMarkdown, EzdMarkdownProps } from '../../components/ezd-markdown/ezd-markdown';
import { WindowItem, WindowItemParams } from '../window-item';

export type MdWindowParams = {
  mdImportCb: EzdMarkdownProps['mdImportCb']
} & Omit<WindowItemParams, 'content'>;

export class MdWindowItem extends WindowItem {
  private constructor(params: MdWindowParams, content: React.FC) {
    super({
      ...params,
      content,
    });
  }

  static init(params: MdWindowParams) {
    let winItem: MdWindowItem;
    let content: React.FC;
    content = () => {
      return React.createElement(EzdMarkdown, {
        mdImportCb: params.mdImportCb,
      });
    };
    winItem = new MdWindowItem(params, content);

    return winItem;
  }

  static getMdImportCb(url: string): MdWindowParams['mdImportCb'] {
    return async () => {
      let rawResp: Response;
      let mdConent: string;
      rawResp = await fetch(url);
      mdConent = await rawResp.text();
      console.log(mdConent);
      return mdConent;
    }
  }
}
