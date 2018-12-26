import React from 'react';
import Api from '../api/index';

class Poll extends React.Component {
    constructor(props){
        super(props);
        this.finalize = this.finalize.bind(this);
    }

    render() {
        return (
            <div className="card" style={{margin: "20px"}}>
                <div class="card-content">
                    <span style={{fontWeight: "bold"}}>{this.props.title}</span> &nbsp;
                    <span>{this.props.description}</span> &nbsp;
                    <span style={{fontWeight: "bold"}}>{this.props.isFinalized ? "finalized" : ""} </span>
                </div>
            </div>
        );
    }

    finalize() {
        console.log("finalize");
    }


}

export default Poll;