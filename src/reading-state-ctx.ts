import React from 'react';

export interface IReadingState {
  actions: IReadingActions;
  data: IReaderSettingsState;
}

export interface IReadingActions {
  nextScreen(): Promise<void>;
  prevScreen(): Promise<void>;
  setFontSize(fontSize: number): void;
  setReadingMode(readingMode: string): void;
  setColumnGap(columnGap: number): void;
  setSpreadMode(spreadMode: string): void;
}

export interface IReaderSettingsState {
  fontSize: number;
  readingMode: string;
  columnGap: number;
  spreadMode: string;
}

const defaultSettingValue = {
  fontSize: 100,
  readingMode: '',
  spreadMode: 'double',
  columnGap: 20,
};

const defaultCtxValue = {
  actions: {
    nextScreen: () => { return Promise.resolve(); },
    prevScreen: () => { return Promise.resolve(); },
    setFontSize: (fontSize: number) => {},
    setReadingMode: (readingMode: string) => {},
    setColumnGap: (columnGap: number) => {},
    setSpreadMode: (spreadMode: string) => {},
  },
  data: defaultSettingValue,
};

// tslint:disable-next-line:variable-name
export const ReadingStateContext = React.createContext<IReadingState>(defaultCtxValue);
