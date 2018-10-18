import React, { ReactNode } from 'react';

import {
  Publication,
  Rendition,
} from '@evidentpoint/r2-navigator-web';

import { ReadiumView } from './readium-view';

export interface INYUReaderProps {
  publication?: Publication;
}

export interface INYUReaderStates {
  viewAsVertical: boolean;
  scrollEnabled: boolean;
}

export class NYUReader extends React.Component<INYUReaderProps, INYUReaderStates> {
  private publication?: Publication;

  private rendition?: Rendition;

  private readiumView: ReadiumView | null;

  constructor(props: {}) {
    super(props);
    this.renditionUpdated = this.renditionUpdated.bind(this);
  }

  public async openPublication(webpubUrl: string): Promise<void> {
    this.publication = await Publication.fromURL(webpubUrl);

    if (this.readiumView) {
      this.readiumView.openPublication(this.publication);
    }

    if (this.rendition) {
      this.rendition.viewport.renderAtOffset(0);
    }
  }

  public render(): ReactNode {
    return (
      <div>
        <ReadiumView ref={r => this.readiumView = r}
        enableScroll={ false } viewAsVertical={ false }
        onRenditionCreated={ this.renditionUpdated }/>
      </div>
    );
  }

  private renditionUpdated(rend: Rendition): void {
    this.rendition = rend;
  }

}
