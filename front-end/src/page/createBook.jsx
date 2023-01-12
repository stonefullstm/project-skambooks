import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';
import { getBookIsbn, myFetch } from '../services/fetchs';
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
    if (name === 'authors') {
      const authors = value.split(',');
      const authorArray = authors.map((author) => {
        return { name: author };
      });
      this.setState({
        authors: authorArray,
      })
    } else {
      this.setState({
        [name]: value,
      }, async () => {
        const { isbn } = this.state;
        const result = await getBookIsbn(isbn);
        if (result) {
          const year = (result[0].volumeInfo.publishedDate) 
            ? result[0].volumeInfo.publishedDate.slice(0, 4) : '';
          const isDisabled = isbn.length < MIN_ISBN || year.length < MIN_YEAR;

          const thumbnail = (result[0].volumeInfo.imageLinks) 
            ? result[0].volumeInfo.imageLinks.thumbnail
            : 'coverbook';
          const { authors } = this.state;
          let a = result[0].volumeInfo.authors;
          let author = [];
          if (!a) {
            let b = [authors];
            b.forEach((item) => author.push({name: item}));
          } else {
            a.forEach((item) => author.push({name: item}));
          }
          this.setState({
            title: result[0].volumeInfo.title,
            year,
            pages: result[0].volumeInfo.pageCount,
            authors: author,
            coverUrl: thumbnail,
            buttonIsDisabled: isDisabled,
          });
        } else {
          const { isbn, year } = this.state;
          const isDisabled = isbn.length < MIN_ISBN || year.length < MIN_YEAR;
          this.setState({
            coverUrl: 'coverbook',
            buttonIsDisabled: isDisabled,
          })
        }
      });
    }
    
  };

  handleSubmit = async () => {
    const { isbn, title, year, pages, authors, coverUrl } = this.state;
    console.log(authors);
    const token = localStorage.getItem('token');
    const { history, idReader } = this.props;
    const updated= {
      isbn: isbn,
      title: title,
      year: year,
      pages: pages,
      authors: authors,
      coverUrl: coverUrl,
      readerId: idReader,
    }
    console.log(updated.coverUrl);
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `${token}`,
      },
      body: JSON.stringify(updated),
    };
    // const { message } = await createBooks(options);
    const { message } = await myFetch(options, 'books');
    alert(message);
    history.push('/');
  };

  handleCancel = () => {
    const { history } = this.props;
    history.push('/skambooks');
  };

  render() {

    const { buttonIsDisabled, title, year, pages, coverUrl, authors } = this.state;
    /* console.log(title, year, pages, isbn, coverUrl ); */
    console.log(authors);
    return (
      <div className='create-user'>
        <h1>Create book</h1>
        <form className='form'>
          <input type="text" name='isbn' onChange={this.handleChange} className='email' placeholder='isbn' />
          <input type="text" name='title' onChange={this.handleChange} value={title} className='email' placeholder='title' />
          <input type="text" name='year' onChange={this.handleChange} value={year} className='email' placeholder='year' />
          <input type="text" name='pages' onChange={this.handleChange} value={pages} className='email' placeholder='pages' />
          <input type="text" name='authors' onChange={this.handleChange} value={authors.map((i) => i.name)} className='email' placeholder='authors' />
          <input type="text" name='coverUrl' onChange={this.handleChange} value={coverUrl} className='email' placeholder='cover URL' />
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
