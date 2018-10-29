import React, { ChangeEvent, ReactNode } from 'react';

type FontSizeProps = {
  pageWidth: number;
  onPageWidthChanged(pageWidth: number): void;
};

export class SettingsViewLayoutTabPageWidthSlider extends React.Component<FontSizeProps, {}> {

  constructor(props: FontSizeProps) {
    super(props);
    this.pageWidthChanged = this.pageWidthChanged.bind(this);
  }

  public render(): ReactNode {
    return (
      <div>
        <h5 id="settings-view-page-width-header">PAGE WIDTH</h5>
        <div className="col-xs-8 col-xs-offset-2">
          <input
            type="range"
            title={`PAGE WIDTH ${this.props.pageWidth}px`}
            aria-label={`PAGE WIDTH ${this.props.pageWidth}px`}
            aria-labelledby="settings-view-page-width-header"
            value={this.props.pageWidth}
            aria-valuenow={this.props.pageWidth}
            aria-valuetext={`${this.props.pageWidth}px`}
            min="500"
            aria-valuemin={500}
            step="50"
            max="2000"
            aria-valuemax={2000}
            className="range-slider"
            onChange={this.pageWidthChanged}
          ></input>
        </div>
      </div>
    );
  }

  private pageWidthChanged(event: ChangeEvent<HTMLInputElement>): void {
    const pageWidth = Number.parseInt(event.target.value, 10);

    this.props.onPageWidthChanged(pageWidth);
  }
}
