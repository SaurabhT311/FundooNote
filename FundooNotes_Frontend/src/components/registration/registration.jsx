import React from 'react';
import './registration.css';
import TextField from '@material-ui/core/TextField'

class Registration extends React.Component {

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
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Registration;