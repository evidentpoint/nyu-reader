import React, { ReactNode } from 'react';

interface IBookFooterProps {
  content: string;
 }

// tslint:disable-next-line:variable-name
export const BookFooter: React.SFC<IBookFooterProps> = props => {
  return (
    <div style={ {height: 20} }>{props.content}</div>
  );
};
