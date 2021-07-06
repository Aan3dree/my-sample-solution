import * as React from 'react';
import styles from './SampleWebpart.module.scss';
import { ISampleWebpartProps } from './ISampleWebpartProps';
import { escape } from '@microsoft/sp-lodash-subset';
import Button from './Button'

export default class SampleWebpart extends React.Component<ISampleWebpartProps, {}> {
  public render(): React.ReactElement<ISampleWebpartProps> {
    return (

      <div className={ styles.sampleWebpart }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Hello SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
              <Button name={'Aqui'} />
            </div>
          </div>
        </div>
        <div>
          <h1>
            Hello World
          </h1>
        </div>
      </div>
      
    );
  }
}
