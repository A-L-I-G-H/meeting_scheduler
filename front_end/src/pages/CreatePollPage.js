import React from "react";
import ChronusPage from "./ChronusPage";
import M from 'materialize-css';
import {ColorTheme, HistoryContext} from "../globals";
import API from '../api';
import AlertSection from '../components/AlertSection'

class CreatePollPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            description: "",
            options: [{label: "", date: "", time: ""}],
            participants: [{username: ""}],
            isPeriodic: false,
            periodDays: "",
            startDate: "",
            endDate: "",
            submitAlert: "",
        };

        this.handleFormInputChange = this.handleFormInputChange.bind(this);
    }

    render() {
        return (
            <ChronusPage history={this.props.history}>
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
                        {this.getParticipantsSection()}
                        {this.getPeriodicSection()}

                        {/*<div style={{marginLeft: 'auto', marginRight: 'auto', width: '100px', marginTop: '50px'}}>*/}
                        <div style={{textAlign: 'center', marginTop: '50px'}}>
                            <div className="waves-effect waves-light btn"
                                 style={{backgroundColor:ColorTheme.primaryColor, display: 'inline-block', marginBottom: '30px'}}
                                 onClick={this.handleSubmit}
                            >
                                create
                            </div>

                            <AlertSection {...this.state.submitAlert}/>
                        </div>


                    </div>

                </div>
            </ChronusPage>
        );
    }

    handleSubmit = async () => {

        let options = options.map(option => {
            let datetimeString = option.date + " " + option.time + ":00";
            let datetime = new Date(datetimeString).getTime();
            return {label: option.label, datetime: datetime};
        });

        let poll = {
            title: this.state.title,
            description: this.state.description,
            options: options,
            participants: this.state.participants,
            isPeriodic: this.state.isPeriodic,
            periodDays: this.state.periodDays,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
        };

        let success = await API.createPoll(poll);

        if (success) {
            this.setState({submitAlert: {type: "success", message: "poll created successfully."}});
        } else {
            this.setState({submitAlert: {type: "failure", message: "something went wrong!"}});
        }

        console.log("context:");
        console.log(this);

        setTimeout(
            () => this.props.history.push('/'),
            1000);
    };

    getPeriodicSection() {
        return (
          <div>
              <label>
                  <input type="checkbox" onClick={this.togglePeriodic}/>
                  <span>is your poll periodic? </span>
              </label>

              <div id="periodicPollSection" style={{display: this.state.isPeriodic? 'block' : 'none', marginTop: '20px'}}>

                  <div className="input-field inline">
                      <input type="text" id="periodDays" onChange={this.handleFormInputChange.bind(this,"periodDays")}/>
                      <label for="periodDays">period (in days)</label>
                  </div>

                  <div className="input-field" style={{width: '250px'}}>
                      <input
                          type="text" className="datepicker"
                          value={this.props.date}
                          onSelect={this.handleFormInputChange.bind(this,"startDate")}
                      />
                      <label for="startDate">start date</label>
                  </div>

                  <div className="input-field" style={{width: '250px', marginTop: '30px'}}>
                      <input
                          type="text" className="datepicker"
                          value={this.props.date}
                          onSelect={this.handleFormInputChange.bind(this,"endDate")}
                      />
                      <label for="endDate">end date</label>
                  </div>

              </div>
          </div>
        );
    }

    togglePeriodic = () => {
        let isPeriodic = !this.state.isPeriodic;
        this.setState({isPeriodic: isPeriodic});
    };

    getParticipantsSection() {
        return (
            <div style={{marginTop: '30px', marginBottom: '30px'}}>
                            <span>Participants:
                                <i className="material-icons small"
                                   style={{color: ColorTheme.accentColor,
                                       verticalAlign: '-7px',
                                       marginLeft: '10px',
                                       cursor:'pointer',
                                       marginBottom: '40px',
                                   }}
                                   onClick={this.handleParticipantAddition}
                                >
                                    add_circle
                                </i>
                                <i className="material-icons small"
                                   style={{color: ColorTheme.accentColor,
                                       verticalAlign: '-7px',
                                       marginLeft: '5px',
                                       cursor:'pointer',
                                       marginBottom: '40px',
                                   }}
                                   onClick={this.handleParticipantRemoval}
                                >
                                    remove_circle
                                </i>
                            </span>

                {
                    this.state.participants.map((participant, index) => (
                        <Participant {...participant} onChange={() => this.handleParticipantChange.bind(this, index)}/>
                    ))
                }
            </div>
        );
    }

    getOptionsSection() {
        return (
            <div style={{marginTop: '50px'}}>
                            <span>Options:
                                <i className="material-icons small"
                                   style={{color: ColorTheme.accentColor, verticalAlign: '-7px', marginLeft: '10px', cursor:'pointer'}}
                                   onClick={this.handleOptionAddition}
                                >
                                    add_circle
                                </i>
                                <i className="material-icons small"
                                   style={{color: ColorTheme.accentColor, verticalAlign: '-7px', marginLeft: '5px', cursor:'pointer'}}
                                   onClick={this.handleOptionRemoval}
                                >
                                    remove_circle
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

    handleParticipantAddition = () => {
        let newParticipants = Array.from(this.state.participants);
        newParticipants.push({username: null});
        this.setState({participants: newParticipants});
    };

    handleParticipantRemoval = () => {
        let newParticipants = Array.from(this.state.participants);
        newParticipants.pop();
        this.setState({participants: newParticipants});
    };

    handleParticipantChange(participantIndex, changedField, newValue) {
        let newParticipants = Array.from(this.state.participants);
        newParticipants[participantIndex][changedField] = newValue;
        this.setState({participants: newParticipants});
    }

    handleOptionAddition = () => {
      let newOptions = Array.from(this.state.options);
      newOptions.push({label: null, time: null, date: null});
      this.setState({options: newOptions});
    };

    handleOptionRemoval = () => {
        let newOptions = Array.from(this.state.options);
        newOptions.pop();
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
        M.Datepicker.init(document.querySelectorAll('.datepicker'), {format: 'mm/dd/yyyy'});
        M.Timepicker.init(document.querySelectorAll('.timepicker'), {twelveHour: false});
    }

}

class Participant extends React.Component {
    render() {
        return (
            <div>
                <div className="input-field inline" style={{marginTop: '-10px'}}>
                    <input
                        placeholder="username" type="text"
                        onChange={(event) => this.props.onChange("username", event.target.value)}
                        value={this.props.username}
                    />
                </div>
            </div>
        )
    }
}

class Option extends React.Component {
    render() {
        return (
            <div>
                <div className="input-field inline" style={{width: '170px'}}>
                    <input
                        placeholder="label" type="text"
                        onChange={(event) => this.props.onChange("label", event.target.value)}
                        value={this.props.label}
                    />
                </div>

                <div className="input-field inline" style={{width: '130px'}}>
                    <input
                        placeholder="date" type="text" className="datepicker"
                        onSelect={(event) => this.props.onChange("date", event.target.value)}
                        value={this.props.date}
                    />
                </div>

                <div className="input-field inline" style={{width: '100px'}}>
                    <input
                        placeholder="time" type="text" className="timepicker"
                        onSelect={(event) => this.props.onChange("time", event.target.value)}
                        value={this.props.time}
                    />
                </div>
            </div>
        )
    }

}

export default CreatePollPage;