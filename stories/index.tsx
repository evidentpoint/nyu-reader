// tslint:disable-next-line:no-implicit-dependencies
import { action } from '@storybook/addon-actions';
// tslint:disable-next-line:no-implicit-dependencies
import { storiesOf } from '@storybook/react';
import React from 'react';

storiesOf('Button', module)
  .add('with text', () => (
    <div onClick={action('clicked')}>Hello Button</div>
  ))
  .add('with some emoji', () => (
    <div onClick={action('clicked')}><span role="img" aria-label="so cool">😀 😎 👍 💯</span></div>
  ));
