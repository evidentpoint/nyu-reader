import React, { ChangeEvent, ReactNode } from 'react';
// tslint:disable-next-line:max-line-length
import { SettingsViewKeyboardShortcutsListItem } from './settings-view-keyboard-shortcuts-list-item';
import { IKeyBinding } from './settings-view';

type ListProps = {
  defaultKeyBindings: IKeyBinding[];
  nameToKeyMap: {};
  setKeyBinding(name: string, keyValue: string): void;
  resetKeyBinding(name: string): void;
};

export class SettingsViewKeyboardShortcutsList extends React.Component<ListProps, {}> {
  constructor(props: ListProps) {
    super(props);
  }

  public render(): ReactNode {
    return (
      <ul className="keyboard-shortcuts-list">
        {this.createItems()}
      </ul>
    );
  }

  private createItems(): JSX.Element[] {
    const keyBindings = this.props.defaultKeyBindings;
    const nameToKeyMap = this.props.nameToKeyMap;

    const items: JSX.Element[] = [];
    keyBindings.forEach((keyBinding: IKeyBinding, index: number) => {
      const item = this.createItem(
        keyBinding.name,
        keyBinding.label,
        nameToKeyMap[keyBinding.name],
        keyBinding.keyValue,
        index,
      );
      items.push(item);
    });

    return items;
  }

  private createItem(
    name: string, label: string, keyValue: string,
    defaultKeyValue: string, key: number): JSX.Element {
    return (
      <SettingsViewKeyboardShortcutsListItem
        name={name}
        label={label}
        keyValue={keyValue}
        defaultKeyValue={defaultKeyValue}
        onInputChanged={this.props.setKeyBinding}
        onButtonReset={this.props.resetKeyBinding}
        key={key}
      />
    );
  }
}
