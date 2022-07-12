import * as React from 'react';
import { ProjectsProps } from './ProjectsProps';
import { ProjectsState } from './ProjectsState';
import {
    SPHttpClient,
    SPHttpClientResponse,
    ISPHttpClientOptions
} from '@microsoft/sp-http';

export class Projects extends React.Component<ProjectsProps, ProjectsState>{
    constructor(props: ProjectsProps, state: ProjectsState){
        super(props);
        this.state = {
            items: [],
        };
    }

    public getItems(){
        this.props.context.spHttpClient
        .get(
            `${this.props.context.pageContext.web.absoluteUrl}/_api/web/lists/GetByTitle('Projects')/Items?$expand=ProjectManager&$select=*,ProjectManager,ProjectManager/EMail,ProjectManager/Title`,
            SPHttpClient.configurations.v1
        )
        .then(
            (res: SPHttpClientResponse): Promise<{ value: any[] }> => {
                console.log(res);
                return res.json();
            }
        )
        .then(
            (res: {value: any[]}) => {
                var _items = [];
                _items = _items.concat(res.value);
                this.setState({
                    items: _items
                });
                console.log(_items);
            }
        );
    }

    public componentDidMount(){
        this.getItems();
    }

    public render(): React.ReactElement<ProjectsProps>{
        return (
            <div>
                <div>
                    {this.state.items.map((item, key) => {
                        <ul>
                            <li key={key}>
                                <h3>{item.Title}</h3>
                            </li>
                        </ul>
                    })}
                </div>
            </div>
        )
    }
}