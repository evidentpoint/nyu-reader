import React, { CSSProperties, ReactNode } from 'react';

import { ReadingStateContext, IReadingActions } from '../reading-state-ctx';

export interface INavButtonProps {
  style?: CSSProperties;
  isBackButton: boolean;
}

export class NavButton extends React.Component<INavButtonProps, {}> {
  public constructor(props: INavButtonProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  public render(): ReactNode {
    const buttonText = this.props.isBackButton ? '<' : '>';

    return (
      <ReadingStateContext.Consumer>
        { ({actions}) => (
          <button style={ this.props.style } onClick={ () => {
            this.handleClick(actions);
          } }>
            {buttonText}
          </button>
        )
        }
      </ReadingStateContext.Consumer>
    );
  }

  private async handleClick(actions: IReadingActions): Promise<void> {
    if (this.props.isBackButton) {
      await actions.prevScreen();
    } else {
      await actions.nextScreen();
    }
  }
}
