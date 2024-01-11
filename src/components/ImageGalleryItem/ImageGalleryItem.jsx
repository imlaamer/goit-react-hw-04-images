import css from './ImageGalleryItem.module.css';

function ImageGalleryItem({ webformatURL, tags, onClick }) {
  const { ImageGalleryItem, ImageGalleryItemImage } = css;

  return (
    <li className={ImageGalleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        className={ImageGalleryItemImage}
        onClick={onClick}
      />
    </li>
  );
}

export default ImageGalleryItem;
