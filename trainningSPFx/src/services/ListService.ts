import { PagedItemCollection } from "@pnp/sp/items/types";
import { BaseServices } from "../core/Services/BaseService";
import { IPessoa } from "../models/IPessoa";

export class ListService extends BaseServices{

    public itemData: IPessoa;
    public itemsData: Array<IPessoa> = [];
    public listInternalName: string = "Pessoas";
    public itemsDataPaged: PagedItemCollection<IPessoa[]>

    public async getPagedItemsOrderByID(top: number, filterTitle?: string): Promise<void> {
        const filterCriteria =
        filterTitle === "" || filterTitle === undefined
          ? `Title ne ''`
          : `startswith(Title,${filterTitle})`;
        this.itemsDataPaged = await this.spDataProvider.spList.getItemsPaged(this.listRelativeUrl, top, filterCriteria, true, "ID", this._rootWeb);
    }

    public async getLisItemsCount(): Promise<number> {
        return await this.spDataProvider.spList.getListItemsCount(this.listRelativeUrl, true);
    }

    public async getNextPageItems(total: number): Promise<void> {
        if (this.itemsDataPaged.hasNext && total > (this.itemsDataPaged.results.length)) {
          let atualResults = this.itemsDataPaged.results;
          this.itemsDataPaged = await this.itemsDataPaged.getNext();
          Array.prototype.push.apply(atualResults, this.itemsDataPaged.results);
          this.itemsDataPaged.results = atualResults;
        }
    }

    public async deleteCustomListItem(itemID: number):Promise<void>{
        await this.spDataProvider.spList.delete(itemID,this.listRelativeUrl, true );
    }
}
