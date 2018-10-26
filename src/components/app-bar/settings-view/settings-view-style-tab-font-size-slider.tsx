import React, { ChangeEvent, ReactNode } from 'react';

type FontSizeProps = {
  fontInputValue: number;
  fontSize: number;
  onFontSizeChanged(fontSize: number): void;
};

export class SettingsViewStyleTabFontSizeSlider extends React.Component<FontSizeProps, {}> {

  constructor(props: FontSizeProps) {
    super(props);
    this.fontSizeChanged = this.fontSizeChanged.bind(this);
  }

  public render(): ReactNode {
    return (
      <div className="row">
        <div className="col-xs-2">
          <img></img>
        </div>
        <div className="col-xs-8 col-xs-offset-2">
          <input
            type="range"
            title={`FONT SIZE ${this.props.fontInputValue}%`}
            aria-labelledby="settings-view-font-size-header"
            value={this.props.fontInputValue}
            aria-valuenow={this.props.fontSize}
            aria-valuetext={`${this.props.fontInputValue}%`}
            min="60"
            aria-valuemin={60}
            step="10"
            max="170"
            aria-valuemax={170}
            className="range-slider"
            onChange={this.fontSizeChanged}
          ></input>
        </div>
        <div className="col-xs-2">
          <img></img>
        </div>
      </div>
    );
  }

  private fontSizeChanged(event: ChangeEvent<HTMLInputElement>): void {
    const fontSize = Number.parseInt(event.target.value, 10);

    this.props.onFontSizeChanged(fontSize / 100);
  }
}
