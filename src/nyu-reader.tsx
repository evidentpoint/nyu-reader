import React, { CSSProperties, ReactNode } from 'react';

import {
  Navigator,
  Publication,
  RenditionContext,
} from '@evidentpoint/r2-navigator-web';

import { ReadingStateContext, IReadingState } from './reading-state-ctx';

import { AppBar } from './components/app-bar';
import { NavButton } from './components/nav-button';
import { BookFooter } from './components/book-footer';
import { ReadiumView } from './readium-view';

export interface INYUReaderProps {
  publication?: Publication;
}

export interface INYUReaderStates {
  viewAsVertical: boolean;
  scrollEnabled: boolean;

  bookTitle: string;
  currReadingLocation: string;

  readingState: IReadingState;
}

export class NYUReader extends React.Component<INYUReaderProps, INYUReaderStates> {
  private publication?: Publication;

  private rendCtx?: RenditionContext;

  private readiumView: ReadiumView | null;

  constructor(props: INYUReaderProps) {
    super(props);

    const initReadingState = {
      actions: {
        nextScreen: this.nextScreen.bind(this),
        prevScreen: this.prevScreen.bind(this),
      },
    };

    this.state = { viewAsVertical: false, scrollEnabled: false,
                   bookTitle: '', currReadingLocation: '',
                   readingState: initReadingState };
    this.renditionUpdated = this.renditionUpdated.bind(this);
  }

  public async openPublication(webpubUrl: string): Promise<void> {
    this.publication = await Publication.fromURL(webpubUrl);

    const bookTitle = this.publication.Metadata.Title as string;
    this.setState({ bookTitle });

    if (this.readiumView) {
      this.readiumView.openPublication(this.publication);
    }

    if (this.rendCtx) {
      await this.rendCtx.rendition.viewport.renderAtOffset(0);
    }

    this.updateCurrentReadingLocaion();
  }

  public render(): ReactNode {
    const appContainerStyle: CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
    };

    const containerStyle: CSSProperties = {
      flex: 'auto',
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
    };

    return (
      <ReadingStateContext.Provider value={this.state.readingState}>
        <div style={ appContainerStyle }>
          <AppBar title={ this.state.bookTitle }/>
          <div style={ containerStyle }>
            <NavButton isBackButton={ true } width={ 30 }/>
            <ReadiumView ref={r => this.readiumView = r}
              enableScroll={ this.state.scrollEnabled } viewAsVertical={ this.state.viewAsVertical }
              onRenditionCreated={ this.renditionUpdated }/>
            <NavButton isBackButton={ false } width={ 30 }/>
          </div>
          <BookFooter content={ this.state.currReadingLocation }></BookFooter>
      </div>
      </ReadingStateContext.Provider>
    );
  }

  private renditionUpdated(rendCtx: RenditionContext): void {
    this.rendCtx = rendCtx;
  }

  private async nextScreen(): Promise<void> {
    if (!this.rendCtx) {
      return;
    }

    await this.rendCtx.navigator.nextScreen();

    this.updateCurrentReadingLocaion();
  }

  private async prevScreen(): Promise<void> {
    if (!this.rendCtx) {
      return;
    }

    await this.rendCtx.navigator.previousScreen();

    this.updateCurrentReadingLocaion();
  }

  private updateCurrentReadingLocaion(): void {
    if (!this.rendCtx) {
      return;
    }

    let locContent = '';
    const startLoc = this.rendCtx.navigator.getScreenBegin();
    if (startLoc) {
      locContent = startLoc.getLocation();
    }

    const endLoc = this.rendCtx.navigator.getScreenEnd();
    if (endLoc) {
      locContent += ` - ${endLoc.getLocation()}`;
    }

    this.setState({ currReadingLocation: locContent });
  }

}
