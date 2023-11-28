import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BaseClientSideWebPart, IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-webpart-base';
import { Version } from '@microsoft/sp-core-library';
import * as strings from 'VideoPlayerWebPartStrings';

export interface IYourWebPartProps {
  videoUrl: string;
}

export default class YourWebPart extends BaseClientSideWebPart<IYourWebPartProps> {
  public render(): void {
    const videoUrl = this.properties.videoUrl;

    const videoThumbnail = (
      <a href={videoUrl} target="_blank" rel="noopener noreferrer">
        <img src={videoUrl + '?thumbnail'} alt="Video Thumbnail" />
      </a>
    );

    ReactDOM.render(videoThumbnail, this.domElement);
  }

}
