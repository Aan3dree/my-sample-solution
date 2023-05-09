import * as React from "react";
import { useEffect, useState } from "react";
import {
    ActionButton,
    DefaultButton,
    mergeStyles,
    Panel,
    PrimaryButton,
    Stack,
    TextField,
    Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption
} from "office-ui-fabric-react";
import styles from '../AddListItem.module.scss';
import { IPessoa } from "../../../../models/IPessoa";
import { IFormModel } from "./IFormModel";
import { IFormProps } from "./IFormProps";


const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { width: 300 } };
const dropdownControlledExampleOptions = [
    //{ key: 'fruitsHeader', text: 'Fruits', itemType: DropdownMenuItemType.Header },
    { key: 'masculino', text: 'Masculino' },
    { key: 'feminino', text: 'Feminino' },
    { key: 'indefinido', text: 'Não Informar' },
  ];


export const Form = (props: IFormProps) => {
    
    const [fieldValues, setFieldValues] = useState({});
    const [selectedItem, setSelectedItem] = React.useState<IDropdownOption>();
    
    let _formData: IPessoa = {
        Title: '',
        Sobrenome: '',
        Email: '',
        Genero: '',
    };
    
    let [formData, setFormData] = useState(_formData);
    
    function _onSubmitForm(): void{
        props.handleSubmit(formData);
        console.log('Form field values', JSON.stringify(formData));
    }

    function _handleInputOnChange(event){
        setFormData({
            ...formData,
            [event.target.name]: (event.target as HTMLInputElement).value
        });
    }
    const _onChangeDropdown = (event, item: IDropdownOption): void => {
        setSelectedItem(item);
        setFormData({
            ...formData,
            [event.target
                .getAttribute('data-name')]: item.text});
        /*
        setFormData({
            ...formData,
            ['Genero']: item.text});
        */
        console.log(selectedItem);
      };

    return(
        <div className={styles.container}>
            <TextField
                label="Nome"
                name="Title"
                onChange={(e) => {_handleInputOnChange(e)}}
                value={formData == undefined ? '' : formData.Title}
            >
            </TextField>
            <TextField
                label="Sobrenome"
                name="Sobrenome"
                onChange={(e) => {_handleInputOnChange(e)}}
                value={formData == undefined ? '' : formData.Sobrenome}
            >
            </TextField>
            <TextField
                label="Email"
                name="Email"
                
                onChange={(e) => {_handleInputOnChange(e)}}
                value={formData == undefined ? '' : formData.Email}
            >
            </TextField>
            <Dropdown
                label="Gênero"
                selectedKey={selectedItem ? selectedItem.key : undefined}
                
                //onChange={_onChangeDropdown}
                onChange={(e, i)=>{
                    _onChangeDropdown(e, i);
                }}
                data-name='Genero'
                placeholder="Escola uma Opção"
                options={dropdownControlledExampleOptions}
                styles={dropdownStyles}
            />
             <PrimaryButton text='Add' onClick={() => _onSubmitForm()} />
          
        </div>
    )
}