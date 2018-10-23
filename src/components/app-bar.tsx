import React, { CSSProperties, ReactNode } from 'react';

export interface IAppBarProps {
  title: string;
}

export class AppBar extends React.Component<IAppBarProps, {}> {
  constructor(props: IAppBarProps) {
    super(props);
  }

  public render(): ReactNode {
    // tslint:disable-next-line:no-object-literal-type-assertion
    const containerStyle = {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    } as CSSProperties;

    return (
      <div style={ containerStyle }>
        <div>
          <button>Logo</button>
          <button>TOC</button>
        </div>

        { this.props.title }

        <div>
          <button>Bookmark</button>
          <button>Setting</button>
          <button>Fullscreen</button>
        </div>
      </div>
    );
  }

}
