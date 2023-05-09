import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'GetListsOfListsWebPartStrings';
import GetListsOfLists from './components/GetListsOfLists';
import { IGetListsOfListsProps } from './components/IGetListsOfListsProps';

import { SPHttpClient, SPHttpClientResponse} from '@microsoft/sp-http';

export interface IGetListsOfListsWebPartProps {
  description: string;
}

export interface ISPList {
  listTitle: string;
  listId: string;
}

export interface ISPLists {
  value: ISPList[];
}

export default class GetListsOfListsWebPart extends BaseClientSideWebPart <IGetListsOfListsWebPartProps> {

  private _getListsOfLists(): Promise<ISPLists> {
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists`, SPHttpClient.configurations.v1).then((res: SPHttpClientResponse) => {
      let response = res.json();
      console.log(response);
      return response;

    })
  }

  public render(): void {
    this._getListsOfLists();
    const element: React.ReactElement<IGetListsOfListsProps> = React.createElement(
      GetListsOfLists,
      {
        description: this.properties.description
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
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
