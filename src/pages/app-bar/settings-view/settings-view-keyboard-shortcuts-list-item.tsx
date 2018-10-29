import React, { ChangeEvent, MouseEvent, ReactNode } from 'react';
// tslint:disable-next-line:no-import-side-effect
import './settings-view-keyboard-shortcuts-list-item.css';

type ItemProps = {
  name: string;
  label: string;
  keyValue: string;
  defaultKeyValue: string;
  onInputChanged(name: string, keyValue: string): void;
  onButtonReset(name: string): void;
};

export class SettingsViewKeyboardShortcutsListItem extends React.Component<ItemProps, {}> {

  constructor(props: ItemProps) {
    super(props);

    this.inputChanged = this.inputChanged.bind(this);
    this.resetButtonClicked = this.resetButtonClicked.bind(this);
  }

  public render(): ReactNode {
    return (
      <li className="keyboard-shortcuts-list-item">
        <label id={`label_${this.props.name}`}>
          {this.props.label}
          <span>{this.props.name}</span>
        </label>
        <div className="keyboardInputContainer">
          <input
            name={this.props.name}
            className="keyboardInput"
            type="text"
            placeholder={this.props.keyValue}
            value={this.props.keyValue}
            data-val={this.props.keyValue}
            aria-labelledby={`label_${this.props.name}`}
            aria-label={this.props.label}
            title={this.props.label}
            onChange={this.inputChanged}
          ></input>
          <button
            className="reset-button"
            data-name={this.props.name}
            title={`Reset key (${this.props.defaultKeyValue})`}
            aria-label={`Reset key (${this.props.defaultKeyValue})`}
            onClick={this.resetButtonClicked}
          >
            <span aria-hidden="true">⊗</span>
          </button>
        </div>
      </li>
    );
  }

  private inputChanged(event: ChangeEvent<HTMLInputElement>): void {
    const name = event.target.name;
    const keyValue = event.target.value;

    this.props.onInputChanged(name, keyValue);
  }

  private resetButtonClicked(event: MouseEvent<HTMLButtonElement>): void {
    const name = (event.target as HTMLButtonElement).dataset.name;
    if (!name) {
      console.error('Name not being successfully taken from button');

      return;
    }

    this.props.onButtonReset(name);
  }
}
