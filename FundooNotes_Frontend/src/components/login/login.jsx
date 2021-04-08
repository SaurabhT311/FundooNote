import React from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Service from '../../services/userService';
const service = new Service();


function Alert(props) {
    return <MuiAlert variant="filled" {...props} />
}


class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            emailErr: false,
            emailErrMsg: '',

            password: '',
            passwordErr: false,
            passwordErrMsg: '',

            snackbarMsg: '',
            snackType: '',
            open: false,
        }
    }

    handleChange = (e) => {
        console.log(e.target.value);
        this.setState({ [e.target.name]: e.target.value })
    }

    checkBox = () => {
        this.setState({ showPassword: !this.state.showPassword })
    }

    nextPath(path){
        this.props.history.push(path);
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

            service.login(data).then((result) => {
                console.log("result is:", result);
                localStorage.setItem("FirstName", result.data.data.firstName);
                localStorage.setItem("LastName", result.data.data.lastName);
                localStorage.setItem("email", result.data.data.email);
                localStorage.setItem("token", result.data.data.token);
                this.setState({ snackType: "success", snackbarMsg: "Login successfull", open: true });
                setTimeout(() => {
                    this.nextPath('../dashboard');
                },
                    1500);

            }).catch((error) => {
                console.log("error is:", error);
                this.setState({ snackType: "error", snackbarMsg: error.response.data.message, open: true });

            })
        }
        else {
            console.log("api failed");
            this.setState({ snackType: "error", snackbarMsg: "Login Failed", open: true });
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
                                        <div className="input_field1">
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

                                        <div className="input_field1">
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
                                            <Button variant="contained" color="primary" onClick={this.submit}>
                                                Submit </Button>
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <Snackbar open={this.state.open}>
                    <Alert severity={this.state.snackType}>
                        {this.state.snackbarMsg}
                    </Alert>
                </Snackbar>
            </div>
        )
    }

}


export default Login;