import React, { ReactNode } from 'react';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
// tslint:disable-next-line:no-import-side-effect
import '../../common/common.css';
// tslint:disable-next-line:no-import-side-effect
// import '../common/readium-all-modified.css';
import { SettingsViewKeyboardShortcutsTab } from './settings-view-keyboard-shortcuts-tab';
import { SettingsViewStyleTab } from './settings-view-style-tab';
// tslint:disable-next-line:no-import-side-effect
import './settings-view.css';
import { SettingsViewLayoutTab } from './settings-view-layout-tab';

export class SettingsView extends React.Component<{}, {}> {

  constructor(props: {}) {
    super(props);
  }

  public render(): ReactNode {
    return (
      <Tabs
        className="default-tabs"
      >
        <TabList>
          <Tab>Style</Tab>
          <Tab>Layout</Tab>
          <Tab>Keyboard shortcuts</Tab>
        </TabList>

        <TabPanel>
          <SettingsViewStyleTab></SettingsViewStyleTab>
        </TabPanel>
        <TabPanel>
          <SettingsViewLayoutTab />
        </TabPanel>
        <TabPanel>
          <SettingsViewKeyboardShortcutsTab></SettingsViewKeyboardShortcutsTab>
        </TabPanel>
      </Tabs>
    );
  }
}
