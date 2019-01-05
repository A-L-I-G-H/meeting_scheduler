import M from "materialize-css";
import API from "../api";
import React from "react";
import {ColorTheme, HistoryContext} from "../globals";
import ChronusPage from './ChronusPage';
import StorageManager from "../StorageManager";
import {VoteType} from '../globals';
import AlertSection from '../components/AlertSection'

class PollPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {poll: null};

        this.fetchPoll();
    }

    render() {
        if (this.state.poll) {
            return (
                <ChronusPage history={this.props.history}>
                    <div className="container"
                         style={{paddingLeft: '10%', paddingRight: '10%', marginTop: '40px', textAlign: 'center'}}
                    >
                        <div className="card" style={{paddingTop: '30px'}}>
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
                                        marginRight: '10px',
                                    }} key={option.id}>
                                        {option.label}
                                    </span>)
                                }
                                <br/>
                            </div>

                            {this.getOwnerSection()}
                            {this.getParticipantsSection()}

                            <a
                                className="btn waves-effect waves-light modal-trigger"
                                href="#votingModal"
                                style={{marginTop: '40px', backgroundColor: ColorTheme.primaryColor, color: 'white'}}
                            >
                                VOTE
                            </a>

                            <VotingModal poll={this.state.poll}/>

                            <FinalizationSection poll={this.state.poll}/>

                            <ul className="collapsible" style={{boxShadow: 'none', borderWidth: '0px', marginTop: '50px'}}>
                                <li>
                                    <div className="collapsible-header" style={{textAlign: 'center'}}>
                                            <i className="material-icons">dehaze</i>
                                            Comments Section
                                    </div>
                                    <div className="collapsible-body">

                                        <div className="row" style={{marginTop: '30px'}}>
                                            {
                                                this.state.poll.options.map(option =>
                                                    <CommentsColumn key={option.id} poll={this.state.poll} option={option} onNewComment={this.handleNewComment}/>
                                                )
                                            }
                                        </div>
                                    </div>
                                </li>

                            </ul>

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

    handleNewComment = (comment) => {
        console.log("handle new comment called", comment);
        let newPoll = Object.assign({}, this.state.poll);
        let option = newPoll.options.find(option => option.id === comment.commentedOnId);
        option.comments.push(comment);
        console.log("new poll:",newPoll);
        this.setState({poll: newPoll, visibleCommentingBoxId: null, postingAlert: null});
    };

    getParticipantsSection = () => {
        return (
            <div style={{marginTop: '30px'}}>
                <span style={{color: 'grey', marginRight: '20px'}}>participants: </span>
                {
                    this.state.poll.participants.map((participant, i) => <span
                        style={{marginRight: '10px'}} key={i}>{participant.username}</span>)
                }
            </div>
        );
    };

    getOwnerSection = () => {
        return (
            <div style={{marginTop: '35px'}}>
                <span style={{color: 'grey', marginRight: '20px'}}>owner:</span>
                <span>{this.state.poll.owner}</span>
            </div>
        );
    };

    fetchPoll = () => {
        const pollId = parseInt(this.props.match.params.id);
        API.getPoll(pollId).then(poll => {
            this.setState({poll: poll});
        });
    };

    componentDidUpdate() {
        let elems = Array.from(document.getElementsByClassName('modal'));
        elems.forEach(elem => M.Modal.init(elem, {}));
        M.Collapsible.init(document.querySelectorAll('.collapsible'), {});
    }

}

class CommentsColumn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCommentContent: "",
            visibleCommentingBoxId: null,
            postingAlert: null,
        }
    }

    render() {
        let indentLevel = 0;

        return (
            <div
                className={"col m"+(12/this.props.poll.options.length) }
            >
                <span style={{backgroundColor: ColorTheme.primaryColor, padding: '10px', borderRadius: '8px', color: 'white'}}>{this.props.option.label}</span>

                <div style={{textAlign: 'left'}}>
                    {this.props.option.comments.map(comment => (
                        comment.isReply === false && (
                            this.renderComment(comment, indentLevel)
                        )
                    ))}
                </div>

                <AlertSection {...this.state.postingAlert}/>

            </div>
        )

    }

    renderComment(comment, indentLevel) {
        let leftIndent = (20 * indentLevel) + 'px';
        return (
            <div key={comment.id} style={{paddingTop: '40px'}}>
                <div style={{paddingLeft: leftIndent, borderWidth: '5px'}}>
                    {comment.content}
                    <div
                        style={{color: ColorTheme.darkPrimaryColor, marginTop: '10px', cursor: 'pointer'}}
                        onClick={() => this.setState({visibleCommentingBoxId: comment.id})}
                    >
                        Reply
                    </div>
                </div>

                <div className="card" style={{borderRadius: '5px', marginLeft: leftIndent, paddingBottom: '5px', paddingLeft: '5px', paddingRight: '5px', marginTop: '20px',
                    display: this.state.visibleCommentingBoxId === comment.id ? 'block' : 'none'}}
                >
                    <div className="input-field">
                        <textarea className="materialize-textarea" style={{marginBottom: '3px'}} onChange={(event) => {this.state.currentCommentContent = event.target.value}} />
                    </div>

                    <span
                        style={{color: ColorTheme.darkPrimaryColor, cursor: 'pointer', marginTop: '-10px', display: 'inline-block'}}
                        onClick={() => this.handlePost({
                            content: this.state.currentCommentContent,
                            writer: StorageManager.getLoggedInUser().username,
                            commentedOnId: this.props.option.id,
                            isReply: true,
                            repliedToId: comment.id,
                        })}
                    >
                        post
                    </span>
                </div>

                {this.findReplies(comment).map(reply => (
                    this.renderComment(reply, indentLevel + 1)
                ))}
            </div>
        );
    }

    findReplies(comment) {
        return this.props.option.comments.filter(each => each.isReply === true && each.repliedToId === comment.id);
    }

    handlePost = async (comment) => {
        let success = await API.post();
        if (success) {
            console.log("got to handle");
            this.setState({postingAlert: null, visibleCommentingBoxId: null});
            this.props.onNewComment(comment);
        } else {
            this.setState({postingAlert: {type: "failure", message: "something went wrong!"}});
        }
    }
}


