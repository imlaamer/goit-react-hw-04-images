function EmptyGallery(props) {
  return (
    <div
      style={{
        width: '100vw',
        height: 'calc(100vh - 70px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <p style={{ textAlign: 'center', fontSize: 50, margin: 0 }}>
        Sorry! <br />
        There are no images
      </p>
    </div>
  );
}

export default EmptyGallery;
