import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart, WebPartContext } from '@microsoft/sp-webpart-base';

import * as strings from 'AddItemWebPartStrings';
import AddItem from './components/AddItem';
import { IAddItemProps } from './components/IAddItemProps';
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import {setup as pnpSetup} from '@pnp/common'



export interface IAddItemWebPartProps {
  description: string;
  context: WebPartContext;
  listName: string;
  lists: string;
}


export default class AddItemWebPart extends BaseClientSideWebPart<IAddItemWebPartProps> {


  protected onInit(): Promise<void>{
    return super.onInit().then(_ =>{

      pnpSetup({
        spfxContext: this.context
      })
    })
  }

  public render(): void {
    const element: React.ReactElement<IAddItemProps> = React.createElement(
      AddItem,
      {
        description: this.properties.description,
        context: this.properties.context,
        listName: this.properties.listName,
        lists: this.properties.lists
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }



  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('listName', {
                  label: "Lista"
                }),
                PropertyFieldListPicker('lists', {
                  label: 'Select a list',
                  selectedList: this.properties.lists,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'listPickerFieldId'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
