import React, { ReactNode, ChangeEvent } from 'react';
import { IncrementalInput } from './common/incremental-input';
import { ReadingStateContext } from '../reading-state-ctx';
import { RadioGroup, Radio } from './common/radio-group';

export interface IFontSettingsProps {
}

export class FontSettings extends React.Component<IFontSettingsProps, {}> {

  public constructor(props: IFontSettingsProps) {
    super(props);
  }

  public render(): ReactNode {

    return (
      <div>
        <ReadingStateContext.Consumer>
        { ({actions, data}) => (
          <React.Fragment>
            <IncrementalInput
              value={ data.fontSize }
              step={10}
              onNumberUpdated={actions.setFontSize}
            />
            <RadioGroup
              id="reading-mode"
              selectedValue={data.readingMode}
              onChange={
                (event: ChangeEvent<HTMLInputElement>) => {
                  const readingMode = event.target.value;

                  actions.setReadingMode(readingMode);
                }
              }
            >
              <Radio value="">Default</Radio>
              <Radio value="readium-sepia-on">Sepia</Radio>
              <Radio value="readium-night-on">Night</Radio>
            </RadioGroup>
          </React.Fragment>
        )}
        </ReadingStateContext.Consumer>
      </div>
    );
  }
}
