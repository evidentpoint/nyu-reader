import React, { ChangeEvent, ReactNode } from 'react';
import { SettingsViewKeyboardShortcutsList } from './settings-view-keyboard-shortcuts-list';
// tslint:disable-next-line:no-import-side-effect
import './settings-view-keyboard-shortcuts-tab.css';
import { IKeyBinding } from './settings-view';

type ShortcutsTabProps = {
  nameToKeyMap: {};
  defaultKeyBindings: IKeyBinding[];
  onResetAllKeyBindings: () => void;
  onSetKeyBinding: (name: string, keyValue: string) => void;
};

export class SettingsViewKeyboardShortcutsTab extends React.Component<ShortcutsTabProps, {}> {
  constructor(props: ShortcutsTabProps) {
    super(props);

    this.resetAllKeyBindings = this.resetAllKeyBindings.bind(this);
    this.resetKeyBinding = this.resetKeyBinding.bind(this);
    this.setKeyBinding = this.setKeyBinding.bind(this);
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
          defaultKeyBindings={this.props.defaultKeyBindings}
          nameToKeyMap={this.props.nameToKeyMap}
          setKeyBinding={this.setKeyBinding}
          resetKeyBinding={this.resetKeyBinding}
        />
      </div>
    );
  }

  private resetAllKeyBindings(): void {
    this.props.onResetAllKeyBindings();
  }

  private resetKeyBinding(name: string): void {
    const binding = this.props.defaultKeyBindings.find((b: IKeyBinding) => {
      return b.name === name;
    });
    if (!binding) {
      console.error('resetKeyBinding not given valid name');

      return;
    }

    this.setKeyBinding(name, binding.keyValue);
  }

  private setKeyBinding(name: string, keyValue: string): void {
    this.props.onSetKeyBinding(name, keyValue);
  }
}
