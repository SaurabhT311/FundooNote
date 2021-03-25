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
            firstnameErr:false,
            firstnameErrMsg:false 
        }
    }


    handleChange = (e) => {
        console.log(e.target.value);
        this.setState({ firstname: e.target.value })
    }

    validationCheck=()=>{
        this.setState({
            firstnameErr:false,
            firstnameErrMsg:false
        })

        if(this.state.firstname.length==0){
            this.setState({firstnameErr:true})
            this.setState({firstnameErrMsg:"Enter first and last name"})
        }
    }

    submit=()=>{
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
                                                firstname="firstname"
                                                onChange={this.handleChange}
                                                error={this.state.firstnameErr}
                                                helperText={this.state.firstnameErrMsg}
                                                variant="outlined"
                                                fullWidth />
                                        </div>


                                        <div className="input">
                                            <TextField id="outlined"
                                                size="small"
                                                label="Last name"
                                                variant="outlined"
                                                fullWidth />

                                        </div>
                                    </div>


                                    <div className="form_input">
                                        <div className="email_Input">
                                            <TextField id="outlined"
                                                size="small"
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
                                                type='password'
                                                variant="outlined"
                                                fullWidth />

                                        </div>
                                        <div className="input">
                                            <TextField id="outlined"
                                                size="small"
                                                label="Confirm"
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
                                    <img src="https://ssl.gstatic.com/accounts/signup/glif/account.svg" height="244" width="270"></img>
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