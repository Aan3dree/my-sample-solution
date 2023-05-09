import * as React from 'react';
import styles from './ReadSiteProperties.module.scss';
import { IReadSitePropertiesProps } from './IReadSitePropertiesProps';
import { escape } from '@microsoft/sp-lodash-subset';



export default class ReadSiteProperties extends React.Component<IReadSitePropertiesProps, {}> {

componentDidMount(): void {
   console.log('montou') ;

}
  public render(): React.ReactElement<IReadSitePropertiesProps> {
    return (
      <div className={ styles.readSiteProperties }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Absolute Url: {escape(this.props.siteUrl)}</p>
              <p className={ styles.subTitle }>Site Title: {escape(this.props.siteTitle)}</p>
              <p className={ styles.subTitle }>Relative Url: {escape(this.props.relativeUrl)}</p>
              <p className={ styles.subTitle }>User Display Name: {escape(this.props.userDisplayName)}</p>
              <p className={ styles.description }>Description: {escape(this.props.description)}</p>
              <p className={ styles.description }>Enviroment: {this.props.enviroment}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
