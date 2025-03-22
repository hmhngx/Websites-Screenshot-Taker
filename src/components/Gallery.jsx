const Gallery = ({ images }) => {
    return (
      <div className="gallery-wrapper">
        <h2>📸 Your Screenshot Gallery</h2>
        {images.length > 0 ? (
          <div className="gallery-flex">
            {images.map((image, index) => (
              <div key={index} className="gallery-item">
                <img src={image} alt={`Screenshot ${index + 1}`} className="gallery-image" />
                <div className="gallery-overlay">
                  <span>#{index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-images">Start capturing to build your gallery! 🌟</p>
        )}
      </div>
    )
  }
  
  export default Gallery