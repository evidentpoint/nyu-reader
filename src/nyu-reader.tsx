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

export interface INYUReaderSetting {
  continousScroll: boolean
}

export interface INYUReaderProps {
  publication?: Publication;
  initSetting?: INYUReaderSetting;
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

    let continousScroll = false;
    if (this.props.initSetting) {
      continousScroll = this.props.initSetting.continousScroll;
    }

    this.state = { viewAsVertical: continousScroll, scrollEnabled: continousScroll,
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
      display: 'grid',
      gridTemplateRows: 'max-content 1fr max-content',
      gridTemplateColumns: 'max-content 1fr max-content',
      gridTemplateAreas: `'AppBar AppBar AppBar'
                          'PrevNavBar BookContent NextNavBar'
                          'Footer Footer Footer'`,
      width: '100%',
      height: '100%',
      overflow: 'hidden',
    };

    return (
      <ReadingStateContext.Provider value={this.state.readingState}>
        <div style={ appContainerStyle }>
          <AppBar title={ this.state.bookTitle } style={ {gridArea: 'AppBar'} }/>
          <NavButton isBackButton={ true } style={ {width: 30, gridArea: 'PrevNavBar'} }/>
          <ReadiumView ref={r => this.readiumView = r}
            enableScroll={ this.state.scrollEnabled } viewAsVertical={ this.state.viewAsVertical }
            onRenditionCreated={ this.renditionUpdated }
            style={ {gridArea: 'BookContent'} }/>
          <NavButton isBackButton={ false } style={ {width: 30, gridArea: 'NextNavBar'} }/>
          <BookFooter content={ this.state.currReadingLocation }
                      style={ {height: 20, gridArea: 'Footer'} }></BookFooter>
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
