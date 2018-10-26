import React, { ChangeEvent, ReactNode } from 'react';

type ThemeListProps = {
  onFontFaceChanged(fontFace: string): void;
};

export class SettingsViewStyleTabFontList extends React.Component<ThemeListProps, {}> {

  constructor(props: ThemeListProps) {
    super(props);
    this.fontFaceChanged = this.fontFaceChanged.bind(this);
  }

  public render(): ReactNode {
    return (
      <select
          aria-labelledby="settings-view-font-face-header"
          aria-label="FONT FACE"
          className="col-xs-8 col-xs-offset-2"
          onChange={this.fontFaceChanged}
        >
          <option value="0" aria-label="Default" title="Default">Default</option>
          <option value="1" aria-label="Hei" title="Hei">Hei</option>
        </select>
    );
  }

  private fontFaceChanged(event: ChangeEvent<HTMLSelectElement>): void {
    const fontFace = event.target.selectedOptions[0].text;

    this.props.onFontFaceChanged(fontFace);
  }
}
