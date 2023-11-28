import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'VideoPlayerWebPartStrings';
import VideoPlayer from './components/VideoPlayer';
import { IVideoPlayerProps } from './components/IVideoPlayerProps';

export interface IVideoPlayerWebPartProps {
  videoUrl: string;
}

export default class VideoPlayerWebPart extends BaseClientSideWebPart <IVideoPlayerWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IVideoPlayerProps> = React.createElement(
      VideoPlayer,
      {
        videoUrl: this.properties.videoUrl
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
                PropertyPaneTextField('videoUrl', {
                  label: strings.DescriptionFieldLabel
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
