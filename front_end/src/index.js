import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import Poll from './domain/Poll';
import Api from './api/index';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

const ColorTheme = {
    primaryColor: '#2196F3',
    secondaryColor: "#FF9800",
};



class App extends React.Component {
    render() {
        return (
            <Switch>
            <Route exact path='/' component={HomePage}/>
            {/*<Route path='/createPoll' component={CreateEventPollPage}/>*/}
            </Switch>
        );
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

                <AddButton
                    history={this.props.history}
                    diameter={55}
                    onClick={() => this.history.push('/createPoll')}
                    color={ColorTheme.primaryColor}
                />

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
            backgroundColor: ColorTheme.primaryColor,
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
            <hr style={{color: ColorTheme.primaryColor}}/>
        </div>
        </div>
    );
}

function AddButton(props) {
    return (
        <div style={{
            display: 'inline-block', fontSize: "22px",
            backgroundColor: props.color, color: 'white',
            height: props.diameter, width: props.diameter,
            borderRadius: '50%', padding: '2px',
            textAlign: 'center',
            lineHeight: props.diameter,
            position: 'fixed',
            bottom: 30, right: 30,
            cursor: 'pointer',
        }}
             onClick={props.onClick}
        >
            +
        </div>
    );
}


ReactDOM.render((
    <BrowserRouter>
        <App/>
    </BrowserRouter>
    ),
    document.getElementById('root')
);