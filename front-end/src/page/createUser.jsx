import React, { Component } from 'react';
import '../App.css';
import { createReader, myCep } from '../services/fetchs';

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
        alert('CEP incorreto!');
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
      // credits: credits,
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(update),
    };
    const result = await createReader(options);
    console.log(result);
    if (result) {
      alert('Usuário criado com sucesso!');
    };
    const { history } = this.props;
    history.push('/skambooks');
  };
  render() {
    const { buttonIsDisabled, address, district, city, state } = this.state;
    return (
      <div className='create-user'>
        <h1>Create User</h1>
        <form className='form'>
          <input type="text" name='name' onChange={this.handleChange} className='email' placeholder='Name' />
          <input type="text" name='zipCode' onChange={this.handleChange} className='email' placeholder='CEP' />
          <input type="text" name='address' disabled value={address} className='email' placeholder='Address' />
          <input type="text" name='number' onChange={this.handleChange} className='email' placeholder='Number' />
          <input type="text" name='complement' className='email' onChange={this.handleChange} placeholder='Complement' />
          <input type="text" name='district' disabled value={district} className='email' placeholder='District' />
          <input type="text" name='city' disabled value={city} className='email' placeholder='City' />
          <input type="text" name='state' disabled value={state} className='email' placeholder='State' />
          <input type="text" name='phone' onChange={this.handleChange} className='email' placeholder='Phone' />
          <input type="text" name='email' onChange={this.handleChange} className='email' placeholder='Email' />
          <input type="text" name='password' onChange={this.handleChange} className='email' placeholder='Password' />
          {/* <input type="text" name='credits' onChange={this.handleChange} className='email' placeholder='Credits'/> */}
          <div className='div-form'>
            <button type="button" disabled={buttonIsDisabled} onClick={this.handleSubmit} className='submit'>Salvar</button>
            <button type="button" onClick={this.handleCancel} className='cancelar'>Cancelar</button>
          </div>
        </form>
      </div>
    )
  }
}
