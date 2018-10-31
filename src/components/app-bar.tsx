import React, { CSSProperties, ReactNode } from 'react';

export interface IAppBarProps {
  style?: CSSProperties;
  title: string;
}

export class AppBar extends React.Component<IAppBarProps, {}> {
  constructor(props: IAppBarProps) {
    super(props);
  }

  public render(): ReactNode {
    const containerStyle: CSSProperties = {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    };

    if (this.props.style) {
      Object.assign(containerStyle, this.props.style);
    }

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
