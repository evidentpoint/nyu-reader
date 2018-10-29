import React, { ChangeEvent, ReactNode } from 'react';
// tslint:disable-next-line:no-import-side-effect
import './settings-view-style-tab-theme-list.css';

type ThemeListProps = {
  onFontThemeChanged(fontTheme: string): void;
};

interface IThemeButton {
  label: string;
  theme: string;
}

export class SettingsViewStyleTabThemeList extends React.Component<ThemeListProps, {}> {
  private themeButtons: IThemeButton[];

  constructor(props: ThemeListProps) {
    super(props);
    this.fontThemeChanged = this.fontThemeChanged.bind(this);

    this.themeButtons = [
      {
        label: 'Default (author styles)',
        theme: 'author-theme',
      },
      {
        label: 'Black and White',
        theme: 'default-theme',
      },
      {
        label: 'Arabian Nights',
        theme: 'night-theme',
      },
      {
        label: 'Sands of Dune',
        theme: 'parchment-theme',
      },
      {
        label: 'Ballard Blues',
        theme: 'ballard-theme',
      },
      {
        label: 'Vancouver Mist',
        theme: 'vancouver-theme',
      },
    ];
  }

  public render(): ReactNode {
    const buttons = this.createThemeButtons(this.themeButtons);

    return (
      <div
        role="menubar"
        aria-labelledby="settings-view-font-color"
      >
        {...buttons}
      </div>
    );
  }

  private createThemeButtons(buttonData: IThemeButton[]): JSX.Element[] {
    const buttons = [];

    let index = 0;
    for (const button of buttonData) {
      buttons.push(this.createThemeButton(button.label, button.theme, index));
      index += 1;
    }

    return buttons;
  }

  private createThemeButton(label: string, theme: string, key: number): JSX.Element {

    return (
      <button
        role="menuitem"
        data-theme={theme}
        title={label}
        aria-label={label}
        className={`col-xs-8 col-xs-offset-2 theme-option ${theme}`}
        onClick={this.fontThemeChanged}
        key={key}
      >{label}</button>
    );
  }

  private fontThemeChanged(event: React.MouseEvent<HTMLButtonElement>): void {
    const theme = (event.target as HTMLButtonElement).dataset.theme;
    if (!theme) {
      console.error('Font theme not set');

      return;
    }

    this.props.onFontThemeChanged(theme);
  }
}
