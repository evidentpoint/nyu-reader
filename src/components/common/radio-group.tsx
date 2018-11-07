import React, { ReactNode, ChangeEvent } from 'react';
import { IRadioProps } from './radio';
export { Radio } from './radio';

type ChildProps = IRadioProps;

interface IRadioGroupProps {
  id: string;
  name?: string;
  selectedValue?: string;
  ariaLabelledBy?: string;
  className?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export class RadioGroup extends React.Component<IRadioGroupProps, {}> {
  private static defaultProps: Partial<IRadioGroupProps> = {
    className: 'radio-group',
  };

  private childProps: ChildProps;

  constructor(props: IRadioGroupProps) {
    super(props);

    this.childProps = {
      name: props.name || props.id,
      id: props.id,
      onChange: props.onChange,
    };
  }

  public render(): ReactNode {
    // For every child, pass childProps into them
    const children = React.Children.map(
      this.props.children,
      (child: React.ReactElement<any>, index: number) => {
        // Pull out id to modify, and pass the rest as-is
        const {
          id,
          // tslint:disable-next-line
          ...attributes
        } = this.childProps;

        return React.cloneElement(child, {
          // Append the index to the id, so that each child has a unique id
          id: `${id}-${index + 1}`,
          checked: this.props.selectedValue === child.props.value,
          // Select the child that matches the specified value
          ...attributes,
        });
      },
    );

    return (
      <div role="radiogroup" className={this.props.className} id={this.props.id}>
        {children}
      </div>
    );
  }
}
