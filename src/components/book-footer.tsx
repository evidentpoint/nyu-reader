import React, { CSSProperties } from 'react';

interface IBookFooterProps {
  style?: CSSProperties;
  content: string;
 }

// tslint:disable-next-line:variable-name
export const BookFooter: React.SFC<IBookFooterProps> = props => {
  return (
    <div style={ props.style }>{props.content}</div>
  );
};
