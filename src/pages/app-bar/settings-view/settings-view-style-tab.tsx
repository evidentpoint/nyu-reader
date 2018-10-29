import React, { ReactNode } from 'react';
import { SettingsViewStyleTabThemeList } from './settings-view-style-tab-theme-list';
// tslint:disable-next-line:no-import-side-effect
import './settings-view-style-tab.css';
import { SettingsViewStyleTabFontList } from './settings-view-style-tab-font-list';
import { SettingsViewStyleTabFontSizeSlider } from './settings-view-style-tab-font-size-slider';

type StyleTabProps = {
  fontSize: number,
  fontFace: string,
  fontTheme: string,
  onFontSizeChanged: (fontSize: number) => void,
  onFontFaceChanged: (fontFace: string) => void,
  onFontThemeChanged: (fontTheme: string) => void,
};

export class SettingsViewStyleTab extends React.Component<StyleTabProps, {}> {
  private previewText: string;

  constructor(props: StyleTabProps) {
    super(props);

    // tslint:disable-next-line:max-line-length
    this.previewText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus neque dui, congue a suscipit non, feugiat eu urna. Cras in felis sed orci aliquam sagittis.';
  }

  public render(): ReactNode {
    const fontInputValue: number = Math.round(this.props.fontSize * 100);
    const style = {
      fontSize: `${this.props.fontSize}em`,
      fontFamily: `${this.props.fontFace}`,
    };

    return (
      <div>
        <h5>PREVIEW</h5>
        <div
          style= {style}
          className={`preview-block preview-text ${this.props.fontTheme}`}
        >
          {this.previewText}
        </div>
        <h5 id="settings-view-font-size-header">FONT SIZE</h5>
        <SettingsViewStyleTabFontSizeSlider
          fontSize={this.props.fontSize}
          fontInputValue={fontInputValue}
          onFontSizeChanged={this.props.onFontSizeChanged}
        />
        <h5 id="settings-view-font-face-header">FONT FACE</h5>
        <SettingsViewStyleTabFontList
          onFontFaceChanged= {this.props.onFontFaceChanged}
        />
        <h5 id="settings-view-font-color">TEXT AND BACKGROUND COLOR</h5>
        <SettingsViewStyleTabThemeList
          onFontThemeChanged = {this.props.onFontThemeChanged}
        />
      </div>
    );
  }
}
