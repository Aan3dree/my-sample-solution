import * as React from 'react';
import styles from './AccordionDataProperty.module.scss';
import { IAccordionDataPropertyProps } from './IAccordionDataPropertyProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Placeholder } from '@pnp/spfx-controls-react/lib/Placeholder';
import './myAccordion.css';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from 'react-accessible-accordion'

export interface IMyAccordionState {
  items: Array<any>,
}

export default class AccordionDataProperty extends React.Component<IAccordionDataPropertyProps, {}> {


  public render(): React.ReactElement<IAccordionDataPropertyProps> {

    let hasData: boolean = this.props.collectionData !== undefined && this.props.collectionData.length > 0;
    console.log(typeof(this.props.collectionData));
    console.log(this.props.collectionData);
    return (

      <div>
        {!hasData &&

            <Placeholder
              iconName='MusicInCollectionFill'
              iconText='Configure your web part'
              description='Create Your Data Collection'
              buttonLabel='Manage Collection'
              onConfigure={this.props.onConfigure}
            />

        }
              {hasData &&
              <div>
                <h2>{this.props.description}</h2>
              <Accordion allowZeroExpanded>
                {this.props.collectionData.map((item: any) => {
                  console.log(item);
                  return (
                    <AccordionItem>
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          {item.Title}
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p dangerouslySetInnerHTML={{__html: item.richTextField}}/>
                      </AccordionItemPanel>
                    </AccordionItem>
                  );
                })
                }
              </Accordion>
              </div>
              }

            </div>
    );
  }
}


/*
  <div className={ styles.accordionDataProperty }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>{escape(this.props.collectionData[0]['Title'].toString())}</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
              <div className={styles.row}>
                {this.props.collectionData && this.props.collectionData.map((val) => {
                  return (<div><span>{val.Title}</span><span style={{ marginLeft: 10 }}>{val.Answer}</span></div>);
                })}
              </div>
            </div>
          </div>
        </div>
      </div>


 */
