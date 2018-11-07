import React, { CSSProperties, ReactNode } from 'react';

export interface IIncrementalInputProps extends JSX.IntrinsicClassAttributes<HTMLInputElement> {
  onNumberUpdated?: (fontSize: number) => void;
  labelIncrement?: string;
  labelDecrement?: string;
  step?: number;
  value?: number;
}

export class IncrementalInput extends React.Component<IIncrementalInputProps, {}> {
  private static defaultProps: Partial<IIncrementalInputProps> = {
    onNumberUpdated: (num: number) => {},
    labelIncrement: 'More',
    labelDecrement: 'Less',
    step: 1,
  };

  public constructor(props: IIncrementalInputProps) {
    super(props);

    this.onInputChanged = this.onInputChanged.bind(this);
    this.incrementValue = this.incrementValue.bind(this);
    this.decrementValue = this.decrementValue.bind(this);
  }

  public render(): ReactNode {
    const {
      labelDecrement,
      labelIncrement,
      onNumberUpdated,
      value,
      // tslint:disable-next-line
      ...attributes
    } = this.props;

    return (
      <div>
        <button onClick={this.decrementValue}>{labelDecrement}</button>
        <input onChange={this.onInputChanged} type="number" value={value} {...attributes} />
        <button onClick={this.incrementValue}>{labelIncrement}</button>
      </div>
    );
  }

  private onInputChanged(event: React.ChangeEvent<HTMLInputElement>): void {
    const fontSize = event.target.value && Number.parseInt(event.target.value, 10);
    if (!fontSize || !this.props.onNumberUpdated) {
      return;
    }

    this.props.onNumberUpdated(fontSize);
  }

  private incrementValue(): void {
    if (!this.props.onNumberUpdated || this.props.value === undefined || !this.props.step) {
      return;
    }

    this.props.onNumberUpdated(this.props.value + this.props.step);
  }

  private decrementValue(): void {
    if (!this.props.onNumberUpdated || this.props.value === undefined || !this.props.step) {
      return;
    }

    this.props.onNumberUpdated(this.props.value - this.props.step);
  }
}
