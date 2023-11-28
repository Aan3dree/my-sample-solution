import * as React from 'react';
import styles from './PropertyBagRating.module.scss';
import { IPropertyBagRatingProps } from './IPropertyBagRatingProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { sp } from '@pnp/sp/presets/all';
import { WebPartContext } from '@microsoft/sp-webpart-base';



export interface IPropertyBagRatingState {
  voted: boolean;
  rating: number;
}


export default class PropertyBagRating extends React.Component<IPropertyBagRatingProps, IPropertyBagRatingState> {

  constructor(props: IPropertyBagRatingProps) {
    super(props);

    this.state = {
      voted: false,
      rating: 0
    };
  }

  componentDidMount(): void {
      this.fetchRating();
  }

  fetchRating = async () => {
    try {
      const pageId = this.props.context.pageContext.listItem.id;
      const pageProperties = await sp.web.lists.getByTitle("SitePages").items.getById(pageId)
      .configure({
        headers: {
          'Accept': 'application/json;odata=nometadata',
          'odata-version': ''
        }
      })
      .get();

      if (pageProperties && pageProperties.Rating) {
        const rating = parseFloat(pageProperties.Rating || 0);
        this.setState({ rating});
      }
    } catch (e) {
      console.log('Error fetching rating: ', e);
    }
  }

  handleStarClick = async (rating: number) => {
    try {
      if (this.state.voted) {
        return;
      }

      const pageId = this.props.context.pageContext.listItem.id;

      const pageProperties = {
        Rating: rating
      };

      await sp.web.lists.getByTitle("SitePages").items.getById(pageId).update(pageProperties);

      this.setState({ voted: true, rating });
    } catch (e) {
      console.log('Error submitting vote: ', e);
    }
  }

  renderStars = () => {
    const { voted, rating } = this.state;

    if (voted) {
      return <div>You rated {rating} stars.</div>
    }

    return (
      <div>
        {[1, 2, 3, 4, 5].map(star => (
          <span
            key={star}
            onClick={() => this.handleStarClick}
            style={{ cursor: 'pointer' }}
          >
            {star} stars
          </span>
        ))}
      </div>
    );
  }

  render() {
    return (
      <div>
        <h2>Star Rating</h2>
        {this.renderStars()}
      </div>
    );
  }
}


/**
 * public render(): React.ReactElement<IPropertyBagRatingProps> {
    return (
      <div className={ styles.propertyBagRating }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
 */