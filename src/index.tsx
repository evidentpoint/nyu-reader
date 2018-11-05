import React from 'react';
import ReactDOM from 'react-dom';

import { NYUReader } from './nyu-reader';

let reader: NYUReader | null;
ReactDOM.render(
  <NYUReader ref={r => reader = r} initSetting={{continousScroll: true}}/>,
  document.getElementById('reader'), async () => {
    if (reader) {
      await reader.openPublication(`${location.origin}/assets/publications/metamorphosis/`);
    }
  });
