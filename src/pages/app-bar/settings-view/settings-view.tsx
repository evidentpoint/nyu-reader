import React, { ReactNode, ChangeEvent } from 'react';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
// tslint:disable-next-line:no-import-side-effect
import '../../common.css';
// tslint:disable-next-line:no-import-side-effect
import './settings-view.css';
import { SettingsViewStyleTab } from './settings-view-style-tab';
import { SettingsViewLayoutTab } from './settings-view-layout-tab';

type State = {
  fontSize: number;
  fontFace: string;
  fontTheme: string;
  pageWidth: number;
  displayFormat: string;
  scrollMode: string;
};

export interface IKeyBinding {
  name: string;
  label: string;
  keyValue: string;
}

export class SettingsView extends React.Component<{}, {}> {
  public readonly state: State = {
    fontSize: 1,
    fontFace: 'inherit',
    fontTheme: 'author-theme',
    pageWidth: 550,
    displayFormat: 'auto',
    scrollMode: 'document',
  };

  constructor(props: {}) {
    super(props);

    this.setFontSize = this.setFontSize.bind(this);
    this.setFontFace = this.setFontFace.bind(this);
    this.setFontTheme = this.setFontTheme.bind(this);
    this.setPageWidth = this.setPageWidth.bind(this);
    this.setDisplayFormat = this.setDisplayFormat.bind(this);
    this.setScrollMode = this.setScrollMode.bind(this);
  }

  public render(): ReactNode {
    return (
      <Tabs
        className="default-tabs"
      >
        <TabList>
          <Tab>Style</Tab>
          <Tab>Layout</Tab>
        </TabList>

        <TabPanel>
          <SettingsViewStyleTab
            fontSize= {this.state.fontSize}
            fontFace= {this.state.fontFace}
            fontTheme= {this.state.fontTheme}
            onFontSizeChanged= {this.setFontSize}
            onFontFaceChanged= {this.setFontFace}
            onFontThemeChanged= {this.setFontTheme}
          />
        </TabPanel>
        <TabPanel>
          <SettingsViewLayoutTab
            pageWidth= {this.state.pageWidth}
            displayFormat= {this.state.displayFormat}
            scrollMode= {this.state.scrollMode}
            onPageWidthChange= {this.setPageWidth}
            onDisplayFormatChange= {this.setDisplayFormat}
            onScrollModeChange= {this.setScrollMode}
          />
        </TabPanel>
      </Tabs>
    );
  }

  private setFontSize(size: number): void {
    this.setState({fontSize: size});
  }

  private setFontFace(fontFace: string): void {
    let fontFamily = {fontFace: 'inherit'};
    if (fontFace !== 'Default') {
      fontFamily = {fontFace};
    }
    this.setState(fontFamily);
  }

  private setFontTheme(theme: string): void {
    this.setState({fontTheme: theme});
  }

  private setPageWidth(width: number): void {
    this.setState({pageWidth: width});
  }

  private setDisplayFormat(format: string): void {
    this.setState({displayFormat: format});
  }

  private setScrollMode(mode: string): void {
    this.setState({scrollMode: mode});
  }
}
