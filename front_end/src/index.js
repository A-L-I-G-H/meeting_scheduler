import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import API from './api/index';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {Button, Icon} from 'react-materialize';
import M from 'materialize-css';
import StorageManager from './StorageManager';

const ColorTheme = {
    primaryColor: '#2196F3',
    secondaryColor: "#FF9800",
};

const HistoryContext = React.createContext();

class App extends React.Component {
    constructor(props) {
        super(props);

        M.AutoInit();
    }

    render() {
        return (
            <Switch>
                <Route exact path='/' component={HomePage}/>
                <Route path='/createPoll' component={CreatePollPage}/>
                <Route path="/polls/:id" component={PollPage}/>
            </Switch>
        );
    }

}

class ChronusPage extends React.Component {
    render() {
        let history = this.props.history ? this.props.history : null;
        return (
            <HistoryContext.Provider value={history}>
                <Layout>
                    {this.props.children}
                </Layout>
            </HistoryContext.Provider>
        );
    }
}


class CreatePollPage extends React.Component {
    constructor(props) {
        super(props);
    }
}


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
        console.log(this.state.poll)
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
                                this.state.poll.options.map((option, i) => <span style={{color: 'white', backgroundColor: ColorTheme.primaryColor, borderRadius: '7px', padding: '7px', marginRight: '10px'}} key={i}>{option}</span>)
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

                            <div style={{marginTop: '35px', fontWeight: 'bold', color: ColorTheme.secondaryColor}}>
                            {
                                this.state.poll.isFinalized ?
                                    <span>FINALIZED</span> :
                                    <a className="waves-effect waves-light btn modal-trigger" href="#finalizeModal"
                                       style={{backgroundColor: ColorTheme.secondaryColor, color: 'white'}}>
                                       FINALIZE
                                   </a>
                            }

                            <div id="finalizeModal" className="modal">
                                <div className="modal-content">
                                    <h4 style={{color: 'black'}}>Choose the final result of the poll</h4>
                                    <span style={{color: 'grey', marginRight: '30px'}}>options:</span>
                                    {
                                        this.state.poll.options.map((option, i) => <span style={{color: 'white', backgroundColor: ColorTheme.primaryColor, borderRadius: '7px', padding: '7px', marginRight: '10px'}} key={i}>{option}</span>)
                                    }
                                </div>
                            </div>

                            </div>
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


class Layout extends React.Component {
    render() {
        return(
            <div>
                <NavBar />
                {this.props.children}
            </div>
        );
    }
}

class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ChronusPage history={this.props.history}>
                <div>
                    <PollSection title="Your Polls" polls={API.getMyPolls()}/>
                    <PollSection title="Involved Polls" polls={API.getInvolvedPolls()}/>

                    <AddButton
                        onClick={() => setTimeout(() => this.props.history.push('/createPoll'), 400)}
                        color={ColorTheme.secondaryColor}
                        style={{position: 'fixed', bottom: 30, right: 30}}
                        className="pollCreationButton"
                    />
                </div>
            </ChronusPage>
        );
    }

    componentDidMount() {
        let elements = Array.from(document.getElementsByClassName("pollCreationButton"));
        elements.forEach(elem => M.Tooltip.init(elem, {enterDelay: 500}));
    }
}

class PollSection extends React.Component {
    static contextType = HistoryContext;

    render() {
        return (
            <div className="container">

            <div className="row" style={{display: 'inline-block', marginRight: "20px"}}>
                <h2 style={{fontSize: '20px'}}>{this.props.title}</h2>
                <hr style={{color: ColorTheme.primaryColor}}/>
            </div>

            {this.props.polls.map(poll => (
                <div key={poll.id} className="row" style={{marginBottom: "-15px"}}>
                    <Poll {...poll}/>
                </div>
            ))}

            </div>
        )
    }
}

class NavBar extends React.Component {
    render() {
        const height = 60;
        const style = {
            position: 'fixed',
            top: 0,
            width: '100%',
            height: height + "px",
            lineHeight: height + "px",
            color: 'white',
            paddingLeft: '20px',
            paddingRight: '50px',
            display: 'block',
            backgroundColor: ColorTheme.primaryColor,
        };

        return  (
            <div>
            <nav style={style}>
                <span style={{fontSize: '19px', fontWeight: "bold", marginLeft: "15px"}}>Chronus</span>

                <span style={{display: 'inline-block', float: 'right', marginRight: '40px'}}>
                {StorageManager.userIsLoggedIn() ?
                    StorageManager.getLoggedInUser().username:
                    "login"
                }
                </span>

            </nav>
                <div style={{marginTop: height - 20}}>_</div>
            </div>
        )
    }
}


function AddButton(props) {
    const style = {...{
        backgroundColor: props.color,
    }, ...props.style};

    const result = (
        <div
            style={style} onClick={props.onClick}
            className={"btn-floating btn-large waves-effect waves-light " + props.className}
            data-position="top" data-tooltip="create new poll"
        >
            <i className="material-icons">add</i>
        </div>
    );

    return result;
}

class Poll extends React.Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        return (
            <div className="card" style={{margin: "20px", cursor: 'pointer'}} onClick={this.handleClick}>
                <div className="card-content">
                    <span style={{fontWeight: "bold"}}>{this.props.title}</span> &nbsp;
                    <span style={{color: 'gray'}}>{this.props.description}</span> &nbsp;
                    <span style={{fontWeight: "bold"}}>{this.props.isFinalized ? "finalized" : ""} </span>
                </div>
            </div>
        );
    }

    handleClick() {
        this.context.push('polls/' + this.props.id);
    }

    static contextType = HistoryContext;
}



ReactDOM.render((
    <BrowserRouter>
        <App/>
    </BrowserRouter>
    ),
    document.getElementById('root')
);