import { ISPDataProvider } from "../../../core/Providers/ISPDataProvider";

export interface IAddListItemProps {
  description: string;
  filterTitle?: string;
  list: string;
  spDataProvider: ISPDataProvider;
}
