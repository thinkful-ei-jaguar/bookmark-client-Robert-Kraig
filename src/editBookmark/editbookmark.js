import React, { Component } from  'react';
import config from '../config'
import '../AddBookmark/AddBookmark.css';

const Required = () => (
  <span className='AddBookmark__required'>*</span>
)

class EditBookmark extends Component {
  static defaultProps = {
    onAddBookmark: () => {}
  };

  state = {
    error: null,
    title:this.props.book.title,
    url:this.props.book.url,
    description:this.props.book.description,
    rating:this.props.book.rating,
  };

  onChangetitle =e=> {
      this.setState({
          title:e.target.value,
      })
  } 
  onChangeUrl =e=> {
    this.setState({
        url:e.target.value,
    })
} 
onChangeDescription =e=> {
    this.setState({
        description:e.target.value,
    })
} 
onChangerating =e=> {
    this.setState({
        rating:e.target.value,
    })
} 


  handleSubmit = e => {
    e.preventDefault()
    // get the form fields from the event
    const { title, url, description, rating } = e.target
    const bookmark = {
      title: title.value,
      url: url.value,
      desc: description.value,
      rating: rating.value,
    }
    console.log(bookmark);
    this.setState({ error: null })
    fetch(config.API_ENDPOINT+`/${this.props.book.id}`, {
      method: 'PATCH',
      body: JSON.stringify(bookmark),
      headers: {
        'content-type': 'application/json',
        //'authorization': `bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          // get the error message from the response,
          return res.json().then(error => {
            // then throw it
            throw error
          })
        }
        return res.json()
      })
      .then(data => {
        title.value = ''
        url.value = ''
        description.value = ''
        rating.value = ''
        this.props.onUpdateBookmark(data)
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  render() {
    const { error } = this.state
    const { onClickCancel } = this.props
    return (
      <section className='AddBookmark'>
        <h2>Edit a bookmark</h2>
        <form
          className='AddBookmark__form'
          onSubmit={this.handleSubmit}
        >
          <div className='AddBookmark__error' role='alert'>
            {error && <p>{error.message}</p>}
          </div>
          <div>
            <label htmlFor='title'>
              Title
              {' '}
              <Required />
            </label>
            <input
              type='text'
              name='title'
              id='title'
              value={this.state.title}
              onChange={this.onChangetitle}
              required
            ></input>
          </div>
          <div>
            <label htmlFor='url'>
              URL
              {' '}
              <Required />
            </label>
            <input
              type='url'
              name='url'
              id='url'
              value={this.state.url}
              onChange={this.onChangeUrl}
              required
            ></input>
          </div>
          <div>
            <label htmlFor='description'>
              Description
            </label>
            <textarea
              name='description'
              id='description'
              onChange={this.onChangeDescription}
              value={this.state.description}
            />
          </div>
          <div>
            <label htmlFor='rating'>
              Rating
              {' '}
              <Required />
            </label>
            <input
              type='number'
              name='rating'
              id='rating'
              defaultValue='1'
              onChange={this.onChangerating}
              value={this.state.rating}
              min='1'
              max='5'
              required
            ></input>
          </div>
          <div className='AddBookmark__buttons'>
            <button type='button' onClick={onClickCancel}>
              Cancel
            </button>
            {' '}
            <button type='submit'>
              Save
            </button>
          </div>
        </form>
      </section>
    );
  }
}

export default EditBookmark;