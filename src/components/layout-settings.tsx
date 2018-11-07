import React, { ReactNode, ChangeEvent } from 'react';
import { IncrementalInput } from './common/incremental-input';
import { ReadingStateContext } from '../reading-state-ctx';
import { RadioGroup, Radio } from './common/radio-group';

export class LayoutSettings extends React.Component<{}, {}> {

  public constructor(props: {}) {
    super(props);
  }

  public render(): ReactNode {

    return (
      <div>
        <ReadingStateContext.Consumer>
        { ({actions, data}) => (
          <React.Fragment>
            <h5>Column Gap</h5>
            <IncrementalInput
              value={ data.columnGap }
              step={10}
              onNumberUpdated={actions.setColumnGap}
            />
            <h5>Spread Mode</h5>
            <RadioGroup
              id="spread-mode"
              selectedValue={data.spreadMode}
              onChange={
                (event: ChangeEvent<HTMLInputElement>) => {
                  const spreadMode = event.target.value;

                  actions.setSpreadMode(spreadMode);
                }
              }
            >
              <Radio value="single">Single</Radio>
              <Radio value="double">Double</Radio>
            </RadioGroup>
          </React.Fragment>
        )}
        </ReadingStateContext.Consumer>
      </div>
    );
  }
}
