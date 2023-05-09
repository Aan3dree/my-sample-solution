import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'AccordionDataPropertyWebPartStrings';
import AccordionDataProperty from './components/AccordionDataProperty';
import { IAccordionDataPropertyProps } from './components/IAccordionDataPropertyProps';

import { PropertyFieldCollectionData, CustomCollectionFieldType } from '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { RichText } from '@pnp/spfx-controls-react/lib/RichText';
import styles from './components/AccordionDataProperty.module.scss';
import paneStyles from './components/PropertyFieldCollectionDataHost.module.scss';

export interface IAccordionDataPropertyWebPartProps {
  description: string;
  collectionData: any[];
  onConfigure: () => void;
}



export default class AccordionDataPropertyWebPart extends BaseClientSideWebPart <IAccordionDataPropertyWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IAccordionDataPropertyProps> = React.createElement(
      AccordionDataProperty,
      {
        description: this.properties.description,
        collectionData: this.properties.collectionData,
        onConfigure: () => {
          this.context.propertyPane.open();
        },
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

  // private onTextChange = (newText: string) => {
  //   this.properties.myRichText = newText;
  //   return newText;
  // }

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
                PropertyFieldCollectionData("collectionData", {
                  panelClassName: paneStyles.collectionData,
                  key: "collectionData",
                  label: "Collection data",
                  panelHeader: "Collection data panel header",
                  manageBtnLabel: "Manage collection data",
                  value: this.properties.collectionData,
                  fields: [
                    {
                      id: "Title",
                      title: "Question",
                      type: CustomCollectionFieldType.string,
                      required: true
                    },
                    // {
                    //   id: "Answer",
                    //   title: "Answer",
                    //   type: CustomCollectionFieldType.string
                    // },
                    // {
                    //   id: "multilineField",
                    //   title: "Multi Line Custom Field",
                    //   type: CustomCollectionFieldType.custom,
                    //   onCustomRender: (field, value, onUpdate, item, itemId, onError) => {
                    //     return (
                    //       React.createElement("div", null,
                    //         React.createElement("textarea", { key: itemId, value: value, onChange: (event: React.FormEvent<HTMLInputElement>) => {
                    //           onUpdate(field.id, event.currentTarget.value);
                    //           if (event.currentTarget.value === "error") {
                    //             onError(field.id, "Value shouldn't be equal to error");
                    //           } else {
                    //             onError(field.id, "");
                    //           }
                    //         }}),
                    //       )
                    //     );
                    //   }
                    // },
                    {
                      id: "richTextField",
                      title: "Rich Custom Field",
                      type: CustomCollectionFieldType.custom,
                      placeholder: 'Click to Add text',
                      onCustomRender: (field, value, onUpdate, item, itemId, onError) => {
                        return (
                          React.createElement(RichText, {
                            key: itemId,
                            value: value,
                            styleOptions: {
                              showMore: true
                            },
                            className: styles.input,
                            onChange: (text: string) => {
                                console.log(item);
                                onUpdate(field.id, text);
                                return text;

                            // onUpdate(field.id, event.currentTarget.value);
                            // if (event.currentTarget.value === "error") {
                            //   onError(field.id, "Value shouldn't be equal to error");
                            // } else {
                            //   onError(field.id, "");
                            // }
                          }})

                        );
                      }
                    },
                  //   {
                  //     id: "customFieldPeople",
                  //     title: "People picker",
                  //     type: CustomCollectionFieldType.custom,
                  //     onCustomRender: (field, value, onUpdate, item, itemId, onError) => {
                  //         return (
                  //             React.createElement(PeoplePicker, {
                  //                 context: this.context,
                  //                 personSelectionLimit: 1,
                  //                 showtooltip: true,
                  //                 key: itemId,
                  //                 defaultSelectedUsers: [item.customFieldId],
                  //                 selectedItems: (items: any[]) => {
                  //                     console.log('Items:', items);
                  //                     item.customFieldId = items[0].secondaryText;
                  //                     onUpdate(field.id, items[0].secondaryText);
                  //                 },
                  //                 showHiddenInUI: false,
                  //                 principalTypes: [PrincipalType.User]
                  //             }
                  //             )
                  //         );
                  //     }
                  // }
                  ],
                  disabled: false
                },)
              ]
            }
          ]
        }
      ]
    };
  }
}
