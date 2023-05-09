import * as React from 'react';
import styles from './AddListItem.module.scss';
import { IAddListItemProps } from './IAddListItemProps';
import { IAddListItemState } from './IAddListItemState';
import { escape } from '@microsoft/sp-lodash-subset';
import { Form } from './Form/Form';
import { IPessoa } from '../../../models/IPessoa';
import { ListService } from '../../../services/ListService';

export default class AddListItem extends React.Component<
  IAddListItemProps, IAddListItemState, {}> {

  private listService: ListService;
  constructor(props: IAddListItemProps){
    super(props);
    this.state = {
      pagedItems: null,
      showDelModal: false,
      showAddEditForm: false,
      markedItemToEdit: undefined,
      markedItemToDelete: 0,
      totalListItemCount: 0,
    }
    this.listService = new ListService(props.spDataProvider, true)
  }


  private async saveListItem(customListItem: IPessoa) {
 
    //await sp.web.lists.getById(this.props.list).items.add(customListItem);
    this.listService.itemData = customListItem;
    await this.listService.save();
    await this.loadList();
    
    
  }

  public async loadList() {
    const listItemCount = await this.listService.getLisItemsCount();
    this.listService.itemsDataPaged = null;
    await this.listService.getPagedItemsOrderByID(
      5,
      this.props.filterTitle
    );
    this.setState({
      pagedItems: this.listService.itemsDataPaged
        ? this.listService.itemsDataPaged
        : undefined,
      totalListItemCount: listItemCount,
    });
  }
  
  public render(): React.ReactElement<IAddListItemProps> {
    return (
      <div className={ styles.addListItem }>
        <div className={ styles.container }>
          <Form 
            handleSubmit={(item) => this.saveListItem(item)}
          
          />

          
        </div>
      </div>
    );
  }
}
