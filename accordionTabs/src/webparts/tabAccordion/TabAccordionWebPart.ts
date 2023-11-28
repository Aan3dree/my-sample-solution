import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, Guid } from '@microsoft/sp-core-library';
import { BrowserUtilities } from '@microsoft/sp-core-library/lib-commonjs/BrowserUtilities';
import {
  BaseClientSideWebPart,
  IWebPartPropertiesMetadata,
  WebPartContext
} from '@microsoft/sp-webpart-base';


import {
  IPropertyPaneConfiguration,
  PropertyPaneDropdown,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';



import * as strings from 'TabAccordionWebPartStrings';
import Tab from './components/CTab';
import { ICTabProps } from './components/ICTabProps';
import Accordion from './components/CAccordion';
import { ICAccordionProps } from './components/ICAccordionProps';
import { SPComponentLoader } from '@microsoft/sp-loader';
import 'tinymce';

export interface ITabAccordionWebPartProps {
  tabs: any[]; 
  type: string;
  title: string;
  accordion:boolean;
  tabContent: string;
}

const parentElement = document.querySelector('.accordion__body_d97ffd81');
const sharePointEventListeners = [];

export default class TabAccordionWebPart extends BaseClientSideWebPart<ITabAccordionWebPartProps> {
  private propertyFieldCollectionData;
  private customCollectionFieldType;
  private guid: string;
  private isMobile: boolean;
  

  private fixAllZIndex = () => {

    // Adjust z-index for web part zones
    let zIndexContainer = document.querySelectorAll(".CanvasZoneContainer");
  
    let zIndex = zIndexContainer.length;
  
    /*
    zIndexContainer.forEach((elem, index) => {
  
      (<HTMLElement>elem).style.zIndex = (zIndex - index).toString();
  
    });
    */
  
    // Adjust z-index for web parts
    let zIndexControlZone = document.querySelectorAll(".ControlZone");
  
    zIndex = zIndexControlZone.length*5;
  
    zIndexControlZone.forEach((elem, index) => {
  
      (<HTMLElement>elem).style.zIndex = (zIndex - index).toString();
      (<HTMLElement>elem).style.position = "relative";
  
    });
  
  }


  // ...
  protected get propertiesMetadata(): IWebPartPropertiesMetadata {
    return {
      'title': { isSearchablePlainText: true },
      'tabContent': { isHtmlString: true }
    };
  }
  // ...

  /**
   * @function
   * Web part contructor.
   */
  public constructor(context?: WebPartContext) {
    super();

    //Initialize unique GUID
    this.guid = Guid.newGuid().toString();

    this.isMobile = BrowserUtilities.isMobileBrowser();

    //Hack: to invoke correctly the onPropertyChange function outside this class
    //we need to bind this object on it first
    this.onPropertyPaneFieldChanged = this.onPropertyPaneFieldChanged.bind(this);
  }
  
  

  public render(): void {

    this.properties.tabContent = "";

    this.properties.tabs.map((tab: any, tabindex: number) => {
      this.properties.tabContent += tab.Title + "," + tab.Content + "|";
    });
    
    const elementTab: React.ReactElement<ICTabProps > = React.createElement(
      Tab,
      {        
        tabs: this.properties.tabs, 
        displayMode: this.displayMode,
        guid: this.guid,
        title:this.properties.title,
        fUpdateProperty: (value: string) => {
          this.properties.title = value;
        },
      }
    );

    const elementAccordion: React.ReactElement<ICAccordionProps > = React.createElement(
      Accordion,
      {        
        tabs: this.properties.tabs, 
        displayMode: this.displayMode,
        guid: this.guid,
        title: this.properties.title,
        accordion:this.properties.accordion,
        fUpdateProperty: (value: string) => {
          this.properties.title = value;
        },
      }
    );

    if(this.isMobile)
    {
      ReactDom.render(elementAccordion, this.domElement);
    }
    else 
    {
      if(this.properties.type == "Accordion")
      {
        ReactDom.render(elementAccordion, this.domElement);
      }
      else
      {
        ReactDom.render(elementTab, this.domElement);
      }
    }
    //this.fixAllZIndex();

  
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  //executes only before property pane is loaded.
  protected async loadPropertyPaneResources(): Promise<void> {
    // import additional controls/components
    const { PropertyFieldCollectionData, CustomCollectionFieldType } = await import (
      /* webpackChunkName: 'pnp-propcontrols-colldata' */
      '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData'
    );

    

    this.propertyFieldCollectionData = PropertyFieldCollectionData;
    this.customCollectionFieldType = CustomCollectionFieldType;
  }

/**
   * @function
   * PropertyPanel settings definition
   */
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          displayGroupsAsAccordion: true,
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneDropdown('type', {
                  label: strings.Type,
                  disabled: false,                   
                  options: [
                    {key: 'Accordion', text: 'Acordeon'},
                    {key: 'Tab', text: 'Abas'}
                  ]
                }),  
                this.propertyFieldCollectionData("tabs", {
                  key: "tabs",
                  panelHeader: strings.ManageAccordion,
                  manageBtnLabel: strings.ManageAccordion,
                  saveBtnLabel: strings.SaveBtnLabel,
                  saveAndAddBtnLabel: strings.SaveAndAddBtnLabel,
                  cancelBtnLabel: strings.CancelBtnLabel,
                  value: this.properties.tabs,
                  enableSorting: true,
                  fields: [
                    {
                      id: "Title",
                      title: strings.TitleFieldLabel,
                      type: this.customCollectionFieldType.string,
                      required: true
                    }
                  ]
                }),                           
              ],             
            },            
          ]
        }
      ]
    };
  }
}