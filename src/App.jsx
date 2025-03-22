import { useState, useEffect } from 'react'
import './App.css'
import APIForm from './Components/APIForm'
import Gallery from './Components/Gallery'

function App() {
  const [inputs, setInputs] = useState({
    url: "", format: "", no_ads: "", no_cookie_banners: "", width: "", height: "",
  })
  const [currentImage, setCurrentImage] = useState(null)
  const [prevImages, setPrevImages] = useState([])
  const [quota, setQuota] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [isQuotaLoading, setIsQuotaLoading] = useState(true) 
  
  const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY

  const reset = () => {
    setInputs({
      url: "", format: "", no_ads: "", no_cookie_banners: "", width: "", height: "",
    })
    setErrorMessage(null)
  }

  const getQuota = async (setError = false) => {
    try {
      setIsQuotaLoading(true)
      const response = await fetch(`https://api.apiflash.com/v1/quota?access_key=${ACCESS_KEY}`)
      if (!response.ok) throw new Error(`Quota fetch failed: ${response.status}`)
      const json = await response.json()
      setQuota(json)
      setIsQuotaLoading(false)
    } catch (error) {
      console.error("Error fetching quota:", error)
      setIsQuotaLoading(false)
      if (setError) {
        setErrorMessage("Failed to fetch quota. Check your API key or network.")
      }
    }
  }

  const callAPI = async (query) => {
    try {
      const response = await fetch(query)
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`API call failed with status ${response.status}: ${errorText}`)
      }
      const json = await response.json()
      if (!json.url) {
        console.error("No URL in response:", json)
        setErrorMessage("API didn’t return a screenshot URL. Check your inputs or quota.")
      } else {
        setCurrentImage(json.url)
        setPrevImages((images) => [...images, json.url])
        reset()
        getQuota(true) 
      }
    } catch (error) {
      console.error("API Error:", error.message)
      setErrorMessage(error.message)
    }
  }

  const makeQuery = () => {
    let wait_until = "network_idle"
    let response_type = "json"
    let fail_on_status = "400%2C404%2C500-511"
    let cleanURL = inputs.url.replace(/^(https?:\/\/)/i, '')
    let fullURL = `https://${cleanURL}`

    let query = `https://api.apiflash.com/v1/urltoimage?access_key=${ACCESS_KEY}&url=${fullURL}&format=${inputs.format}&width=${inputs.width}&height=${inputs.height}&no_cookie_banners=${inputs.no_cookie_banners}&no_ads=${inputs.no_ads}&wait_until=${wait_until}&response_type=${response_type}&fail_on_status=${fail_on_status}`
    callAPI(query)
  }

  const submitForm = () => {
    let defaultValues = { format: "jpeg", no_ads: "true", no_cookie_banners: "true", width: "1920", height: "1080" }
    
    if (!inputs.url || inputs.url.trim() === "") {
      setErrorMessage("URL is required!")
      return
    }
    if (inputs.width && isNaN(inputs.width)) {
      setErrorMessage("Width must be a number!")
      return
    }
    if (inputs.height && isNaN(inputs.height)) {
      setErrorMessage("Height must be a number!")
      return
    }

    const validatedInputs = { ...inputs }
    for (const [key, value] of Object.entries(validatedInputs)) {
      if (value === "") validatedInputs[key] = defaultValues[key]
    }
    setInputs(validatedInputs)
    makeQuery()
  }

  useEffect(() => {
    getQuota(false) 
  }, [])

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>✨ Screenshot Studio 📸</h1>
        {isQuotaLoading ? (
          <div className="quota">Loading quota...</div>
        ) : quota ? (
          <div className="quota">
            Quota: {quota.remaining} / {quota.limit} (Resets: {new Date(quota.reset * 1000).toLocaleDateString()})
          </div>
        ) : null}
      </header>
      
      <main className="app-main">
        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}
        <APIForm
          inputs={inputs}
          handleChange={(e) => setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value.trim() }))}
          onSubmit={submitForm}
        />

        {currentImage && (
          <section className="current-screenshot">
            <h2>Latest Capture</h2>
            <img src={currentImage} alt="Latest screenshot" className="screenshot animate-in" />
          </section>
        )}

        <section className="query-status container">
          <h3>🎨 Current Query Preview</h3>
          <p className="query-text">
            https://api.apiflash.com/v1/urltoimage?access_key=***<br />
            &url={inputs.url || 'waiting...'}<br />
            &format={inputs.format || 'jpeg'}<br />
            &width={inputs.width || '1920'}<br />
            &height={inputs.height || '1080'}<br />
            &no_cookie_banners={inputs.no_cookie_banners || 'true'}<br />
            &no_ads={inputs.no_ads || 'true'}
          </p>
        </section>

        <section className="gallery-section container">
          <Gallery images={prevImages} />
        </section>
      </main>
    </div>
  )
}

export default App