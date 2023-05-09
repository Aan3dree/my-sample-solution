import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'ReadSitePropertiesWebPartStrings';
import ReadSiteProperties from './components/ReadSiteProperties';
import { IReadSitePropertiesProps } from './components/IReadSitePropertiesProps';

import { Environment, EnvironmentType} from '@microsoft/sp-core-library'

export interface IReadSitePropertiesWebPartProps {
  description: string;
  enviromentType: string;
}

export default class ReadSitePropertiesWebPart extends BaseClientSideWebPart <IReadSitePropertiesWebPartProps> {

  private _findEnvType(): void {
    if (Environment.type === EnvironmentType.Local) {
      this.properties.enviromentType = 'Local Workbench'
    } else if(Environment.type === EnvironmentType.SharePoint || Environment.type === EnvironmentType.ClassicSharePoint) {
      this.properties.enviromentType = 'Online SharePoint'
    } else if(Environment.type === EnvironmentType.Test) {
      this.properties.enviromentType = 'Test'
    }
  }

  public render(): void {
    this._findEnvType();

    const element: React.ReactElement<IReadSitePropertiesProps> = React.createElement(
      ReadSiteProperties,
      {
        description: this.properties.description,
        siteUrl: this.context.pageContext.web.absoluteUrl,
        siteTitle: this.context.pageContext.web.title,
        relativeUrl: this.context.pageContext.web.serverRelativeUrl,
        userDisplayName: this.context.pageContext.user.displayName,
        enviroment: this.properties.enviromentType
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
