import React, { ReactNode, ChangeEvent } from 'react';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
// tslint:disable-next-line:no-import-side-effect
import '../../common.css';
// tslint:disable-next-line:no-import-side-effect
import './settings-view.css';
import { SettingsViewStyleTab } from './settings-view-style-tab';

type State = {
  fontSize: number;
  fontFace: string;
  fontTheme: string;
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
  };

  constructor(props: {}) {
    super(props);

    this.setFontSize = this.setFontSize.bind(this);
    this.setFontFace = this.setFontFace.bind(this);
    this.setFontTheme = this.setFontTheme.bind(this);
  }

  public render(): ReactNode {
    return (
      <Tabs
        className="default-tabs"
      >
        <TabList>
          <Tab>Style</Tab>
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
}
