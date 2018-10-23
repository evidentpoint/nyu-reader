import React, { CSSProperties, ReactNode } from 'react';

import {
  Navigator,
  Publication,
  RenditionContext,
} from '@evidentpoint/r2-navigator-web';

import { AppBar } from './components/app-bar';
import { NavButton } from './components/nav-button';
import { ReadiumView } from './readium-view';

export interface INYUReaderProps {
  publication?: Publication;
}

export interface INYUReaderStates {
  viewAsVertical: boolean;
  scrollEnabled: boolean;
  navigator?: Navigator;
}

export class NYUReader extends React.Component<INYUReaderProps, INYUReaderStates> {
  private publication?: Publication;

  private rendCtx?: RenditionContext;

  private readiumView: ReadiumView | null;

  constructor(props: {}) {
    super(props);
    this.state = { viewAsVertical: false, scrollEnabled: false };
    this.renditionUpdated = this.renditionUpdated.bind(this);
  }

  public async openPublication(webpubUrl: string): Promise<void> {
    this.publication = await Publication.fromURL(webpubUrl);

    if (this.readiumView) {
      this.readiumView.openPublication(this.publication);
    }

    if (this.rendCtx) {
      this.rendCtx.rendition.viewport.renderAtOffset(0);
    }
  }

  public render(): ReactNode {
    // tslint:disable-next-line:no-object-literal-type-assertion
    const appContainerStyle = {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
    } as CSSProperties;

    // tslint:disable-next-line:no-object-literal-type-assertion
    const containerStyle = {
      flex: 'auto',
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
    } as CSSProperties;

    return (
      <div style={ appContainerStyle }>
        <AppBar/>
        <div style={ containerStyle }>
          <NavButton isBackButton={ true } width={ 30 }
            navigator={ this.state.navigator }/>
          <ReadiumView ref={r => this.readiumView = r}
            enableScroll={ this.state.scrollEnabled } viewAsVertical={ this.state.viewAsVertical }
            onRenditionCreated={ this.renditionUpdated }/>
          <NavButton isBackButton={ false } width={ 30 }
            navigator={ this.state.navigator }/>
        </div>
      </div>
    );
  }

  private renditionUpdated(rendCtx: RenditionContext): void {
    this.rendCtx = rendCtx;
    this.setState({ navigator: this.rendCtx.navigator });
  }

}
