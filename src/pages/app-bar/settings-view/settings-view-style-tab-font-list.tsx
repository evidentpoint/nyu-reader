import React, { ChangeEvent, ReactNode } from 'react';

type ThemeListProps = {
  onFontFaceChanged(fontFace: string): void;
};

export class SettingsViewStyleTabFontList extends React.Component<ThemeListProps, {}> {
  private fontFaces: string[];

  constructor(props: ThemeListProps) {
    super(props);
    this.fontFaceChanged = this.fontFaceChanged.bind(this);

    this.fontFaces = [
      'Default',
      'Hei',
    ];
  }

  public render(): ReactNode {
    return (
      <select
          aria-labelledby="settings-view-font-face-header"
          aria-label="FONT FACE"
          className="col-xs-8 col-xs-offset-2"
          onChange={this.fontFaceChanged}
        >
          {this.createFontFaces(this.fontFaces)}
        </select>
    );
  }

  private fontFaceChanged(event: ChangeEvent<HTMLSelectElement>): void {
    const fontFace = event.target.selectedOptions[0].text;

    this.props.onFontFaceChanged(fontFace);
  }

  private createFontFaces(fontFaceData: string[]): JSX.Element[] {
    const options = [];

    let index = 0;
    for (const fontFace of fontFaceData) {
      options.push(this.createFontFace(fontFace, index));
      index += 1;
    }

    return options;
  }

  private createFontFace(label: string, key: number): JSX.Element {

    return (
      <option
        value={key}
        aria-label={label}
        title={label}
        key={key}
      >{label}</option>
    );
  }
}
