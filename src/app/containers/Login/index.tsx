import * as React from 'react';
import * as Steps from './steps';
import { connect } from 'react-redux';
const s = require('./style.css');

class LoginImpl extends React.Component<any, any> {
  public state = {
    step: 1,
    form: {
      phoneNumber: '',
      authCode: '',
      password: '',
    },
  };

  public nextStep = () => {
    this.setState({
      step: this.state.step + 1,
    });
  }

  public skipStep = (steps: number = 1) => {
    this.setState({
      step: this.state.step + steps,
    });
  }

  public updateForm = state => {
    this.state.form = Object.assign({}, this.state.form, state);
  }

  public form = () => {
    const { auth } = this.props;
    let step = this.state.step;
    if (auth.authenticated) {
      step = 5;
    }

    switch (step) {
      case 1:
        return (
          <Steps.Intro
            nextStep={this.nextStep} />
        );
      case 2:
        return (
          <Steps.PhoneNumber
            form={this.state.form}
            update={this.updateForm}
            nextStep={this.nextStep} />
        );
      case 3:
        return (
          <Steps.AuthCode
            form={this.state.form}
            update={this.updateForm}
            skipStep={this.skipStep} />
        );
      case 4:
        return (
          <Steps.Password
            form={this.state.form}
            update={this.updateForm}
            nextStep={this.nextStep} />
        );
      case 5:
        return <Steps.Success />;
      default:
        return <div />;
    }
  }
  public render() {
    return (
      <div className={s.main}>
        {this.form()}
      </div>
    );
  }
}

const Login = connect<any, any, any>(state => ({ auth: state.auth }))(LoginImpl);

export { Login }
