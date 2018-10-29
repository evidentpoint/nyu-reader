import React, { ReactNode, MouseEvent, ChangeEvent } from 'react';

export interface IRadioProps {
  name: string;
  id: string;
  checked?: boolean;
  containerClassName?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export class Radio extends React.Component<IRadioProps, {}> {
  public static defaultProps: Partial<IRadioProps> = {
    containerClassName: 'radio-container',
    onChange: () => {},
  };

  constructor(props: IRadioProps) {
    super(props);
  }

  public render(): ReactNode {
    const {
      children,
      value,
      containerClassName,
      id,
      onChange,
      // tslint:disable-next-line
      ...attributes
    } = this.props;

    return (
      <div
        role="radio" className={containerClassName}
      >
        <input type="radio" id={id} value={value} onChange={onChange} {...attributes} />
        <label htmlFor={id}>
          {children}
        </label>
      </div>
    );
  }
}
