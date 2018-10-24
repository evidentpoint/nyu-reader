import React from 'react';

export interface IReadingState {
  actions: IReadingActions;
}

export interface IReadingActions {
  nextScreen(): Promise<void>;
  prevScreen(): Promise<void>;
}

const defaultCtxValue = {
  actions: {
    nextScreen: () => { return Promise.resolve(); },
    prevScreen: () => { return Promise.resolve(); },
  },
};

// tslint:disable-next-line:variable-name
export const ReadingStateContext = React.createContext<IReadingState>(defaultCtxValue);
