import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import API from './api/index';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {Button, Icon} from 'react-materialize';
import M from 'materialize-css';
import StorageManager from './StorageManager';
import {ColorTheme, HistoryContext} from "./globals";
import PollPage from './pages/PollPage';
import ChronusPage from './pages/ChronusPage';


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


class CreatePollPage extends React.Component {
    constructor(props) {
        super(props);
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