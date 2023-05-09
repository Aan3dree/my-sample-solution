import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'AddListItemWebPartStrings';
import AddListItem from './components/AddListItem';
import { IAddListItemProps } from './components/IAddListItemProps';
import { ISPDataProvider } from '../../core/Providers/ISPDataProvider';
import { DataFactory } from '../../core/Factory/DataFactory';
import { sp } from '@pnp/sp';
import "@pnp/sp/webs";

export interface IAddListItemWebPartProps {
  description: string;
  filterTitle?: string;
  list: string;
  spDataProvider: ISPDataProvider;
}

export default class AddListItemWebPart extends BaseClientSideWebPart<IAddListItemWebPartProps> {

  public onInit(): Promise<void> {
    return super.onInit().then((_) => {
      sp.setup({
        spfxContext: this.context,
      });
    });
  }
  
  public render(): void {
    const element: React.ReactElement<IAddListItemProps> = React.createElement(
      AddListItem,
      {
        description: this.properties.description,
        filterTitle: this.properties.filterTitle,
        list: this.properties.list,
        spDataProvider: DataFactory.getSPDataProvider(this.context)
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
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
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
