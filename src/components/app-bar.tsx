import React, { CSSProperties, ReactNode } from 'react';
import { Popover } from './common/popover';
import Modal from 'react-modal';
import { FontSettings } from './font-settings';
import { LayoutSettings } from './layout-settings';

export interface IAppBarProps {
  style?: CSSProperties;
  title: string;
}

interface IAppBarState {
  popoverOpen: boolean;
  popoverName: string;
}

enum PopoverButtons {
  FontSettings= 'app-bar-font-button',
  LayoutSettings= 'app-bar-layout-button',
}

Modal.setAppElement('body');

export class AppBar extends React.Component<IAppBarProps, IAppBarState> {
  constructor(props: IAppBarProps) {
    super(props);

    this.openPopover = this.openPopover.bind(this);
    this.closePopover = this.closePopover.bind(this);
    this.popoverButtonClicked = this.popoverButtonClicked.bind(this);
  }

  public readonly state: IAppBarState = {
    popoverOpen: true, // false,
    popoverName: PopoverButtons.LayoutSettings, // '',
  };

  public render(): ReactNode {
    const containerStyle: CSSProperties = {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      padding: '0 0 0.5em 0',
      borderBottom: '1px solid black',
    };

    const popoverContainerStyle: CSSProperties = {
      position: 'absolute',
    };

    if (this.props.style) {
      Object.assign(containerStyle, this.props.style);
    }

    return (
      <div id="app-bar" style={ containerStyle }>
        <div>
          <button>Logo</button>
          <button>TOC</button>
        </div>

        { this.props.title }

        <div>
          <button id={PopoverButtons.FontSettings} onClick={this.popoverButtonClicked}>Font</button>
          <button id={PopoverButtons.LayoutSettings}
            onClick={this.popoverButtonClicked}>Layout</button>
          <button>Bookmark</button>
          <button>Fullscreen</button>
        </div>

        <div style={ popoverContainerStyle }>
          <Popover
            isOpen={this.state.popoverOpen}
            centerHorizontally={this.state.popoverName}
            snapToBottomEdge={'app-bar'}
            onRequestClose={this.closePopover}
          >
            {this.getPopoverContent()}
          </Popover>
        </div>
      </div>
    );
  }

  public popoverButtonClicked(event: React.MouseEvent<HTMLButtonElement>): void {
    const id = (event.target as HTMLButtonElement).id;

    this.openPopover(id);
  }

  public openPopover(popoverName: string): void {
    this.setState({
      popoverOpen: true,
      popoverName,
    });
  }

  public closePopover(): void {
    this.setState({popoverOpen: false});
  }

  public getPopoverContent(): JSX.Element {
    switch (this.state.popoverName) {
      case PopoverButtons.FontSettings:
        return (
          <FontSettings></FontSettings>
        );
        break;
      case PopoverButtons.LayoutSettings:
        return (
          <LayoutSettings></LayoutSettings>
        );
    }

    return (<div></div>);
  }
}
