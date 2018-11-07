import React, { ReactNode, MouseEvent, ChangeEvent } from 'react';
import Modal, { Props } from 'react-modal';
import ReactDOM from 'react-dom';

interface IPopoverProps extends Props {
  id: string;
  centerHorizontally?: string;
  snapToBottomEdge?: string;
}

interface IPopoverState {
  left: string;
  top: string;
}

export class Popover extends React.Component<IPopoverProps, IPopoverState> {
  public static defaultProps: Partial<IPopoverProps> = {
  };

  public readonly state: IPopoverState = {
    left: 'auto',
    top: '50px',
  };

  constructor(props: IPopoverProps) {
    super(props);

    if (props.style && props.style.content) {
      const left = props.style.content.left;
      const top = props.style.content.top;

      this.state = {left, top};
    }

    this.updatePopoverPosition = this.updatePopoverPosition.bind(this);
  }

  public render(): ReactNode {
    const {
      children,
      style = this.props.style || this.getStyle(),
      // tslint:disable-next-line
      ...attributes
    } = this.props;

    return (
      <Modal
        contentRef={this.updatePopoverPosition}
        style={style}
        {...this.props}
      >
        {children}
      </Modal>
    );
  }

  private getStyle(): {} {
    return {
      overlay: {
        backgroundColor: 'none',
      },
      content: {
        top: this.state.top,
        left: this.state.left,
        right: 'auto',
        bottom: 'auto',
      },
    };
  }

  private centerHorizontally(popover: HTMLDivElement): {} {
    const el = document.querySelector(`#${this.props.centerHorizontally}`);
    if (!el) {
      console.error('No element found');
      return {};
    }

    const rectEl = el.getBoundingClientRect();
    const rectPop = popover.getBoundingClientRect();

    let left = (rectEl.left + rectEl.width / 2) - rectPop.width / 2;

    if (rectEl.left + rectPop.width / 2 > window.innerWidth) {
      left = window.innerWidth - rectPop.width;
    } else if (rectEl.left - rectPop.width / 2 < 0) {
      left = 0;
    }

    return {left: `${left}px`};
  }

  // Align the top edge of popover, with the bottom edge of a given element
  private snapToBottomEdge(popover: HTMLDivElement): {} {
    const el = document.querySelector(`#${this.props.snapToBottomEdge}`);
    if (!el) {
      console.error('No element found');
      return {};
    }

    const rectEl = el.getBoundingClientRect();
    const rectPop = popover.getBoundingClientRect();

    const top = rectEl.top + rectEl.height;

    return {top: `${top}px`};
  }

  private updatePopoverPosition(popover: HTMLDivElement): void {
    if (!popover) {
      return;
    }

    let state = {};
    if (this.props.centerHorizontally) {
      const left = this.centerHorizontally(popover);
      state = Object.assign(state, left);
    }
    if (this.props.snapToBottomEdge) {
      const top = this.snapToBottomEdge(popover);
      state = Object.assign(state, top);
    }

    // If not empty
    if (Object.keys(state).length !== 0) {
      this.setState(state);
    }
  }
}
