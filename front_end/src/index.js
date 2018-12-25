import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

const primaryColor = '#2196F3';

class App extends React.Component {
    render() {
        return (
            <div>
                <NavBar />
                {this.props.children}
            </div>
        )
    }
}

class HomePage extends React.Component {
    render() {
        return (
            <App>
            <div style={{marginTop: '60px', marginLeft: '20px'}}>
                <PollSection text="Your Polls"/>

                <PollSection text="Involved Polls"/>

            </div>
            </App>
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
        <div style={{display: 'inline-block'}}>
            <h2 style={{fontSize: '20px'}}>{props.text}</h2>
            <hr style={{color: primaryColor}}/>
        </div>
        </div>
    );
}

ReactDOM.render(
    <HomePage />,
    document.getElementById('root')
);
