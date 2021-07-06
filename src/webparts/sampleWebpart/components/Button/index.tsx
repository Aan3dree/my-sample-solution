import * as React from 'react'

export default (props) => {

    const {name} = props;
    
    return (
        <button>
            {name}
        </button>
    );
};

