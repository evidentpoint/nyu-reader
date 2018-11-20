import React from 'react';
import ReactDOM from 'react-dom';

import { NYUReader } from './nyu-reader';

let reader: NYUReader | null;
ReactDOM.render(
  <NYUReader ref={r => reader = r} initSetting={{ continousScroll: false }}/>,
  document.getElementById('reader'), async () => {
    if (reader) {
      // tslint:disable-next-line:max-line-length
      await reader.openPublication(`${location.origin}/assets/publications/metamorphosis/manifest.json`);
    }
  });
