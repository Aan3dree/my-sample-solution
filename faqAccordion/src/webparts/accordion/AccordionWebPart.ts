import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { sp } from '@pnp/sp';
import 'core-js/es6/array';
import 'es6-map/implement';
import 'core-js/modules/es6.array.find';
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';
//import { PropertyFieldColumnPicker, PropertyFieldColumnPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldCol';

import * as strings from 'AccordionWebPartStrings';
import Accordion from './components/MyAccordion';
import { IMyAccordionProps } from './components/IMyAccordion';
import {string} from 'prop-types';

export interface IAccordionWebPartProps {
  listId: string;
  accordionTitle: string;
  section: string;
}

export interface IFieldPickerProps {
  list: string;
  column: string;
  multiColumn: string;
}

export default class AccordionWebPart extends BaseClientSideWebPart <IAccordionWebPartProps> {

  public onInit(): Promise<void> {
    return super.onInit().then(_ => {
      sp.setup({
        spfxContext: this.context
      });
    });
  }

  public render(): void {
    const element: React.ReactElement<IMyAccordionProps> = React.createElement(
      Accordion,
      {
        listId: this.properties.listId,
        accordionTitle: this.properties.accordionTitle,
        onConfigure: () => {
          this.context.propertyPane.open();
        }
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
                PropertyPaneTextField('accordionTitle', {
                  label: 'Accordion Title (optional)'
                }),
                PropertyFieldListPicker('listId', {
                  label: 'Select a list',
                  selectedList: this.properties.listId,
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
