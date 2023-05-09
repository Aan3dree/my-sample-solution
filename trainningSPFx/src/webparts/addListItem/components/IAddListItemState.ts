import { PagedItemCollection } from "@pnp/sp/items";
import { IPessoa } from "../../../models/IPessoa";

export interface IAddListItemState {
  pagedItems: PagedItemCollection<IPessoa[] | undefined>;
  totalListItemCount: number;
  showDelModal: boolean;
  showAddEditForm: boolean;
  markedItemToDelete: number;
  markedItemToEdit: IPessoa | undefined;
}