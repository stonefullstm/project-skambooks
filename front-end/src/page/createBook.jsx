import React, { Component } from 'react';
import '../App.css';
import './exchanges.css';
import { getBookIsbn, createBooks } from '../services/fetchs';

const MIN_ISBN = 13;
const MIN_YEAR = 4;

export default class createBook extends Component {
  state = {
    isbn: '',
    title: '',
    year: '',
    pages: '',
    buttonIsDisabled: true,
    authors: [],
  };

  async componentDidMount() {
    const result = await getBookIsbn(9780593437810);
    console.log(result);
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, async () => {
      const { isbn, year } = this.state;
      const result = await getBookIsbn(isbn);
      if (result !== undefined) {
        const isDisabled = isbn.length < MIN_ISBN || year.length < MIN_YEAR;
        let page = '';
        page = result[0].volumeInfo.publishedDate;
        let a = result[0].volumeInfo.authors;
        let author = [];
        a.forEach((item) => author.push(item));
        this.setState({
          buttonIsDisabled: isDisabled,
          title: result[0].volumeInfo.title,
          year: page.slice(0, 4),
          pages: result[0].volumeInfo.pageCount,
          authors: author,
        });
      } else {
        alert('ISBN do not exist!')
      }

    });
  };

  handleSubmit = async () => {
    const { isbn, title, year, pages, authors } = this.state;
    const token = localStorage.getItem('token');
    const { history } = this.props;
    const updated= {
      isbn: isbn,
      title: title,
      year: year,
      pages: pages,
      authors: authors,
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

    const { buttonIsDisabled, title, year, pages, isbn, authors } = this.state;
    console.log(title, year, pages, isbn, authors );
    return (
      <div className='create-user'>
        <h1>Create book</h1>
        <form className='form'>
          <input type="text" name='isbn' onChange={this.handleChange} className='email' placeholder='isbn' />
          <input type="text" name='title' value={title} disabled className='email' placeholder='title' />
          <input type="text" name='year' value={year} disabled className='email' placeholder='year' />
          <input type="text" name='pages' value={pages} disabled className='email' placeholder='pages' />
          <div className='div-form'>
            <button type="button" disabled={buttonIsDisabled} onClick={this.handleSubmit} className='submit'>Salvar</button>
            <button type="button" onClick={this.handleCancel} className='cancelar'>Cancelar</button>
          </div>
        </form>
      </div>
    )
  }
}
