import React from 'react';
import './registration.css';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';

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
            confirmPasswordErrMsg: ''

        }
    }


    handleChange = (e) => {
        console.log(e.target.value);
        this.setState({ [e.target.name]: e.target.value })

    }

    validationCheck = () => {
        this.setState({
            firstnameErr: false,
            firstnameErrMsg: false
        })

        this.setState({
            lastnameErr: false,
            lastnameErrMsg: ""
        })

        this.setState({
            emailErr: false,
            emailErrMsg: ""
        })

        this.setState({
            passwordErr: false,
            passwordErrMsg: ""
        })

        this.setState({
            confirmPasswordErr: false,
            confirmPasswordErrMsg: ""
        })

        if (this.state.firstname.length === 0) {
            this.setState({ firstnameErr: true })
            this.setState({ firstnameErrMsg: "Enter first name" })
        }

        if (this.state.lastname.length === 0) {
            this.setState({ lastnameErr: true })
            this.setState({ lastnameErrMsg: "Enter last name" })
        }

        if (!/[a-zA-Z0-9._]+[@]{1}[a-zA-Z120-9]*[.]{1}[a-zA-Z]*$/.test(this.state.email)) {
            this.setState({ emailErr: true })
            this.setState({ emailErrMsg: "Enter valid email" })
        }

        if (this.state.email.length === 0) {
            this.setState({ emailErr: true })
            this.setState({ emailErrMsg: "Enter email" })
        }

        if (this.state.password.length === 0) {
            this.setState({ passwordErr: true })
            this.setState({ passwordErrMsg: "Enter a password" })
        }

        if (this.state.password != this.state.confirmPassword) {
            this.setState({
                confirmPasswordErr: true,
                confirmPasswordErrMsg: "passwords didn't match"
            })

        }
    }

    submit = () => {
        this.validationCheck();
    }


    render() {
        return (

            <div className="container">
                <div className="border">
                    <div className="box">
                        <div className="box_input">
                            <div className="logo">
                                <font color="#1976d2"><b>F</b></font>
                                <font color="#FF0000"><b>u</b></font>
                                <font color="#FFD700"><b>n</b></font>
                                <font color="#1976d2"><b>d</b></font>
                                <font color="#FF0000 "><b>o</b></font>
                                <font color="#006400"><b>o</b></font>
                            </div>
                            <h1 className="h1">Create your Fundoo Account</h1>
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
                                                type='password'
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
                                                type="password"
                                                variant="outlined"
                                                fullWidth />
                                        </div>
                                    </div>

                                    <span className="checkBox">
                                        <Checkbox
                                            color="primary"
                                            className="check"
                                        />
                                            Show Password

                                    </span>

                                    <div className="footer">
                                        <div className="signIn">
                                            <Button color="primary">
                                                <b>
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
            </div>
        )
    }
}

export default Registration;