import * as React from 'react';
import {ProjectsState} from './ProjectsState'
import {ProjectsProps} from './ProjectsProps'

export class Projects extends React.Component<ProjectsProps, ProjectsState>{

    constructor(props: ProjectsProps, state: ProjectsState){
        super(props);
        this.state = {
            items: [],
        }
    }

    public getItems(){

    }

    public componentDidMount(){
        this.getItems();
    }

    public render(): React.ReactElement<ProjectsProps>{
        return(
            <div>
                Hello from Projects Component
            </div>
        );
    }
}