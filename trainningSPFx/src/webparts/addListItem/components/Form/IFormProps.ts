import { IPessoa } from "../../../../models/IPessoa";

export interface IFormProps{
    
    handleSubmit?(pessoa: IPessoa): void;
}