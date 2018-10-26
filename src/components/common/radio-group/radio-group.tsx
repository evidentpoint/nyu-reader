import React, { ReactNode } from 'react';

type State = {
};

export class RadioGroup extends React.Component<{}, State> {
  public readonly state: State = {
  };

  constructor(props: {}) {
    super(props);
  }

  public render(): ReactNode {
    return (
      <div role="radiogroup">
        {this.props.children}
      </div>
    );
  }
}
