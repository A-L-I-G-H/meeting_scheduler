import React from 'react';
import Api from '../api/index';

class Poll extends React.Component {
    constructor(props){
        super(props);
        this.finalize = this.finalize.bind(this);
    }

    render() {
        return (
            <p>
                <span style={{fontWeight: "bold"}}>{this.props.data.title}</span> &nbsp;
                <span>{this.props.data.description}</span> &nbsp;
                <span style={{fontWeight: "bold"}}>{this.props.data.isFinalized ? "finalized" : <span style={{textDecoration: 'underline', cursor: 'pointer'}} onClick={this.finalize}>finalize</span>} </span>
            </p>
        );
    }

    finalize() {
        console.log("finalize");
        Api.finalize(this.props.data);
    }


}

export default Poll;