import * as React from 'react';
import styles from './Accordion.module.scss';
import { IMyAccordionProps } from './IMyAccordion';
import { escape } from '@microsoft/sp-lodash-subset';
import {
  Dropdown, IDropdownOption,
} from 'office-ui-fabric-react';
import { sp } from '@pnp/sp';
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
  //section: Array<any>,
  section: any
}




export default class MyAccordion extends React.Component<IMyAccordionProps, IMyAccordionState> {

  private StatusDropdownOption: IDropdownOption[] = [];

  constructor(props: IMyAccordionProps, state: IMyAccordionState) {
    super(props);
    this.BindDropdown = this.BindDropdown.bind(this);
    this.onStatusChanged = this.onStatusChanged.bind(this);
    this.state = {
      items: new Array<any>(),
      //section: new Array<any>(),
      section: ''
    };
    this.getListItems();
  }


  private getListItems(): void {
    if (typeof this.props.listId !== "undefined" && this.props.listId.length > 0) {
      sp.web.lists.getById(this.props.listId).items.select("Title", "Content", "Section").getAll()
      .then((results: Array<any>) => {
        this.setState({
          items: results,
          //section: items.Section
        });
      })
      .catch((error: any) => {
        console.log("Failed to get list items");
        console.log(error);
      });
    }
  }

  public async getChoiceFieldOptions (listId: string, fieldInternalName: string): Promise<{key: string, text: string} []> {
    let fieldOptions: {key: string, text: string} [] = [];
    try {
      console.log("entrou no try");
      const results = await sp.web.lists.getById(this.props.listId)
        .fields
        .getByInternalNameOrTitle(fieldInternalName)
        .select("Title", "InternalName", "Choices")
        .get();
      if(results && results.Choices.length > 0) {
        for (const option of results.Choices) {
          fieldOptions.push({
            key: option,
            text: option
          })
        }
      }
    } catch (e) {

      return Promise.reject(e);

    }
    return fieldOptions;
  }

  private async BindDropdown() {
    this.StatusDropdownOption = await this.getChoiceFieldOptions( this.props.listId, "Section");
    //console.log("bind dropdown");
  }

  public onStatusChanged = (event ,option: IDropdownOption): void => {
    this.setState({
      section: option.key
    })
    console.log(option);
  }

  public componentDidUpdate(prevProps: Readonly<IMyAccordionProps>): void {
      if(prevProps.listId !== this.props.listId){
        this.getListItems()
      }
      this.BindDropdown
  }



  public async  componentDidMount(){
    await this.BindDropdown();
  }

  public render(): React.ReactElement<IMyAccordionProps> {
    let listSelected: boolean = typeof this.props.listId !== "undefined" && this.props.listId.length > 0;
    let selectedSection: string = this.state.section;
    return (
      <div>
        <Dropdown
                id='ddlStatus'
                label={'Section'}
                options={this.StatusDropdownOption}
                placeholder={'Select Section'}
                onChange={this.onStatusChanged} />
                <div>
                  {this.state.items.filter((item) => item.Section === selectedSection).map((item: any) => console.log(item))}
                </div>
       <div className={ styles.accordion }>
          {!listSelected &&
            <Placeholder
              iconName='MusicInCollectionFill'
              iconText='Configure your web part'
              description='Select a list'
              buttonLabel='Choose a List'
              onConfigure={this.props.onConfigure}
            />
          }
          {listSelected &&
            <div>
              <h2>{this.props.accordionTitle}</h2>
              <Accordion allowZeroExpanded>
                {this.state.items.filter((item) => item.Section === selectedSection).map((item: any) => {
                  return (
                    <AccordionItem>
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          {item.Title}
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p dangerouslySetInnerHTML={{__html: item.Content}}/>
                      </AccordionItemPanel>
                    </AccordionItem>
                  );
                })
                }
              </Accordion>
            </div>
          }

        </div>
      </div>

    );
  }
}

/*

<div className={ styles.accordion }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.accordionTitle)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
*/
