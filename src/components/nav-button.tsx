import React, { ReactNode } from 'react';

export interface INavButtonProps {
  isBackButton: boolean;
  width: number;
}

export class NavButton extends React.Component<INavButtonProps, {}> {
  public constructor(props: INavButtonProps) {
    super(props);
  }

  public render(): ReactNode {
    const buttonText = this.props.isBackButton ? '<' : '>';

    const style = {
      width: this.props.width,
    };

    return (
      <div style={ style }>
        {buttonText}
      </div>
    );
  }
}
