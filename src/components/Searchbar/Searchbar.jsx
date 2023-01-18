import PropTypes from 'prop-types';

import { Component } from 'react';

import css from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    search: '',
  };

  handleChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  onSubmitForm = event => {
    const { search } = this.state;
    event.preventDefault();
    this.props.handleSubmit(search);
    this.setState({ search: '' });
  };

  render() {
    return (
      <header className={css.Searchbar} onSubmit={this.onSubmitForm}>
        <form className={css.SearchForm}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            value={this.state.search}
            name="search"
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}
Searchbar.protoTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
