const APIForm = ({ inputs, handleChange, onSubmit }) => {
  const inputsInfo = [
    "Enter website URL (with or without https://)",
    "Choose format: jpeg, png, or webp",
    "Hide ads? (true/false)",
    "Remove cookie banners? (true/false)",
    "Set width in pixels",
    "Set height in pixels",
  ]

  return (
    <div className="form-wrapper">
      <h2>🎨 Design Your Screenshot</h2>
      <form className="form-container" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
        <div className="form-flex">
          {Object.entries(inputs).map(([category, value], index) => (
            <div className="form-item" key={index}>
              <label htmlFor={category}>{category.replace('_', ' ')}</label>
              <input
                type="text"
                id={category}
                name={category}
                value={value}
                placeholder="Enter value..."
                onChange={handleChange}
                className="textbox"
              />
              <p className="input-info">{inputsInfo[index]}</p>
            </div>
          ))}
        </div>
        <button type="submit" className="submit-btn">
          Capture It! 📷
        </button>
      </form>
    </div>
  )
}

export default APIForm