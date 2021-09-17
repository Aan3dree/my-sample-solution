import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider,
  
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import { DisplayMode, Environment, EnvironmentType } from '@microsoft/sp-core-library';
import styles from './JsWebPartWebPart.module.scss';
import * as strings from 'JsWebPartWebPartStrings';

export interface IJsWebPartWebPartProps {
  description: string;
  myContinent: string;
  numContinentsVisited: number;
}

export default class JsWebPartWebPart extends BaseClientSideWebPart<IJsWebPartWebPartProps> {

  public render(): void {

    

    this.context.statusRenderer.clearLoadingIndicator(this.domElement);

    const pageMode: string = (this.displayMode === DisplayMode.Edit)
      ? 'You are in edit mode'
      : 'You are in read mode';

    const envType: string = (Environment.type === EnvironmentType.Local)
      ? 'You are in local environment'
      : 'Tiy are in SharePoint environment'

    const siteTitle: string = this.context.pageContext.web.title;

    this.context.statusRenderer.displayLoadingIndicator(this.domElement, 'Carregando..');
    setTimeout(() => {
      this.context.statusRenderer.clearLoadingIndicator(this.domElement);
    

    this.domElement.innerHTML = `
      <div class="${ styles.jsWebPart }">
        <div class="${ styles.container }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">
              <span class="${ styles.title }">Welcome to SharePoint!</span>
              <p class="${ styles.subTitle }"><b>Site Title:</b> ${siteTitle}</p>
              <p class="${ styles.subTitle }"><b>Page mode: </b> ${pageMode}</p>
              <p class="${ styles.subTitle }"><b>Enviroment: </b>${envType}</p>
              <p class="${ styles.subTitle }">Customize SharePoint experiences using Web Parts.</p>
              <p class="${ styles.description }">${escape(this.properties.description)}</p>
              <p class="${ styles.description }">Continent where I reside: ${escape(this.properties.myContinent)}</p>
              <p class="${ styles.description }">Number of continents I've visited: ${this.properties.numContinentsVisited}</p>
              <a href="#" class="${ styles.button }">
                <span class="${ styles.label }">Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>`;

    this.domElement.getElementsByClassName(`${ styles.button }`)[0]
      .addEventListener('click',(event: any)=>{
        event.preventDefault();
        alert('Bem vindo ao SPFX');
      });
    }, 5000)  

  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  private validateContinents(textboxValue: string): string{
    const validContinentOptions: string[] = ['africa', 'antartica', 'asia', 'ocean', 'europe', 'north america', 'south america', 'central america'];
    const inputToValidate: string = textboxValue.toLocaleLowerCase();

    return (validContinentOptions.indexOf(inputToValidate) === -1)
      ? 'Invalid continent entry; valid options are "Africa", "Antarctica", "Asia", "Australia", "Europe", "North America", and "South America"'
      : '';
  }

  private _customFieldRender(elem: HTMLElement): void {
    elem.innerHTML = '<div><h1>This is a custom field</h1></div>'
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('myContinent', {
                  label: 'Continent where I currenty reside',
                  onGetErrorMessage: this.validateContinents.bind(this)
                }),
                PropertyPaneSlider('numContinentsVisited', {
                  label: 'Number of continents I\'ve visited',
                  min: 1, max: 7, showValue: true,
                }),
                
               
              ]
            }
          ]
        }
      ]
    };
  }
}
