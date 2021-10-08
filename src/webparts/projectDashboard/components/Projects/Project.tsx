import * as React from 'react';
import {ProjectsState} from './ProjectsState';
import {ProjectsProps} from './ProjectsProps';
import {
    SPHttpClient,
    SPHttpClientResponse,
    SPHttpClientCommonConfiguration,
    SPHttpClientConfiguration
} from '@microsoft/sp-http';

export class Projects extends React.Component<ProjectsProps, ProjectsState>{

    constructor(props: ProjectsProps, state: ProjectsState){
        super(props);
        this.state = {
            items: [],
        }
    }

    public getItems(){
        console.log('em cima do this')
        this.props.context.spHttpClient
        .get(
            `${this.props.context.pageContext.web.absoluteUrl}/_api/web/lists/GetByTitle('Projects')/Items?$expand=ProjectManager&$select=*,ProjectManager,ProjectManager/EMail,ProjectManager/Title`,
            SPHttpClient.configurations.v1
        ).then(
            (response: SPHttpClientResponse): Promise<{ value: any[]}> => {
                return response.json();
                console.log('dentro do then')
            }
        ).then((response: { value: any[] }) => {
            var _items = [];
            _items = _items.concat(response.value);
            this.setState({
                items: _items,
            });
        });
    }

    public componentDidMount(){
        this.getItems();
    }

    public render(): React.ReactElement<ProjectsProps>{
        return(
            <div>
                {this.state.items.map((item, key) => {
                    <li key={key}>
                        <h3>{item.Title}</h3>
                    </li>
                })}
            </div>
        );
    }
}