// tslint:disable-next-line:no-implicit-dependencies
import { action } from '@storybook/addon-actions';
// tslint:disable-next-line:no-implicit-dependencies
import { storiesOf } from '@storybook/react';
// tslint:disable-next-line:no-import-side-effect
import 'normalize.css';
import React from 'react';

import { AppBar } from '../src/components/app-bar';
import { NavButton } from '../src/components/nav-button';
import { SettingsView } from '../src/pages/app-bar/settings-view/settings-view';

storiesOf('NavButton', module)
  .add('Back', () => (
    <NavButton isBackButton={ true } width={ 20 }></NavButton>
  ))
  .add('Forward', () => (
    <NavButton isBackButton={ false } width = { 20 }></NavButton>
  ));

storiesOf('AppBar', module)
  .add('Back', () => (
  <AppBar title={ 'Book Title' }></AppBar>
  ));

storiesOf('Reader Settings', module)
  .add('Default', () => {

    const style = {
      height: '568px',
      width: '478px',
    };

    return (
    <div
      style={style}
    >
      <SettingsView></SettingsView>
    </div>
  ); });
