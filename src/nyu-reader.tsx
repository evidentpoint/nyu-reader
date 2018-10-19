import React, { CSSProperties, ReactNode } from 'react';

import {
  Publication,
  Rendition,
} from '@evidentpoint/r2-navigator-web';

import { NavButton } from './components/nav-button';
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
    // tslint:disable-next-line:no-object-literal-type-assertion
    const containerStyle = {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      height: '100%',
    } as CSSProperties;

    return (
      <div style={ containerStyle }>
        <NavButton isBackButton={ true } width={ 30 }/>
        <ReadiumView ref={r => this.readiumView = r}
          enableScroll={ false } viewAsVertical={ false }
          onRenditionCreated={ this.renditionUpdated }/>
        <NavButton isBackButton={ false } width={ 30 }/>
      </div>
    );
  }

  private renditionUpdated(rend: Rendition): void {
    this.rendition = rend;
  }

}
