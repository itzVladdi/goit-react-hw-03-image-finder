import PropTypes from 'prop-types';

import css from './ImageGalleryItem.module.css';

export function ImageGalleryItem({
  webformatURL,
  largeImageURL,
  tags,
  handleModal,
}) {
  return (
    <li
      className={css.ImageGalleryItem}
      onClick={() => handleModal(largeImageURL, tags)}
    >
      <img
        className={css.ImageGalleryItemImage}
        src={webformatURL}
        alt={tags}
      />
    </li>
  );
}

ImageGalleryItem.protoTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  handleModal: PropTypes.func.isRequired,
};
