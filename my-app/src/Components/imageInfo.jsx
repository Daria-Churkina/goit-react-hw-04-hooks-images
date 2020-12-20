import { useState, useEffect } from 'react';
import api from './api';
import Gallery from './gallery';
import Modal from './modal';
import SearchForm from './searchForm';
import Button from './button';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

function ImageInfo() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [firstFetch, setFirstFetch] = useState(true);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    if (!searchQuery) return;

    setLoading(true);

    api
      .fetchImagesWithQuery(searchQuery, page)
      .then(images => {
        setResults(prevImages => [...prevImages, ...images]);
      })
      .catch(setError('Oops! Try again'))
      .finally(() => {
        setLoading(false);
        setFirstFetch(false);
      });
  }, [searchQuery, page]);

  const handleSearchSubmit = query => {
    setSearchQuery(query);
    setResults([]);
    setPage(1);
    setError(null);
    setFirstFetch(true);
  };

  const openModal = imageUrl => {
    setModalImage(imageUrl);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  const loadMore = () => {
    setLoading(true);
    setPage(prevPage => prevPage + 1);
    scroll();
  };
  const scroll = () => {
    if (!setFirstFetch) {
      window.scrollTo({
        bottom: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <SearchForm onSubmit={handleSearchSubmit} />
      <Gallery images={results} onClick={openModal} />
      {modalImage && <Modal largeImage={modalImage} onClose={closeModal} />}
      <div className="Loader">
        {loading && (
          <Loader type="Oval" color="#00BFFF" height={100} width={100} />
        )}
      </div>
      {results.length > 0 && !loading && <Button onClick={loadMore} />}
    </>
  );
}

export default ImageInfo;
