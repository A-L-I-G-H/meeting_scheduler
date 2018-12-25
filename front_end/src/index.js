import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import Poll from './domain/Poll';
import Api from './api/index';
import {BrowserRouter, Switch, Route} from 'react-router-dom';


const primaryColor = '#2196F3';
const secondaryColor = "#FF9800";

class App extends React.Component {
    render() {
        return (
            <Switch>
            <Route exact path='/' component={HomePage}/>
            <Route path='/createPoll' component={CreateEventPollPage}/>
            </Switch>
        );
    }
}

class CreateEventPollPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            participants: [],
            options: [],
        };

        this.setParticipants = this.setParticipants.bind(this);
        this.setOptions = this.setOptions.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} style={{margin: "30px"}}>

                title: &nbsp;
                <input type="text" name="title" onChange={(event) => {this.setState({title: event.target.value})}}/> <br/><br/>

                description: &nbsp;<br/>
                <textarea type="textarea" rows="5" cols="40" name="description" onChange={(event) => {this.setState({description: event.target.value})}}/> <br/><br/>

                participants: &nbsp;
                <input type="text" name="participants" onChange={this.setParticipants}/> <br/><br/>

                options: &nbsp;
                <input type="text" name="options" onChange={this.setOptions}/> <br/> <br/>

                <button onClick={this.handleSubmit}>asdasd</button>

            </form>
        )
    }

    setParticipants(event) {
        this.setState({participants: event.target.value.split(",").map(elem => elem.trim())});
    }

    setOptions(event) {
        this.setState({options: event.target.value.split(",").map(elem => elem.trim())});
    }

    handleSubmit(event) {
        console.log("create poll called");
        // Api.createPoll(Object.assign({}, this.state));
    }

    // {
    //     "username": "ali",
    //     "title": "new poll",
    //     "description": "new description",
    //     "options": ["option1", "option2"],
    //     "contributors": ["ali", "mhmb76"]
    // }

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
    render() {
        console.log("passing things in : ");
        console.log(this.props);
        return (
            <Layout>
                <div style={{marginTop: '60px', marginLeft: '20px'}}>
                <PollSection text="Your Polls"/>
                <Poll data={Api.getMyPolls()[0]}/>
                <Poll data={Api.getMyPolls()[1]}/>

                <PollSection text="Involved Polls"/>
                <Poll data={Api.getInvolvedPolls()[0]}/>
                <Poll data={Api.getInvolvedPolls()[1]}/>
                <Poll data={Api.getInvolvedPolls()[2]}/>

                <PollButton history={this.props.history}/>

            </div>
            </Layout>
        );
    }
}

class NavBar extends React.Component {
    render() {
        const navBarStyle = {
            position: 'fixed',
            top: 0,
            width: '100%',
            height: '20px',
            color: 'white',
            padding: '20px',
            paddingRight: '50px',
            display: 'block',
            backgroundColor: primaryColor,
        };

        return  (
            <div>
            <nav style={navBarStyle}>
                <span style={{fontSize: '18px', fontWeight: "bold"}}>Penguin</span>
                <span style={{display: 'inline-block', float: 'right', marginRight: '50px'}}>login</span>
            </nav>
                <div style={{marginTop: "25px"}}>_</div>
                {/*TODO: find a way to remove the underline*/}
            </div>
        )
    }
}

function PollSection(props) {
    return (
        <div>
        <div style={{display: 'inline-block', marginRight: "20px"}}>
            <h2 style={{fontSize: '20px'}}>{props.text}</h2>
            <hr style={{color: primaryColor}}/>
        </div>
        </div>
    );
}


class PollButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }


    render() {
        const diameter = '55px';
        return (
            <div style={{
                display: 'inline-block', fontSize: "22px",
                backgroundColor: secondaryColor, color: 'white',
                height: diameter, width: diameter,
                borderRadius: '50%', padding: '2px',
                textAlign: 'center',
                lineHeight: diameter,
                position: 'fixed',
                bottom: 30, right: 30,
                cursor: 'pointer',
            }}
                 onClick={this.handleClick}
            >
                +
            </div>
        );
    }

    handleClick() {
        this.props.history.push('/createPoll');
    }

}

ReactDOM.render((
    <BrowserRouter>
        <App/>
    </BrowserRouter>
    ),
    document.getElementById('root')
);
