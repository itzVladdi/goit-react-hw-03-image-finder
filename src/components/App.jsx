import { Component } from 'react';

import css from './App.module.css';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';
import { fetchPhoto } from 'services/pixabayApi';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    photos: [],
    query: '',
    page: 1,
    modalImg: null,
    modalImgTags: null,
    totalHits: null,
    error: null,
    isEmpty: false,
    isLoading: false,
    imagePerPage: 12,
  };

  handleSubmit = searchQuery => {
    this.setState({
      query: searchQuery,
      photos: [],
      page: 1,
      error: null,
      isEmpty: false,
    });
  };

  handleModal = (modalImageURL = null, tags = null) => {
    this.setState({
      modalImg: modalImageURL,
      modalImgTags: tags,
    });
  };

  onBtnClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({ isLoading: true });
        const data = await fetchPhoto(query, page);
        this.setState(prevState => ({
          photos: [...prevState.photos, ...data.hits],
          totalHits: data.totalHits,
          isEmpty: !(data.totalHits > 0),
        }));
      } catch (error) {
        this.setState({ error: error.message });
        alert(error.message);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  render() {
    const {
      photos,
      query,
      page,
      isEmpty,
      modalImg,
      modalImgTags,
      totalHits,
      imagePerPage,
      error,
    } = this.state;
    return (
      <div className={css.App}>
        <Searchbar handleSubmit={this.handleSubmit} />
        {isEmpty && (
          <p style={{ textAlign: 'center' }}>
            Sorry, we couldn't find a match for your request - <b>"{query}"</b>.
          </p>
        )}
        {error && <p style={{ textAlign: 'center' }}>{error}</p>}
        {this.state.isLoading && <Loader />}
        {photos.length > 0 && (
          <ImageGallery>
            {photos.map(({ id, webformatURL, largeImageURL, tags }) => (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                tags={tags}
                handleModal={this.handleModal}
              />
            ))}
          </ImageGallery>
        )}
        {page < Math.ceil(totalHits / imagePerPage) && (
          <Button onBtnClick={this.onBtnClick} />
        )}
        {modalImg && (
          <Modal
            modalImg={modalImg}
            modalImgTags={modalImgTags}
            handleModal={this.handleModal}
          />
        )}
      </div>
    );
  }
}
