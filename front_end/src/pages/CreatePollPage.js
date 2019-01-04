
import React from "react";
import ChronusPage from "./ChronusPage";
import M from 'materialize-css';
import {ColorTheme} from "../globals";

class CreatePollPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: null,
            description: null,
            options: [{label: null, date: null, time: null}],
            participants: [],
        };

        this.handleFormInputChange = this.handleFormInputChange.bind(this);
    }

    render() {
        return (
            <ChronusPage>
                <div className="container" style={{paddingTop: '100px'}}>
                    <div className="card" style={{padding: '60px', width: '600px', marginRight: 'auto', marginLeft: 'auto'}}>

                        <div className="input-field">
                            <input onChange={this.handleFormInputChange.bind(this, "title")} type="text" id="title"/>
                            <label for="title">Poll Title</label>
                        </div>

                        <div className="input-field" style={{marginTop: '40px'}}>
                            <textarea id="description" className="materialize-textarea" onChange={this.handleFormInputChange.bind(this, "description")}/>
                            <label for="description">Description</label>
                        </div>

                        {this.getOptionsSection()}
                        


                    </div>

                </div>
            </ChronusPage>
        );
    }

    getOptionsSection() {
        return (
            <div style={{marginTop: '50px'}}>
                            <span>Options:
                                <i className="material-icons"
                                   style={{color: ColorTheme.darkPrimaryColor, verticalAlign: '-7px', marginLeft: '10px', cursor:'pointer'}}
                                   onClick={this.handleOptionAddition}
                                >
                                    add_circle
                                </i>
                            </span>

                {
                    this.state.options.map((option, index) => (
                        <Option {...option} onChange={this.handleOptionChange.bind(this, index) } />
                    ))
                }

            </div>
        );
    }

    handleOptionAddition = () => {
      let newOptions = Array.from(this.state.options);
      newOptions.push({label: null, time: null, date: null});
      this.setState({options: newOptions});
    };

    handleFormInputChange(name, event) {
        this.setState({[name]: event.target.value});
    };

    handleOptionChange(optionIndex, changedField, newValue) {
        let newOptions = Array.from(this.state.options);
        newOptions[optionIndex][changedField] = newValue;
        this.setState({options: newOptions});
    }

    componentDidMount() {
        this.initializeMaterializeElements();
    }

    componentDidUpdate() {
        this.initializeMaterializeElements();
    }

    initializeMaterializeElements() {
        M.Datepicker.init(document.querySelectorAll('.datepicker'), {});
        M.Timepicker.init(document.querySelectorAll('.timepicker'), {});
    }

}


class Option extends  React.Component {
    render() {
        return (
            <div>
                <div className="input-field inline" style={{width: '170px'}}>
                    <input
                        placeholder="label" id="label" type="text"
                        onChange={(event) => this.props.onChange("label", event.target.value)}
                        value={this.props.label}
                    />
                </div>

                <div className="input-field inline" style={{width: '130px'}}>
                    <input
                        id="date" placeholder="date" type="text" className="datepicker"
                        onSelect={(event) => this.props.onChange("date", event.target.value)}
                        value={this.props.date}
                    />
                </div>

                <div className="input-field inline" style={{width: '100px'}}>
                    <input
                        id="time" placeholder="time" type="text" className="timepicker"
                        onSelect={(event) => this.props.onChange("time", event.target.value)}
                        value={this.props.time}
                    />
                </div>
            </div>
        )
    }
}

export default CreatePollPage;