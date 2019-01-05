import React from "react";
import {ColorTheme, HistoryContext} from "../globals";
import StorageManager from "../StorageManager";

class ChronusPage extends React.Component {
    constructor(props){
        super(props);
        if (props.history === undefined) {
            console.log("Warning: no history passed to ChronusPage");
        }
    }

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
            zIndex: 1,
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
                <div style={{marginTop: height - 20}}>""</div>
            </div>
        )
    }
}



export default ChronusPage;