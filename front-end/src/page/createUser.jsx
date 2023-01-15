import React, { Component } from 'react';
import '../App.css';
import { myCep, myFetch } from '../services/fetchs';
import { Button, Input } from 'reactstrap';

const MIN_LENGTH_INPUT = 8;
export default class createUser extends Component {
  state = {
    name: '',
    address: '',
    number: '',
    complement: '',
    zipCode: '',
    district: '',
    city: '',
    state: '',
    phone: '',
    email: '',
    password: '',
    // credits: '',
    buttonIsDisabled: true,
    alert: false,
    alertCep: false,
    alertError: false,
    user: '',
  }
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, async () => {
      const validEmail = /\S+@\S+\.\S+/;
      const { email, password, zipCode } = this.state;
      const result = await myCep(zipCode);
      if (result.erro) {
        this.setState({
          alertCep: true,
        })
      }
      const isDisabled = password.length < MIN_LENGTH_INPUT || !validEmail.test(email);
      this.setState({
        address: result.logradouro,
        buttonIsDisabled: isDisabled,
        district: result.bairro,
        city: result.localidade,
        state: result.uf,
      });
    });
  };

  handleCancel = () => {
    const { history } = this.props;
    history.push('/');
  }
  handleSubmit = async () => {
    const { name, address, number, complement, zipCode,
      district, city, state, phone, email, password } = this.state;
    const update = {
      name: name,
      address: address,
      number: number,
      complement: complement,
      zipCode: zipCode,
      district: district,
      city: city,
      state: state,
      phone: phone,
      email: email,
      password: password,
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(update),
    };
    const { message } = await myFetch(options, 'readers');
    if (message === `Create reader: ${email}`) {
      this.setState({
        alert: true,
        user: message,
      });
    } else {
     this.setState({
      alertError: true,
      user: message,
     });
    };
  };

  closeCep = () => {
    this.setState({
      alertCep: false,
    })
  };

  closeUser = () => {
    this.setState({
      alert: false,
    });
    const { history } = this.props;
      history.push('/');
  };

  closeUserError = () => {
    this.setState({
      alertError: false,
    });
  };
  render() {
    const { buttonIsDisabled, address, district, city, state, alertCep, alert, user, alertError } = this.state;
    return (
      <div className='create-user'>
        <h1>Create User</h1>
        {alertCep ? <div class='alert alert-warning alert-dismisible'>Cep incorrect!
        <button class='close' data-dismiss='alert' onClick={this.closeCep}>&times;</button>
        </div> : null}
        {alert ? <div class='alert alert-success alert-dismisible'>{user}
        <button class='close' data-dismiss='alert' onClick={this.closeUser}>&times;</button>
        </div> : null}
        {alertError ? <div class='alert alert-danger alert-dismisible'>{user}
        <button class='close' data-dismiss='alert' onClick={this.closeUserError}>&times;</button>
        </div> : null}
        <form className='form'>
          <Input type="text" name='name' onChange={this.handleChange} className='email' placeholder='Name' />
          <Input type="text" name='zipCode' onChange={this.handleChange} className='email' placeholder='CEP' />
          <Input type="text" name='address' disabled value={address} className='email' placeholder='Address' />
          <Input type="text" name='number' onChange={this.handleChange} className='email' placeholder='Number' />
          <Input type="text" name='complement' className='email' onChange={this.handleChange} placeholder='Complement' />
          <Input type="text" name='district' disabled value={district} className='email' placeholder='District' />
          <Input type="text" name='city' disabled value={city} className='email' placeholder='City' />
          <Input type="text" name='state' disabled value={state} className='email' placeholder='State' />
          <Input type="text" name='phone' onChange={this.handleChange} className='email' placeholder='Phone' />
          <Input type="text" name='email' onChange={this.handleChange} className='email' placeholder='Email' />
          <Input type="text" name='password' onChange={this.handleChange} className='email' placeholder='Password' />
          {/* <input type="text" name='credits' onChange={this.handleChange} className='email' placeholder='Credits'/> */}
          <div className='div-form'>
            <Button type="button" disabled={buttonIsDisabled} onClick={this.handleSubmit} className='submit' color='success'>Salvar</Button>
            <Button type="button" onClick={this.handleCancel} className='cancelar' color="warning">Cancelar</Button>
          </div>
        </form>
      </div>
    )
  }
}
