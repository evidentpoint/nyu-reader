// tslint:disable-next-line:no-implicit-dependencies
import { action } from '@storybook/addon-actions';
// tslint:disable-next-line:no-implicit-dependencies
import { storiesOf } from '@storybook/react';
import React from 'react';

import { NavButton } from '../src/components/nav-button';

storiesOf('NavButton', module)
  .add('Back', () => (
    <NavButton isBackButton={ true } width={ 20 }></NavButton>
  ))
  .add('Forward', () => (
    <NavButton isBackButton={ false } width = { 20 }></NavButton>
  ));
