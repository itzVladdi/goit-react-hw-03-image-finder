import PropTypes from 'prop-types';

import { Component } from 'react';

import css from './Modal.module.css';

export class Modal extends Component {
  handleClick = event => {
    if (event.target === event.currentTarget) {
      this.props.handleModal();
    }
  };

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.handleModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  render() {
    return (
      <div className={css.Overlay} onClick={this.handleClick}>
        <div className={css.Modal}>
          <img
            src={this.props.modalImg}
            alt={this.props.modalImgTags}
            onClick={this.handleClick}
          />
        </div>
      </div>
    );
  }
}

Modal.protoTypes = {
  modalImg: PropTypes.string.isRequired,
  modalImgTags: PropTypes.string.isRequired,
  handleModal: PropTypes.func.isRequired,
};
