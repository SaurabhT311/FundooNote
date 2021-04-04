import React from 'react';
import { Link } from 'react-router-dom';
import './forgot_pass.css';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import Service from '../../services/userService';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
const service = new Service();

function Alert(props) {
    return <MuiAlert variant="filled" {...props} />
}

class ForgotPassword extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            emailErr: false,
            emailErrMsg: '',

            snackbarMsg: '',
            snackType: '',
            open: false,
        }
    }

    handleChange = (e) => {
        console.log(e.target.value);
        this.setState({ [e.target.name]: e.target.value })

    }

    validationCheck = () => {
        this.setState({
            emailErr: false,
            emailErrMsg: "",

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
        return isError;
    }


    submit = () => {
        let check = this.validationCheck();
        if (!check) {
            let data = {
                "email": this.state.email,
            }
            console.log("data is", data);

            service.forgotPassword(data).then((result) => {
                console.log(result);
                this.setState({ snackType: "success", snackbarMsg: "Please check your mail", open: true });
            }).catch((error) => {
                console.log(error);
                this.setState({ snackType: "error", snackbarMsg: error.response.data.message , open: true });
            })
        }
        else{
            console.log("api failed");
            this.setState({ snackType: "error", snackbarMsg: "Something went wrong", open: true });
        }
    }


    render() {
        return (
            <div className="forgot_container">
                <div className="forgot_border">
                    <div className="forgot_box">
                        <div className="box_input">
                            <div className="logo">
                                <font color="#1976d2"><b>F</b></font>
                                <font color="#FF0000"><b>u</b></font>
                                <font color="#FFD700"><b>n</b></font>
                                <font color="#1976d2"><b>d</b></font>
                                <font color="#FF0000 "><b>o</b></font>
                                <font color="#006400"><b>o</b></font>
                            </div>
                            <div>
                                <h1 className="h1">Forgot Password</h1>
                            </div>
                            <div className="forgot_form_field">
                                <form className="form">
                                    <div className="forgot_form_input">
                                        <div className="forgot_input">
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
                                    </div>

                                    <div className="footer">
                                        <div className="signIn">
                                            <Button color="primary">
                                                <Link to={{ pathname: '/login' }}>  <b>
                                                    Login
                                                    </b></Link>
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
                <Snackbar autoHideDuration={2000} open={this.state.open}>
                    <Alert severity={this.state.snackType}>
                        {this.state.snackbarMsg}
                    </Alert>
                </Snackbar>
            </div>
        )
    }


}

export default ForgotPassword;