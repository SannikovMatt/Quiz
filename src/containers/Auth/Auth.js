import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import classes from './Auth.css';
import is from 'is_js';
import { connect } from 'react-redux';
import { auth, errorHandled } from '../../store/Actions/auth';



class Auth extends Component {

    state = {
        errorMessageAuth: null,
        errorMessageAuthHandled: false,
        isFormValid: false,
        isFormTouched:false,
        formControls: {

            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Email is Incorrect',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true

                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Password',
                errorMessage: 'Password is Incorrect',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }


    loginHandler = () => {

        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            true
        );


    }

    registerHandler = () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            false
        );




    }

    componentDidUpdate(previousProps, previousState) {

        if (this.state.isFormValid && this.state.errorMessageAuth) {
            this.setState({ errorMessageAuth: null })
        }
        if (this.props.error && !this.state.errorMessageAuth) {


            const local = { ...this.state }
            local.isFormValid = false
            local.errorMessageAuth = this.props.error
            if (local.errorMessageAuth.email) {
                local.formControls.email.valid = false
            } else if (local.errorMessageAuth.password) {
                local.formControls.password.valid = false
            }



            this.setState({ ...local })
            this.props.errorHandled()



        }


    }

    submitHandler = (event) => {
        event.preventDefault();
    }

    validateControl(value, validation) {

        if (!validation) {
            return true;
        }


        let isValid = true;

        if (validation.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (validation.email) {
            isValid = is.email(value) && isValid
        }
        if (validation.minLength) {

            isValid = value.length >= validation.minLength && isValid;

        }
        return isValid;

    }



    onChangeHandler = (event, controlName) => {

        const formControls = { ...this.state.formControls };
        const control = { ...formControls[controlName] };

        control.value = event.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation)

        formControls[controlName] = control

        let isFormValid = true;

        Object.keys(formControls).forEach(name => {

            isFormValid = formControls[name].valid && isFormValid
        });

        this.setState({

            formControls,
            isFormValid
        })

    }

    renderInputs() {



        return Object.keys(this.state.formControls).map((controlName, index) => {

            const control = this.state.formControls[controlName];
            let errorMsg = control.errorMessage



            if (this.state.errorMessageAuth) {
                errorMsg = this.state.errorMessageAuth.email || this.state.errorMessageAuth.password
            }

            return (
                <Input

                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    errorMessage={errorMsg}
                    shouldValidate={!!control.validation}
                    onChange={(event) => {
                        return this.onChangeHandler(event, controlName)
                    }}

                />
            )
        })
    }
    render() {



        console.log(this.state, 'STATE');
        console.log(this.props, 'PROPS');
        return (
            <div className={classes.Auth}>

                <div>
                    <h1>Authorization</h1>
                    <form onSubmit={this.submitHandler} className={classes.AuthForm}>
                        {this.renderInputs()}

                        <Button
                            type='success'
                            onClick={this.loginHandler}
                            disabled={!this.state.isFormValid}
                        >Log in</Button>
                        <Button
                            type='primary'
                            onClick={this.registerHandler}
                            disabled={!this.state.isFormValid}
                        >Registrate</Button>

                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {



    return {

        ...state.auth
    }
}
function mapDispatchToProps(dispatch) {

    return {

        auth: (email, password, isLoggin) => dispatch(auth(email, password, isLoggin)),
        errorHandled: () => dispatch(errorHandled())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Auth)
