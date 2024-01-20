import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { STATUSES } from 'utils/constants';
import * as ImageApi from 'services/images-api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import Loader from './Loader/Loader';
import EmptyGallery from './EmptyGallery/EmptyGallery';

function App() {
  const [status, setStatus] = useState(STATUSES.idle);
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [modalImage, setModalImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [error, setError] = useState(null);
  const galleryRef = useRef(null);

  useEffect(() => {
    if (q === '') return;
    const fetchImages = async () => {
      try {
        setStatus(STATUSES.pending);
        const { hits, totalHits } = await ImageApi.getImages(q, page);
        if (hits.length === 0) {
          setIsEmpty(true);
          setStatus(STATUSES.idle);
          return;
        }
        setImages(prevImages => [...prevImages, ...hits]);
        setIsLoadMore(page < Math.ceil(totalHits / 12));
        setStatus(STATUSES.success);
      } catch (error) {
        setError(error);
        setStatus(STATUSES.error);
      }
    };
    fetchImages();
  }, [q, page]);

  const onSubmit = query => {
    if (query.trim() === '') return alert('Please enter your search term');
    if (query === q) return;
    setQ(query);
    setPage(1);
    setImages([]);
    setIsLoadMore(false);
    setIsEmpty(false);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
    setTimeout(() => {
      if (galleryRef.current) {
        function scrollDownOnLoadMore() {
          const imageHeight =
            galleryRef.current.firstElementChild.getBoundingClientRect().height;
          const topHeight =
            galleryRef.current.firstElementChild.getBoundingClientRect().top;

          const imagesPerCollumn = window.innerHeight / imageHeight;
          console.log(imagesPerCollumn);

          window.scrollTo({
            top: imageHeight * imagesPerCollumn - (30 + 16 * 2) - topHeight, //
            behavior: 'smooth',
          });
        }
        scrollDownOnLoadMore();
      }
    }, 500); //?
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleShowModalImage = imageId => {
    const selectedImage = images.find(image => image.id === imageId);
    setIsModalOpen(true);
    setModalImage(selectedImage);
    setStatus(STATUSES.pending);
  };

  const handleCloseModalImage = () => {
    setIsModalOpen(false);
    setStatus(STATUSES.idle);
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: 16,
        paddingBottom: 24,
      }}
    >
      <Searchbar onSubmit={onSubmit} />

      {images.length > 0 && (
        <ImageGallery
          galleryRef={galleryRef}
          hits={images}
          handleShowModalImage={handleShowModalImage}
        />
      )}

      {isLoadMore && <Button onClick={handleLoadMore} />}

      {isModalOpen && (
        <Modal
          hits={images}
          handleCloseModalImage={handleCloseModalImage}
          modalImage={modalImage}
        />
      )}

      {status === STATUSES.pending && <Loader isModalOpen={isModalOpen} />}

      {status === STATUSES.error && <ErrorMessage error={error.message} />}

      {isEmpty && <EmptyGallery />}

      {images.length > 0 && !isModalOpen && (
        <button
          style={{
            position: 'fixed',
            bottom: 20,
            right: 30,
            borderRadius: '50%',
            width: 60,
            height: 60,
            zIndex: 800,
            backgroundColor: '#3f51b5',
            color: 'white',
          }}
          type="button"
          onClick={scrollToTop}
        >
          Top
        </button>
      )}
    </div>
  );
}

export default App;
