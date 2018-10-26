import React, { ChangeEvent, ReactNode } from 'react';
import { SettingsViewStyleTabThemeList } from './settings-view-style-tab-theme-list';
// tslint:disable-next-line:no-import-side-effect
import './settings-view-style-tab.css';
import { SettingsViewStyleTabFontList } from './settings-view-style-tab-font-list';
import { SettingsViewStyleTabFontSizeSlider } from './settings-view-style-tab-font-size-slider';

type State = {
  fontSize: number;
  fontFamily: string;
  fontTheme: string;
};

export class SettingsViewStyleTab extends React.Component<{}, State> {
  public readonly state: State = {
    fontSize: 1,
    fontFamily: 'inherit',
    fontTheme: 'author-theme',
  };

  private previewText: string;

  constructor(props: {}) {
    super(props);
    this.setFontSize = this.setFontSize.bind(this);
    this.setFontFace = this.setFontFace.bind(this);
    this.setFontTheme = this.setFontTheme.bind(this);

    // tslint:disable-next-line:max-line-length
    this.previewText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus neque dui, congue a suscipit non, feugiat eu urna. Cras in felis sed orci aliquam sagittis.';
  }

  public render(): ReactNode {
    const fontSize = this.state.fontSize;
    const fontInputValue: number = Math.round(fontSize * 100);
    const fontFamily = this.state.fontFamily;
    const fontTheme = this.state.fontTheme;
    const style = {
      fontSize: `${fontSize}em`,
      fontFamily: `${fontFamily}`,
    };

    return (
      <div>
        <h5>PREVIEW</h5>
        <div
          style= {style}
          className={`preview-block preview-text ${fontTheme}`}
        >
          {this.previewText}
        </div>
        <h5 id="settings-view-font-size-header">FONT SIZE</h5>
        <SettingsViewStyleTabFontSizeSlider
          fontSize={fontSize}
          fontInputValue={fontInputValue}
          onFontSizeChanged={this.setFontSize}
        />
        <h5 id="settings-view-font-face-header">FONT FACE</h5>
        <SettingsViewStyleTabFontList
          onFontFaceChanged= {this.setFontFace}
        />
        <h5 id="settings-view-font-color">TEXT AND BACKGROUND COLOR</h5>
        <SettingsViewStyleTabThemeList
          onFontThemeChanged = {this.setFontTheme}
        />
      </div>
    );
  }

  private setFontSize(fontSize: number): void {
    this.setState({fontSize});
  }

  private setFontFace(fontFace: string): void {
    let fontFamily = {fontFamily: 'inherit'};
    if (fontFace !== 'Default') {
      fontFamily = {fontFamily: fontFace};
    }
    this.setState(fontFamily);
  }

  private setFontTheme(fontTheme: string): void {
    this.setState({fontTheme});
  }
}
