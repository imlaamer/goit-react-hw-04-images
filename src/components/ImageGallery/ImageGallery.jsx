import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

function ImageGallery({ hits, handleShowModalImage, galleryRef }) {
  return (
    <ul className={css.ImageGallery} ref={galleryRef}>
      {hits?.map(({ id, webformatURL, tags }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          tags={tags}
          onClick={() => handleShowModalImage(id)}
        ></ImageGalleryItem>
      ))}
    </ul>
  );
}

export default ImageGallery;
