import React, { ReactNode, ChangeEvent } from 'react';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
// tslint:disable-next-line:no-import-side-effect
import '../../common.css';
// tslint:disable-next-line:no-import-side-effect
import './settings-view.css';
import { SettingsViewStyleTab } from './settings-view-style-tab';
import { SettingsViewLayoutTab } from './settings-view-layout-tab';
import { SettingsViewKeyboardShortcutsTab } from './settings-view-keyboard-shortcuts-tab';

type State = {
  fontSize: number;
  fontFace: string;
  fontTheme: string;
  pageWidth: number;
  displayFormat: string;
  scrollMode: string;
  nameToKeyMap: {};
};

export interface IKeyBinding {
  name: string;
  label: string;
  keyValue: string;
}

export class SettingsView extends React.Component<{}, {}> {
  private defaultKeyBindings: IKeyBinding[];

  public readonly state: State = {
    fontSize: 1,
    fontFace: 'inherit',
    fontTheme: 'author-theme',
    pageWidth: 550,
    displayFormat: 'auto',
    scrollMode: 'document',
    nameToKeyMap: this.createNameToKeyMap(this.createDefaultKeyBindings()),
  };

  constructor(props: {}) {
    super(props);

    this.defaultKeyBindings = this.createDefaultKeyBindings();

    this.setFontSize = this.setFontSize.bind(this);
    this.setFontFace = this.setFontFace.bind(this);
    this.setFontTheme = this.setFontTheme.bind(this);
    this.setPageWidth = this.setPageWidth.bind(this);
    this.setDisplayFormat = this.setDisplayFormat.bind(this);
    this.setScrollMode = this.setScrollMode.bind(this);
    this.resetNameToKeyMap = this.resetNameToKeyMap.bind(this);
    this.setKeyBinding = this.setKeyBinding.bind(this);
  }

  public render(): ReactNode {
    return (
      <Tabs
        className="default-tabs"
      >
        <TabList>
          <Tab>Style</Tab>
          <Tab>Layout</Tab>
          <Tab>Keyboard shortcuts</Tab>
        </TabList>

        <TabPanel>
          <SettingsViewStyleTab
            fontSize= {this.state.fontSize}
            fontFace= {this.state.fontFace}
            fontTheme= {this.state.fontTheme}
            onFontSizeChanged= {this.setFontSize}
            onFontFaceChanged= {this.setFontFace}
            onFontThemeChanged= {this.setFontTheme}
          />
        </TabPanel>
        <TabPanel>
          <SettingsViewLayoutTab
            pageWidth= {this.state.pageWidth}
            displayFormat= {this.state.displayFormat}
            scrollMode= {this.state.scrollMode}
            onPageWidthChange= {this.setPageWidth}
            onDisplayFormatChange= {this.setDisplayFormat}
            onScrollModeChange= {this.setScrollMode}
          />
        </TabPanel>
        <TabPanel>
          <SettingsViewKeyboardShortcutsTab
            nameToKeyMap= {this.state.nameToKeyMap}
            defaultKeyBindings= {this.defaultKeyBindings}
            onResetAllKeyBindings= {this.resetNameToKeyMap}
            onSetKeyBinding= {this.setKeyBinding}
          />
        </TabPanel>
      </Tabs>
    );
  }

  private setFontSize(size: number): void {
    this.setState({fontSize: size});
  }

  private setFontFace(fontFace: string): void {
    let fontFamily = {fontFace: 'inherit'};
    if (fontFace !== 'Default') {
      fontFamily = {fontFace};
    }
    this.setState(fontFamily);
  }

  private setFontTheme(theme: string): void {
    this.setState({fontTheme: theme});
  }

  private setPageWidth(width: number): void {
    this.setState({pageWidth: width});
  }

  private setDisplayFormat(format: string): void {
    this.setState({displayFormat: format});
  }

  private setScrollMode(mode: string): void {
    this.setState({scrollMode: mode});
  }

  private resetNameToKeyMap(): void {
    const nameToKeyMap = this.createNameToKeyMap();

    this.setState({nameToKeyMap});
  }

  private setKeyBinding(name: string, keyValue: string): void {
    this.setState((prevState: State) => {
      const nameToKeyMap = prevState.nameToKeyMap;
      nameToKeyMap[name] = keyValue;

      return prevState;
    });
  }

  private createNameToKeyMap(defaultBinding?: IKeyBinding[]): {} {
    const defaultKeyBinding = defaultBinding || this.defaultKeyBindings;
    const nameToKeyMap = {};
    for (const keyBinding of defaultKeyBinding) {
      nameToKeyMap[keyBinding.name] = keyBinding.keyValue;
    }

    return nameToKeyMap;
  }

  private createDefaultKeyBindings(): IKeyBinding[] {
    return [
      {
        label: 'Settings',
        name: 'ShowSettingsModal',
        keyValue: 'o',
      },
      {
        label: 'Settings - Save changes',
        name: 'SettingsModalSave',
        keyValue: 's',
      },
      {
        label: 'Settings - Close',
        name: 'SettingsModalClose',
        keyValue: 'c',
      },
      {
        label: 'Previous Page',
        name: 'PagePrevious',
        keyValue: 'left',
      },
      {
        label: 'Next Page',
        name: 'PageNext',
        keyValue: 'right',
      },
    ];
  }
}
