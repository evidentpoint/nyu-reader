import React, { ReactNode } from 'react';

import {
  Navigator,
} from '@evidentpoint/r2-navigator-web';

export interface INavButtonProps {
  isBackButton: boolean;
  width: number;
  navigator?: Navigator;
}

export class NavButton extends React.Component<INavButtonProps, {}> {
  public constructor(props: INavButtonProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  public render(): ReactNode {
    const buttonText = this.props.isBackButton ? '<' : '>';

    const style = {
      width: this.props.width,
    };

    return (
      <button style={ style } onClick={ this.handleClick }>
        {buttonText}
      </button>
    );
  }

  private async handleClick(): Promise<void> {
    if (!this.props.navigator) {
      return;
    }

    if (this.props.isBackButton) {
      await this.props.navigator.previousScreen();
    } else {
      await this.props.navigator.nextScreen();
    }
  }
}
