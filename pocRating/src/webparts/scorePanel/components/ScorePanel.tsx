import * as React from 'react';
import styles from './ScorePanel.module.scss';
import { IScorePanelProps } from './IScorePanelProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { TextField } from 'office-ui-fabric-react';
import { Rating, RatingSize } from 'office-ui-fabric-react/lib/Rating';
import { PrimaryButton } from 'office-ui-fabric-react/lib/components/Button';
import { Stack } from 'office-ui-fabric-react/lib/components/Stack';
import { HighContrastSelectorWhite } from 'office-ui-fabric-react/lib/Styling';

export default class ScorePanel extends React.Component<IScorePanelProps, {}> {
  public render(): React.ReactElement<IScorePanelProps> {
    return (
      <div className={ styles.scorePanel }>
        <div className={ styles.container }>
          <div className='ms-fontSize-24'>
            <Stack horizontal>
              <TextField label='Rating' styles={{ fieldGroup: { width: 100, color: HighContrastSelectorWhite } }} />
              <Rating 
                label='Rating'
                min={1}
                max={5}
                size={RatingSize.Large}
                rating={3}
                getAriaLabel={this._getRatingComponentAriaLabel}
                ariaLabelFormat={'{0} of {1} stars selected'}
              />
            </Stack>
            <div className={styles.row}><PrimaryButton
              data-automation-id="test"
              disabled={false}
              text="Save"
              iconProps={{ iconName: 'Save' }}
              allowDisabledFocus={true}
            /></div>
            </div>
        </div>
      </div>
    );
  
  }

  private _getRatingComponentAriaLabel(rating: number, maxRating: number): string {
    return `Rating value is ${rating} of ${maxRating}`;
  }
}
