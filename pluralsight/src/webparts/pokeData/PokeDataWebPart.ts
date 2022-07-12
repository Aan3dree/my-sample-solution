import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './PokeDataWebPart.module.scss';
import * as strings from 'PokeDataWebPartStrings';
import * as $ from 'jquery';

import {
  HttpClient,
  HttpClientResponse
} from '@microsoft/sp-http';

export interface IPokeDataWebPartProps {
  description: string;
  pokeName: string;

}

export default class PokeDataWebPart extends BaseClientSideWebPart<IPokeDataWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.pokeData }">
        <div class="${ styles.container }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">
              <span class="${ styles.title }">Welcome to SharePoint!</span>
              <p class="${ styles.subTitle }">Customize SharePoint experiences using Web Parts.</p>
              <p class="${ styles.description }">${escape(this.properties.description)}</p>
              <a href="https://aka.ms/spfx" onclick="_getpoke()" class="${ styles.button }">
                <span class="${ styles.label }">Click</span>
              </a>
              <p class="${ styles.row }"></p>
            </div>
          </div>
        </div>
      </div>`;
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
