import React from 'react';
import {Link} from 'react-router-dom';
import './reset_pass.css';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';

import Service from '../../services/userService';
import Checkbox from '@material-ui/core/Checkbox';
import { IconButton, Snackbar } from '@material-ui/core';
const service = new Service();

class ResetPassword extends React.Component {
    constructor(props,{match}) {
        super(props)
        
        this.state = {
            password: '',
            passwordErr: false,
            passwordErrMsg: '',

            confirmPassword: '',
            confirmPasswordErr: false,
            confirmPasswordErrMsg: '',

            
            showPassword: false,

            // snackbaropen:false,
            // snakbarMsg:''
        }
    }

    // snackbarClose=(e)=>{
    //     this.setState({snackbaropen:false});
    // }

    handleChange = (e) => {
        console.log(e.target.value);
        this.setState({ [e.target.name]: e.target.value })

    }

    validationCheck = () => {
        this.setState({
            passwordErr: false,
            passwordErrMsg: "",

            confirmPasswordErr: false,
            confirmPasswordErrMsg: ""

        })

        let isError=false;
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


    submit = () => {
      let check=  this.validationCheck();
        if(!check){
        let data = {
            "password": this.state.password,
            "confirmPassword":this.state.confirmPassword
        }
        console.log("data is", data);
        console.log("props is:",this.props)
        let token=this.props.match.params.token;
        console.log("token is:",token);
        service.resetPassword(data,token).then((result) => {
            console.log("result is:",result)
        }).catch((error) => {
            console.log(error);
        
        })
        }
    }


    render() {
        return (
            <div className="login_container">
                {/* <Snackbar 
                anchorOrigin={{vertical:'center',horizontal:'center'}}
                open={this.state.snackbaropen}
                autoHideDuration={3000}
                onClose={this.snackbarClose}
                message ={<span id="message-id">{this.state.snakbarMsg}</span>}
                action={[
                    <IconButton
                    key="close"
                    arial-label="Close"
                    color="inherit"
                    onClick={this.snackbarClose}>
                        x
                    </IconButton>

                ]}
                /> */}
                <div className="reset_border">
                    <div className="reset_box">
                        <div className="reset_box_input">
                            <div className="logo">
                                <font color="#1976d2"><b>F</b></font>
                                <font color="#FF0000"><b>u</b></font>
                                <font color="#FFD700"><b>n</b></font>
                                <font color="#1976d2"><b>d</b></font>
                                <font color="#FF0000 "><b>o</b></font>
                                <font color="#006400"><b>o</b></font>
                            </div>
                            <div>
                                <h1 className="h1">Reset Password</h1>
                            </div>
                            <div className="reset_form_field">
                                <form className="reset_form">
                                <div className="reset_form_input">
                                        <div className="reset_input">
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

                                        <div className="reset_form_input">
                                        <div className="reset_input">
                                        <TextField id="outlined"
                                                size="small"
                                                label="Confirm Password"
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
                                            <Button color="primary">
                                               <Link to={{pathname: '/login'}}> <b>
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
            </div>
        )
    }


}

export default ResetPassword;