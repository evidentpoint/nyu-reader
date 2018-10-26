import React, { ChangeEvent, ReactNode } from 'react';
import { SettingsViewKeyboardShortcutsList } from './settings-view-keyboard-shortcuts-list';
// tslint:disable-next-line:no-import-side-effect
import './settings-view-keyboard-shortcuts-tab.css';

export interface IKeyBinding {
  name: string;
  label: string;
  keyValue: string;
}

type State = {
  nameToKeyMap: {};
};

export class SettingsViewKeyboardShortcutsTab extends React.Component<{}, State> {
  private defaultKeyBindings: IKeyBinding[];

  constructor(props: {}) {
    super(props);

    this.resetAllKeyBindings = this.resetAllKeyBindings.bind(this);
    this.resetKeyBinding = this.resetKeyBinding.bind(this);
    this.setKeyBinding = this.setKeyBinding.bind(this);

    this.defaultKeyBindings = this.createDefaultKeyBindings();

    const nameToKeyMap = this.createNameToKeyMap();

    this.state = {
      nameToKeyMap,
    };
  }

  public render(): ReactNode {
    return (
      <div>
        <div className="reset-button reset-button-plain-text">
          <button
            aria-label="Reset all keyboard shortcuts"
            onClick={this.resetAllKeyBindings}
          >Reset all keyboard shortcuts</button>
        </div>
        <SettingsViewKeyboardShortcutsList
          defaultKeyBindings={this.defaultKeyBindings}
          nameToKeyMap={this.state.nameToKeyMap}
          setKeyBinding={this.setKeyBinding}
          resetKeyBinding={this.resetKeyBinding}
        />
      </div>
    );
  }

  private createNameToKeyMap(): {} {
    const nameToKeyMap = {};
    for (const keyBinding of this.defaultKeyBindings) {
      nameToKeyMap[keyBinding.name] = keyBinding.keyValue;
    }

    return nameToKeyMap;
  }

  private resetAllKeyBindings(): void {
    const nameToKeyMap = this.createNameToKeyMap();

    this.setState({
      nameToKeyMap,
    });
  }

  private resetKeyBinding(name: string): void {
    const binding = this.defaultKeyBindings.find((b: IKeyBinding) => {
      return b.name === name;
    });
    if (!binding) {
      console.error('resetKeyBinding not given valid name');

      return;
    }

    this.setKeyBinding(name, binding.keyValue);
  }

  private setKeyBinding(name: string, keyValue: string): void {
    this.setState((prevState: State) => {
      const nameToKeyMap = prevState.nameToKeyMap;
      nameToKeyMap[name] = keyValue;

      return prevState;
    });
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