class VotingModal extends React.Component {
    constructor(props) {
        super(props);

        const selected = {};
        this.props.poll.options.forEach(option => {
            selected[option.id] = null;
        });

        this.state = {
            selected: selected,
            alert: null,
        };

    }

    render() {
        return (
            <div id="votingModal" className="modal">
                <div className="modal-content">
                    <h4 style={{color: 'black'}}>Choose your vote for each option</h4>
                    <div style={{marginTop: '100px'}} className="container">
                    {
                        this.props.poll.options.map(option =>
                            <PollOption key={option.id} {...option} onClick={this.handleClickOnOptionVote} selectedVoteType={this.state.selected[option.id]}/>
                        )
                    }
                    </div>

                    <div
                        className="btn"
                        style={{marginTop: '100px', backgroundColor: ColorTheme.primaryColor, color: 'white', clear: 'both'}}
                        onClick={this.handleClickOnVote}
                    >
                        VOTE
                    </div>

                    <div style={{marginTop: '50px'}}>
                        <AlertSection {...this.state.alert}/>
                    </div>

                </div>
            </div>
        );
    }

    handleClickOnOptionVote = (optionId, voteType) => {
        let newSelected;
        if (this.state.selected[optionId] === voteType) {
            newSelected = Object.assign({}, this.state.selected);
            newSelected[optionId] = null;
        } else {
            newSelected = Object.assign(this.state.selected, {[optionId]: voteType});
        }
        this.setState({selected: newSelected});
    };

    handleClickOnVote = async () => {
        console.log("handle vote called");
        let votes = [];
        for (let option of this.props.poll.options) {
            if (this.state.selected[option.id] === null) {
                this.setState({alert: {type: "failure", message: "you must vote for every option!"}});
                return;
            } else {
                votes.push({optionId: option.id, voteType: this.state.selected[option.id]});
            }
        }

        let success = await API.vote(StorageManager.getLoggedInUser().username, this.props.poll.id, this.state.selected);
        console.log("api success:");
        console.log(success);
        if (success) {
            this.setState({alert: {type: "success", message: "your vote was successfully recorded."}});
            setTimeout(() => {
                this.context.replace('/polls/' + this.props.poll.id);
            }, 1000);
        } else {
            this.setState({alert: {type: "failure", message: "unable to vote."}});
        }

    };

    static contextType = HistoryContext;
}

class PollOption extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <span style={{display: 'inline-block', marginRight: '40px', marginTop: '40px', paddingLeft: 'auto', paddingRight: 'auto'}}>
            <div
                style={{
                    color: 'white',
                    backgroundColor: ColorTheme.primaryColor,
                    borderRadius: '7px',
                    padding: '7px',
                    width: '160px',
                    display: 'inline-block',
                }}
                key={this.props.id}
            >
                {this.props.label}
            </div>

                {
                    VoteType.getAll().map(voteType => (
                        <div
                            style={{
                                marginTop: '18px',
                                cursor: 'pointer',
                                padding: '5px',
                                backgroundColor: this.props.selectedVoteType === voteType.enum ? ColorTheme.accentColor : ColorTheme.lightPrimaryColor,
                                color: this.props.selectedVoteType === voteType.enum ? 'white' : 'black',
                            }}
                            className="round-rect"
                            onClick={() => this.props.onClick(this.props.id, voteType.enum)}
                            key={voteType.enum}
                        >
                            {voteType.label}
                        </div>
                    ))
                }
        </span>
        )
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
            <FinalizationModal poll={props.poll}/>
        </div>
    );
}


class FinalizationModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null,
            alert: null,
        };
    }

    render() {
        return (
            <div id="finalizeModal" className="modal">
                <div className="modal-content">
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
                        className="btn waves-effect waves-light"
                        style={{marginTop: '100px', backgroundColor: ColorTheme.accentColor, color: 'white'}}
                        onClick={this.handleClickOnFinalize}
                    >
                        FINALIZE
                    </div>

                    <div style={{marginTop: '50px'}}>
                        <AlertSection {...this.state.alert}/>
                    </div>

                </div>
            </div>
        );
    }

    handleClickOnOption = (option) => {
        if (this.state.selected === option) {
            this.setState({selected: null})
        } else {
            this.setState({selected: option})
        }
    };

    handleClickOnFinalize = async () => {
        console.log("handleClickOnFinal called");
        if (this.state.selected === null) {
            this.setState({alert: {type: "failure", message: "you must choose an option first"}});
            return;
        }

        let success = await API.finalize(this.props.poll, this.state.selected.id);
        if (success) {
            this.setState({alert: {type: "success", message: "poll finalized successfully."}});
            console.log(this.props.poll.id);
            setTimeout(() => {
                this.context.replace('/polls/' + this.props.poll.id);
            }, 1000);
        } else {
            this.setState({alert: {type: "failure", message: "unable to finalize poll."}});
        }
    };

    static contextType = HistoryContext;
}



export default PollPage;