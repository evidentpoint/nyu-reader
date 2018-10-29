import React, { ReactNode, MouseEvent, ChangeEvent } from 'react';
import { SettingsViewLayoutTabPageWidthSlider } from './settings-view-layout-tab-page-width-slider';
import { RadioGroup, Radio } from '../../../components/common/radio-group/radio-group';
// tslint:disable-next-line:no-import-side-effect
import './settings-view-layout-tab.css';

type LayoutTabProps = {
  pageWidth: number;
  displayFormat: string;
  scrollMode: string;
  onPageWidthChange: (pageWidth: number) => void;
  onDisplayFormatChange: (displayFormat: string) => void;
  onScrollModeChange: (scrollMode: string) => void;
};

export class SettingsViewLayoutTab extends React.Component<LayoutTabProps, {}> {
  constructor(props: LayoutTabProps) {
    super(props);

    this.displayFormatRadioClicked = this.displayFormatRadioClicked.bind(this);
    this.scrollModeRadioClicked = this.scrollModeRadioClicked.bind(this);
  }

  public render(): ReactNode {
    return (
      <div id="settings-view-layout-tab">
        <SettingsViewLayoutTabPageWidthSlider
          pageWidth= {this.props.pageWidth}
          onPageWidthChanged={this.props.onPageWidthChange}
        />
        <h5 id="setting-header-display-legend">DISPLAY FORMAT</h5>
        <RadioGroup
          ariaLabelledBy="setting-header-display-legend"
          name="display-format"
          id="display-format-radio-group"
          onChange={this.displayFormatRadioClicked}
          selectedValue={this.props.displayFormat}
        >
          <Radio value="auto">Auto</Radio>
          <Radio value="single">Single</Radio>
          <Radio value="double">Double</Radio>
        </RadioGroup>
        <h5 id="setting-header-scroll-mode">SCROLL MODE</h5>
        <RadioGroup
          ariaLabelledBy="setting-header-scroll-mode"
          name="scroll-mode"
          id="scroll-mode-radio-group"
          onChange={this.scrollModeRadioClicked}
          selectedValue={this.props.scrollMode}
        >
          <Radio value="document">Document</Radio>
          <Radio value="continuous">Continuous</Radio>
        </RadioGroup>
      </div>
    );
  }

  private displayFormatRadioClicked(event: ChangeEvent<HTMLInputElement>): void {
    const displayFormat = (event.target as HTMLInputElement).value;

    this.props.onDisplayFormatChange(displayFormat);
  }

  private scrollModeRadioClicked(event: ChangeEvent<HTMLInputElement>): void {
    const scrollMode = (event.target as HTMLInputElement).value;

    this.props.onScrollModeChange(scrollMode);
  }
}
