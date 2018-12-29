import M from "materialize-css";
import API from "../api";
import React from "react";
import {ColorTheme, HistoryContext} from "../globals";
import ChronusPage from './ChronusPage';
import StorageManager from "../StorageManager";

class PollPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {poll: null};

        this.fetchPoll = this.fetchPoll.bind(this);

        this.fetchPoll();
    }

    render() {
        console.log("my poll is:");
        console.log(this.state.poll);
        if (this.state.poll) {
            return (
                <ChronusPage history={this.props.history}>
                    <div className="container"
                         style={{paddingLeft: '10%', paddingRight: '10%', marginTop: '40px', textAlign: 'center'}}>
                        <div className="card" style={{paddingTop: '30px', paddingBottom: '80px'}}>
                            <h1>{this.state.poll.title}</h1>
                            <p>{this.state.poll.description}</p>

                            <div style={{marginTop: '40px'}}>
                                <span style={{color: 'grey', marginRight: '30px'}}>options:</span>
                                {
                                    this.state.poll.options.map(option => <span style={{
                                        color: 'white',
                                        backgroundColor: ColorTheme.primaryColor,
                                        borderRadius: '7px',
                                        padding: '7px',
                                        marginRight: '10px'
                                    }} key={option.id}>{option.label}</span>)
                                }
                                <br/>
                            </div>

                            <div className="row" style={{marginTop: '35px'}}>
                                <span style={{color: 'grey', marginRight: '20px'}}>owner:</span>
                                <span>{this.state.poll.owner}</span>
                            </div>

                            <div style={{marginTop: '30px'}}>
                                <span style={{color: 'grey', marginRight: '20px'}}>participants: </span>
                                {
                                    this.state.poll.participants.map((participant, i) => <span
                                        style={{marginRight: '10px'}} key={i}>{participant.username}</span>)
                                }
                            </div>

                            <FinalizationSection poll={this.state.poll}/>
                            <FinalizationModal poll={this.state.poll}/>

                        </div>
                    </div>

                </ChronusPage>
            );
        } else {
            return (
                <div style={{width: '100%', textAlign: 'center'}}>
                    Loading ...
                </div>
            )
        }
    }

    fetchPoll() {
        const pollId = parseInt(this.props.match.params.id);
        API.getPoll(pollId).then(poll => {
            this.setState({poll: poll});
        });
    }

    componentDidUpdate() {
        let elems = Array.from(document.getElementsByClassName('modal'));
        elems.forEach(elem => M.Modal.init(elem, {}));
    }
}



function FinalizationSection(props) {
    let content = null;
    let marginTop = '35px';
    const finalizedOption = props.poll.options.find(option => option.id === props.poll.finalizedOptionId);
    if (props.poll.isFinalized) {
        content = (
            <div>
                <span style={{color: ColorTheme.accentColor, marginRight: '10px'}}>FINALIZED:</span>
                <span style={{
                    color: 'white',
                    backgroundColor: ColorTheme.accentColor,
                    borderRadius: '7px',
                    padding: '7px',
                    marginRight: '10px'
                }}>{finalizedOption.label}</span>
            </div>
        );
    } else if (StorageManager.getLoggedInUser().username === props.poll.owner) {
        content =
            (<a className="waves-effect waves-light btn modal-trigger" href="#finalizeModal"
                style={{backgroundColor: ColorTheme.accentColor, color: 'white'}}>
                FINALIZE
            </a>)
    } else {
        content = <div style={{display:'none'}}></div>
        marginTop = '0px';
    }
    return (
        <div style={{marginTop: marginTop, fontWeight: 'bold'}}>
            {content}
        </div>
    )
}


class FinalizationModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null,
            finalizationResult: null,
        };

        this.handleClickOnFinalize = this.handleClickOnFinalize.bind(this);
    }

    render() {
        return (
            <div id="finalizeModal" className="modal">
                <div className="modal-content" style={{height: '400px'}}>
                    <h4 style={{color: 'black'}}>Choose the final result of the poll</h4>
                    <div style={{marginTop: '100px'}}>
                        {
                            this.props.poll.options.map(option =>
                                <span
                                    style={{
                                        color: 'white',
                                        backgroundColor: this.state.selected === option ? ColorTheme.primaryColor: ColorTheme.passiveElement,
                                        borderRadius: '7px',
                                        padding: '7px', marginRight: '10px',
                                        cursor: 'pointer',
                                    }}
                                    key={option.id}
                                    onClick={() => this.handleClickOnOption(option)}
                                >
                                    {option.label}
                                </span>
                            )
                        }
                    </div>

                    <div
                        className="btn"
                        style={{marginTop: '100px', backgroundColor: ColorTheme.accentColor, color: 'white'}}
                        onClick={this.handleClickOnFinalize}
                    >
                        FINALIZE
                    </div>

                    <div style={{marginTop: '50px'}}>
                        <FinalizationResult result={this.state.finalizationResult}/>
                    </div>

                </div>
            </div>
        );
    }

    handleClickOnOption(option) {
        if (this.state.selected === option) {
            this.setState({selected: null})
        } else {
            this.setState({selected: option})
        }
    }

    async handleClickOnFinalize() {
        console.log("handleClickOnFinal called");
        if (this.state.selected === null) {
            this.setState({finalizationResult: {success: false, message: "you must choose an option first"}});
            return;
        }

        let success = await API.finalize(this.props.poll, this.state.selected.id);
        if (success) {
            this.setState({finalizationResult: {success: true, message: "poll finalized successfully."}});
            console.log("pushing at router");
            console.log(this.props.poll.id);
            console.log("done pushing");
            setTimeout(() => {
                this.context.replace('/polls/' + this.props.poll.id);
            }, 1000);
        } else {
            this.setState({finalizationResult: {success: false, message: "unable to finalize poll."}});
        }
    }

    static contextType = HistoryContext;
}

function FinalizationResult(props) {
    if (props.result === null)
        return <div style={{display: 'none'}}>_</div>;

    if (props.result.success === true) {
        return <div style={{color: 'green'}}>{props.result.message}</div>;
    } else if (props.result.success === false) {
        return <div style={{color: 'red'}}>{props.result.message}</div>;
    }
}


export default PollPage;