import React from 'react';
import ReactDOM from 'react-dom';

function AlertSection(props) {
    if (props.type === undefined)
        return <div style={{display: 'none'}}>_</div>;
    else if (props.type === "success")
        return <div style={{color: 'green'}}>{props.message}</div>;
    else if (props.type === "failure")
        return <div style={{color: 'red'}}>{props.message}</div>;
    else
        console.error("invalid type passed to AlertSection" + props.type);
}

export default AlertSection;