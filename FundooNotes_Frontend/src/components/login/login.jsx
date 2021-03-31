import React from 'react';
import {Link} from 'react-router-dom';
import './login.css';
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Service from '../../services/userService';
const service = new Service();

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            emailErr: false,
            emailErrMsg: '',

            password: '',
            passwordErr: false,
            passwordErrMsg: ''
        }
    }

    handleChange = (e) => {
        console.log(e.target.value);
        this.setState({ [e.target.name]: e.target.value })
    }

    checkBox = () => {
        this.setState({ showPassword: !this.state.showPassword })
    }

    validationCheck = () => {
        this.setState({
            emailErr: false,
            emailErrMsg: "",

            passwordErr: false,
            passwordErrMsg: ""
        })

        let isError = false;

        if (!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(this.state.email)) {
            this.setState({ emailErr: true })
            this.setState({ emailErrMsg: "Enter a valid email" })
            isError = true;
        }

        if (this.state.email.length === 0) {
            this.setState({ emailErr: true })
            this.setState({ emailErrMsg: "Enter email" })
            isError = true;
        }

        if (this.state.password.length === 0) {
            this.setState({ passwordErr: true })
            this.setState({ passwordErrMsg: "Enter a password" })
            isError = true;
        }
        return isError;
    }


    submit = () => {
        const check = this.validationCheck();
        if (!check) {
            let data = {
                "email": this.state.email,
                "password": this.state.password
            }
            console.log("data is", data);

            service.login(data).then((result) => {

                console.log("result is:",result);
            }).catch((error) => {
                console.log(error);
            })
        }
    }


    render() {
        return (
            <div className="login_container">
                <div className="borders">
                    <div className="box_field">
                        <div className="box_Input">
                            <div className="logo">
                                <font color="#1976d2"><b>F</b></font>
                                <font color="#FF0000"><b>u</b></font>
                                <font color="#FFD700"><b>n</b></font>
                                <font color="#1976d2"><b>d</b></font>
                                <font color="#FF0000 "><b>o</b></font>
                                <font color="#006400"><b>o</b></font>
                            </div>
                            <div>
                                <h1 className="h1">Sign In</h1>
                                <h1 className="h1">Use Your Fundoo Account</h1>
                            </div>
                            <div className="form_Field">
                                <form className="form">
                                    <div className="form_Input">
                                        <div className="input_field">
                                            <TextField id="outlined"
                                                size="small"
                                                label="Usermail"
                                                name="email"
                                                onChange={this.handleChange}
                                                error={this.state.emailErr}
                                                helperText={this.state.emailErrMsg}
                                                variant="outlined"
                                                fullWidth />
                                        </div>

                                        <div className="input_field">
                                            <TextField id="outlined"
                                                size="small"
                                                label="Password"
                                                name="password"
                                                onChange={this.handleChange}
                                                error={this.state.passwordErr}
                                                helperText={this.state.passwordErrMsg}
                                                type={this.state.showPassword ? "text" : "password"}
                                                variant="outlined"
                                                fullWidth />
                                        </div>
                                    </div>

                                    <div className="checkBox" onClick={this.checkBox}>
                                        <Checkbox
                                            color="primary"
                                            className="check" />
                                            Show Password
                                    </div>

                                    <div className="forgot">
                                        <Button color="primary">
                                        <Link to={{ pathname: '/forgotpassword' }}> <b>
                                                Forgot Password
                                                    </b></Link>
                                        </Button>
                                    </div>

                                    <div className="footer">
                                        <div className="signIn">
                                            <Button color="primary">
                                                <Link to={{ pathname: '/registration' }}><b>
                                                    Create Account
                                                    </b> </Link>
                                            </Button>
                                        </div>
                                        <div className="button">
                                            <Button variant="contained" color="primary" onClick={this.submit}>Submit</Button>
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}


export default Login;