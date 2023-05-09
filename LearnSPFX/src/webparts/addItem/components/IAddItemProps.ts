import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IAddItemProps {
  description: string;
  context: WebPartContext;
  listName: string;
  lists: string; // Stores the list ID(s)
}
