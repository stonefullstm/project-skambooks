import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';
import { createBooks, getBookIsbn } from '../services/fetchs';
import './exchanges.css';

const MIN_ISBN = 13;
const MIN_YEAR = 4;

class createBook extends Component {
  state = {
    isbn: '',
    title: '',
    year: '',
    pages: '',
    buttonIsDisabled: true,
    authors: [],
    coverUrl: '',
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, async () => {
      const { isbn, year } = this.state;
      const result = await getBookIsbn(isbn);
      /* console.log(result[0].volumeInfo.imageLinks.thumbnail); */
      if (result !== undefined) {
        const isDisabled = isbn.length < MIN_ISBN || year.length < MIN_YEAR;
        let page = '';
        page = result[0].volumeInfo.publishedDate;
        let a = result[0].volumeInfo.authors;
        let author = [];
        a.forEach((item) => author.push({name: item}));
        this.setState({
          buttonIsDisabled: isDisabled,
          title: result[0].volumeInfo.title,
          year: page.slice(0, 4),
          pages: result[0].volumeInfo.pageCount,
          authors: author,
          coverUrl: result[0].volumeInfo.imageLinks.thumbnail,
        });
      }

    });
  };

  handleSubmit = async () => {
    const { isbn, title, year, pages, authors } = this.state;
    console.log(authors);
    const token = localStorage.getItem('token');
    const { history, idReader } = this.props;
    const updated= {
      isbn: isbn,
      title: title,
      year: year,
      pages: pages,
      authors: authors,
      readerId: idReader,
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `${token}`,
      },
      body: JSON.stringify(updated),
    };
    const { message } = await createBooks(options);
    alert(message);
    history.push('/skambooks');
  };

  handleCancel = () => {
    const { history } = this.props;
    history.push('/skambooks');
  };

  render() {

    const { buttonIsDisabled, title, year, pages, isbn, coverUrl } = this.state;
    console.log(title, year, pages, isbn, coverUrl );
    return (
      <div className='create-user'>
        <h1>Create book</h1>
        <form className='form'>
          <input type="text" name='isbn' onChange={this.handleChange} className='email' placeholder='isbn' />
          <input type="text" name='title' onChange={this.handleChange} value={title} className='email' placeholder='title' />
          <input type="text" name='year' onChange={this.handleChange} value={year} className='email' placeholder='year' />
          <input type="text" name='pages' onChange={this.handleChange} value={pages} className='email' placeholder='pages' />
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
  idReader: state.reducerFetch.idReader,
});

export default connect(mapStateToProps)(createBook);
