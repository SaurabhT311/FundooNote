import React from 'react';
import { Link } from 'react-router-dom';
import './registration.css';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Checkbox from '@material-ui/core/Checkbox';
import Service from '../../services/userService';
const service = new Service();

function Alert(props) {
    return <MuiAlert variant="filled" {...props} />
}

class Registration extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstname: '',
            firstnameErr: false,
            firstnameErrMsg: '',

            lastname: '',
            lastnameErr: false,
            lastnameErrMsg: '',

            email: '',
            emailErr: false,
            emailErrMsg: '',

            password: '',
            passwordErr: false,
            passwordErrMsg: '',

            confirmPassword: '',
            confirmPasswordErr: false,
            confirmPasswordErrMsg: '',

            showPassword: false,

            snackbarMsg: '',
            snackType: '',
            open: false,

        }
    }

    handleChange = (e) => {
        console.log(e.target.value);
        this.setState({ [e.target.name]: e.target.value })

    }

    nextPath(path) {
        this.props.history.push(path);
    }

    validationCheck = () => {

        this.setState({
            firstnameErr: false,
            firstnameErrMsg: "",

            lastnameErr: false,
            lastnameErrMsg: "",

            emailErr: false,
            emailErrMsg: "",

            passwordErr: false,
            passwordErrMsg: "",

            confirmPasswordErr: false,
            confirmPasswordErrMsg: ""
        })

        let isError = false


        if (this.state.firstname.length === 0) {
            this.setState({ firstnameErr: true })
            this.setState({ firstnameErrMsg: "Enter first name" })
            isError = true;
        }


        if (this.state.lastname.length === 0) {
            this.setState({ lastnameErr: true })
            this.setState({ lastnameErrMsg: "Enter last name" })
            isError = true;
        }

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

        if (!/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{4,}$/.test(this.state.password)) {
            this.setState({ passwordErr: true })
            this.setState({ passwordErrMsg: "Please enter valid password" })
            isError = true;
        }

        if (this.state.password.length === 0) {
            this.setState({ passwordErr: true })
            this.setState({ passwordErrMsg: "Enter a password" })
            isError = true;
        }

        if (this.state.password !== this.state.confirmPassword) {
            this.setState({
                confirmPasswordErr: true,
                confirmPasswordErrMsg: "passwords didn't match"
            })
            isError = true;
        }
        return isError;
    }

    checkBox = () => {
        this.setState({ showPassword: !this.state.showPassword })
    }

    submit = (e) => {

        const check = this.validationCheck();
        if (!check) {
            let data = {
                "firstName": this.state.firstname,
                "lastName": this.state.lastname,
                "email": this.state.email,
                "password": this.state.password
            }
            service.registration(data).then((result) => {
                console.log(result);
                this.setState({ snackType: "success", snackbarMsg: "Registration successfull", open: true });

            }).catch((error) => {
                console.log(error);
                this.setState({ snackType: "error", snackbarMsg: error.response.data.message, open: true });
            })
        } else {
            console.log("api failed");
            this.setState({ snackType: "error", snackbarMsg: "Registration Failed", open: true });
        }
    }

    render() {
        return (
            <div className="container">
                <div className="border">
                    <div className="box">
                        <div className="box_input">
                            <div className="reg_logo">
                                <font color="#1976d2"><b>F</b></font>
                                <font color="#FF0000"><b>u</b></font>
                                <font color="#FFD700"><b>n</b></font>
                                <font color="#1976d2"><b>d</b></font>
                                <font color="#FF0000 "><b>o</b></font>
                                <font color="#006400"><b>o</b></font>
                            </div>
                            <h1 className="reg_h1">Create your Fundoo Account</h1>
                            <div className="form_field">
                                <form className="form">
                                    <div className="form_input">
                                        <div className="input">
                                            <TextField id="outlined"
                                                size="small"
                                                label="First name"
                                                name="firstname"
                                                onChange={this.handleChange}
                                                error={this.state.firstnameErr}
                                                helperText={this.state.firstnameErrMsg}
                                                variant="outlined"
                                                fullWidth />
                                        </div>


                                        <div className="input">
                                            <TextField id="outlined"
                                                size="small"
                                                name="lastname"
                                                onChange={this.handleChange}
                                                error={this.state.lastnameErr}
                                                helperText={this.state.lastnameErrMsg}
                                                label="Last name"
                                                variant="outlined"
                                                fullWidth />
                                        </div>
                                    </div>


                                    <div className="form_input">
                                        <div className="email_Input">
                                            <TextField id="outlined"
                                                size="small"
                                                name="email"
                                                onChange={this.handleChange}
                                                error={this.state.emailErr}
                                                helperText={this.state.emailErrMsg}
                                                label="Usermail"
                                                variant="outlined"
                                                fullWidth />
                                        </div>
                                    </div>


                                    <div className="form_input">
                                        <div className="input">
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

                                        <div className="input">
                                            <TextField id="outlined"
                                                size="small"
                                                label="Confirm"
                                                name="confirmPassword"
                                                onChange={this.handleChange}
                                                error={this.state.confirmPasswordErr}
                                                helperText={this.state.confirmPasswordErrMsg}
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

                                    <div className="footer">
                                        <div className="signIn">
                                            <Button color="primary"
                                                onClick={() => this.nextPath('/login')}><b>
                                                    Sign in instead
                                                    </b>
                                            </Button>
                                        </div>
                                        <div className="button">
                                            <Button variant="contained" color="primary" onClick={this.submit}>Submit</Button>
                                        </div>
                                    </div>
                                </form>
                                <div className="image_field">
                                    <img src="https://ssl.gstatic.com/accounts/signup/glif/account.svg" alt="google" height="225"></img>
                                    <p className="text_field">
                                        One Account. All of Fundoo working for you
                                   </p>
                                </div>
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


export default Registration;