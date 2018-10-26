import React, { ReactNode } from 'react';
import { SettingsViewLayoutTabPageWidthSlider } from './settings-view-layout-tab-page-width-slider';
import { RadioGroup } from '../../common/radio-group/radio-group';

type State = {
  pageWidth: number;
};

export class SettingsViewLayoutTab extends React.Component<{}, State> {
  public readonly state: State = {
    pageWidth: 550,
  };

  constructor(props: {}) {
    super(props);

    this.setPageWidth = this.setPageWidth.bind(this);
  }

  public render(): ReactNode {
    return (
      <div>
        <SettingsViewLayoutTabPageWidthSlider
          pageWidth= {this.state.pageWidth}
          onPageWidthChanged={this.setPageWidth}
        />
        <RadioGroup>
          <h2>test</h2>
        </RadioGroup>
      </div>
    );
  }

  private setPageWidth(pageWidth: number): void {
    this.setState({pageWidth});
  }
}
