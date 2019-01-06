import React from "react";
import ChronusPage from "./ChronusPage";
import M from 'materialize-css';
import {ColorTheme, HistoryContext} from "../globals";
import API from '../api';
import AlertSection from '../components/AlertSection'
import StorageManager from "../StorageManager";

class CreatePollPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            description: "",
            options: [{label: "", startDate: "", startTime: "", endDate: "", endTime: ""}],
            participants: [{username: ""}],
            isPeriodic: false,
            periodDays: "",
            startDate: "",
            endDate: "",
            submitAlert: "",
            perMeetingNotification: false,
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

        let options = this.state.options.map(option => {
            let startDatetimeString = option.startDate + "T" + option.startTime + ":00Z";
            // let startDatetime = new Date(startDatetimeString).getTime();
            let endDatetimeString = option.endDate + "T" + option.endTime + ":00Z";
            // let endDatetime = new Date(endDatetimeString).getTime();
            return {label: option.label, time:{startDate: startDatetimeString, endDate: endDatetimeString}};
        });

        let participants = this.state.participants.map(participant => participant.username);

        let poll = {
            title: this.state.title,
            description: this.state.description,
            options: options,
            participants: participants,
            isPeriodic: this.state.isPeriodic,
            periodDays: this.state.periodDays,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            perMeetingNotification: this.state.perMeetingNotification,
        };

        let success = await API.createPoll(StorageManager.getLoggedInUser().username, poll);

        if (success) {
            this.setState({submitAlert: {type: "success", message: "poll created successfully."}});
        } else {
            this.setState({submitAlert: {type: "failure", message: "something went wrong!"}});
        }

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

                  <div className="input-field" style={{width: '250px', marginTop: '30px', marginBottom: '40px'}}>
                      <input
                          type="text" className="datepicker"
                          value={this.props.date}
                          onSelect={this.handleFormInputChange.bind(this,"endDate")}
                      />
                      <label for="endDate">end date</label>
                  </div>

                  <label style={{marginTop: '30px'}}>
                      <input type="checkbox" onClick={this.togglePerMeetingNotification}/>
                      <span>should participants be notified for every meeting?</span>
                  </label>

              </div>
          </div>
        );
    }

    togglePerMeetingNotification = () => {
        this.setState({perMeetingNotification: !this.state.perMeetingNotification});
    };

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
                        <Participant {...participant} onChange={this.handleParticipantChange.bind(this, index)}/>
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
        M.Datepicker.init(document.querySelectorAll('.datepicker'), {format: 'yyyy-mm-dd'});
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
                        // value={this.props.username}
                    />
                </div>
            </div>
        )
    }
}

class Option extends React.Component {
    render() {
        const dateTimeFieldsWidth = '110px';
        return (
            <div>
                <div className="input-field inline" style={{width: '190px', marginBottom: '-10px'}}>
                    <input
                        placeholder="label" type="text"
                        onChange={(event) => this.props.onChange("label", event.target.value)}
                        value={this.props.label}
                    />
                </div>
                <br/>
                <div className="input-field inline" style={{width: dateTimeFieldsWidth}}>
                    <input
                        placeholder="start date" type="text" className="datepicker"
                        onSelect={(event) => this.props.onChange("startDate", event.target.value)}
                        value={this.props.date}
                    />
                </div>

                <div className="input-field inline" style={{width: dateTimeFieldsWidth}}>
                    <input
                        placeholder="start time" type="text" className="timepicker"
                        onSelect={(event) => this.props.onChange("startTime", event.target.value)}
                        value={this.props.time}
                    />
                </div>

                <div className="input-field inline" style={{width: dateTimeFieldsWidth}}>
                    <input
                        placeholder="end date" type="text" className="datepicker"
                        onSelect={(event) => this.props.onChange("endDate", event.target.value)}
                        value={this.props.date}
                    />
                </div>

                <div className="input-field inline" style={{width: dateTimeFieldsWidth}}>
                    <input
                        placeholder="end time" type="text" className="timepicker"
                        onSelect={(event) => this.props.onChange("endTime", event.target.value)}
                        value={this.props.time}
                    />
                </div>
            </div>
        )
    }

}

export default CreatePollPage;