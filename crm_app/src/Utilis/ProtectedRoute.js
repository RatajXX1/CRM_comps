import React from "react";
import {Navigate} from "react-router-dom"
import Server from "./Server";

export class ProtectedRoute extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            Logged: false,
            user_data: null,
            checked: false
        }
    }

    componentDidMount() {
        Server.ApiInstance()
            .get("api/auth/authorize.php")
            .then(
                resp => {
                    if (resp.data.CODE == "OK") {
                        this.setState({Logged: true, user_data: resp.data.DATA, checked: true})
                    } else {
                        this.setState({Logged: false, user_data: null, checked: true})
                    }
                }
            )
            .catch(
                err => {
                    this.setState({Logged: false, user_data: null, checked: true})
                }
            )
    }

    render() {
        if (this.state.checked) {
            if (this.state.Logged) {
                return (React.cloneElement(this.props.children, {User_data : this.state.user_data, history: this.props.history}))
            }
            else return (<Navigate replace to={'/'}/>)
        }
        else return (<h1>Autoryzcja w toku!</h1>)
    }

}