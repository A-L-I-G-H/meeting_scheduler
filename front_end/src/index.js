import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import Poll from './domain/Poll';
import Api from './api/index';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {Button, Icon} from 'react-materialize';

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
                <div className="container">

                <PollSection title="Your Polls" polls={Api.getMyPolls()}/>
                <PollSection title="Involved Polls" polls={Api.getInvolvedPolls()}/>

                <AddButton
                    onClick={() => setTimeout(() => this.props.history.push('/createPoll'), 400)}
                    color={ColorTheme.secondaryColor}
                    style={{position: 'fixed', bottom: 30, right: 30}}
                />

            </div>
            </Layout>
        );
    }
}

class PollSection extends React.Component {
    render() {
        return (
            <div className="container">

            <div className="row" style={{display: 'inline-block', marginRight: "20px"}}>
                <h2 style={{fontSize: '20px'}}>{this.props.title}</h2>
                <hr style={{color: ColorTheme.primaryColor}}/>
            </div>

            {this.props.polls.map(poll => (
                <div className="row" style={{marginBottom: "-15px"}}>
                    <Poll {...poll}/>
                </div>
            ))}

            </div>
        )
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


function AddButton(props) {
    const style = {...{
        backgroundColor: props.color,
    }, ...props.style};

    return (
        <div style={style} onClick={props.onClick} className="btn-floating btn-large waves-effect waves-light">
            <i className="material-icons">add</i>
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