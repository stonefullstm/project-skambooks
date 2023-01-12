import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';
import { myFetch } from '../services/fetchs';

const MIN_ISBN = 13;
const MIN_YEAR = 4;
class updateBook extends Component {
  state = {
    isbn: '',
    title: '',
    year: '',
    pages: '',
    buttonIsDisabled: true,
  }

  async componentDidMount() {
    const { update: id } = this.props;
    const token = localStorage.getItem('token');
    const options = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `${token}`,
      },
    };
    // const book = await getBookById(update, options);
    const book = await myFetch(options, `books/${id}`);
    // console.log(book.isbn);
    this.setState({
      isbn: book.isbn,
      title: book.title,
      year: book.year,
      pages: book.pages,
    });
  } 

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, () => {
      const { isbn, year } = this.state;
      const isDisabled = isbn.length < MIN_ISBN || year.length < MIN_YEAR;
      this.setState({
        buttonIsDisabled: isDisabled,
      });
    });
  };

  handleSubmit = async () => {
    const { isbn, title, year, pages } = this.state;
    const token = localStorage.getItem('token');
    const { update: id, history } = this.props;
    const updated= {
      isbn: isbn,
      title: title,
      year: year,
      pages: pages,
    }
    const options = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `${token}`,
      },
      body: JSON.stringify(updated),
    };
    // const { message } = await updateBooks(update, options);
    const { message } = await myFetch(options, `books/${id}`);
    alert(message);
    history.push('/skambooks');
  };


  handleCancel = () => {
    const { history } = this.props;
    history.push('/skambooks');
  };

  render() {
    const { isbn, title, year, pages, buttonIsDisabled } = this.state;
    return (
      <div className='create-user'>
        <h1>Update book</h1>
        <form className='form'>
          <input type="text" name='isbn' value={isbn} onChange={this.handleChange} className='email' placeholder='isbn' />
          <input type="text" name='title' value={title} onChange={this.handleChange} className='email' placeholder='title' />
          <input type="text" name='year' value={year} onChange={this.handleChange} className='email' placeholder='year' />
          <input type="text" name='pages' value={pages} onChange={this.handleChange} className='email' placeholder='pages' />
          <div className='div-form'>
            <button type="button" disabled={buttonIsDisabled} onClick={this.handleSubmit} className='submit'>Salvar</button>
            <button type="button" onClick={this.handleCancel} className='cancelar'>Cancelar</button>
          </div>
        </form>
      </div>
    )
  }
};

const mapStateToProps = (state) => ({
  update: state.reducerFetch.update,
});

export default connect(mapStateToProps)(updateBook);
