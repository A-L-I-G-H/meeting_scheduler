import M from "materialize-css";
import API from "../api";
import React from "react";
import {ColorTheme, HistoryContext} from "../globals";
import ChronusPage from './ChronusPage';

class PollPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {poll: null};

        const pollId = parseInt(this.props.match.params.id);
        API.getPoll(pollId).then(poll => {
            this.setState({poll: poll});
        });
    }

    render() {
        console.log("my poll is:");
        console.log(this.state.poll);
        if (this.state.poll) {
            return (
                <ChronusPage history={this.props.history}>
                    <div className="container" style={{paddingLeft: '10%', paddingRight: '10%', marginTop: '40px', textAlign: 'center'}}>
                        <div className="card" style={{paddingTop: '30px', paddingBottom: '80px'}}>
                            <h1>{this.state.poll.title}</h1>
                            <p>{this.state.poll.description}</p>

                            <div style={{marginTop: '40px'}}>
                                <span style={{color: 'grey', marginRight: '30px'}}>options:</span>
                                {
                                    this.state.poll.options.map(option => <span style={{color: 'white', backgroundColor: ColorTheme.primaryColor, borderRadius: '7px', padding: '7px', marginRight: '10px'}} key={option.id}>{option.label}</span>)
                                }
                                <br/>
                            </div>

                            <div className="row" style={{marginTop: '35px'}}>
                                <span style={{color: 'grey', marginRight: '20px'}}>owner:</span> <span>{this.state.poll.owner}</span>
                            </div>

                            <div style={{marginTop:'30px'}}>
                                <span style={{color: 'grey', marginRight: '20px'}}>participants: </span>
                                {
                                    this.state.poll.participants.map((participant, i) => <span style={{marginRight: '10px'}} key={i}>{participant}</span>)
                                }
                            </div>

                            <div style={{marginTop: '35px', fontWeight: 'bold', color: ColorTheme.accentColor}}>
                                {
                                    this.state.poll.isFinalized ?
                                        <span>FINALIZED</span> :
                                        <a className="waves-effect waves-light btn modal-trigger" href="#finalizeModal"
                                           style={{backgroundColor: ColorTheme.accentColor, color: 'white'}}>
                                            FINALIZE
                                        </a>
                                }

                            </div>

                            <FinalizationModal options={this.state.poll.options}/>

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

    componentDidUpdate() {
        let elems = Array.from(document.getElementsByClassName('modal'));
        elems.forEach(elem => M.Modal.init(elem, {}));
    }

}

class FinalizationModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selected: {id: -1}}
    }

    render() {
        return (
            <div id="finalizeModal" className="modal">
                <div className="modal-content" style={{height: '400px'}}>
                    <h4 style={{color: 'black'}}>Choose the final result of the poll</h4>
                    <div style={{marginTop: '100px'}}>
                        {
                            this.props.options.map(option =>
                                <span
                                    style={{
                                        color: 'white',
                                        backgroundColor: this.state.selected.id === option.id ? ColorTheme.primaryColor: ColorTheme.passiveElement,
                                        borderRadius: '7px',
                                        padding: '7px', marginRight: '10px',
                                        cursor: 'pointer',
                                    }}
                                    key={option.id}
                                    onClick={() => this.setState({selected: option})}
                                >
                                    {option.label}
                                </span>
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }

    handleClickOnOption() {

        // this.setState({selected: option})
    }
}



export default PollPage;