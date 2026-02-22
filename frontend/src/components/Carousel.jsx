import React, { useState, useEffect, useRef } from "react"
import bannergel1 from '/assets/bannergel1.jpg'
import bannergel2 from '/assets/bannergel2.jpg'
import bannergel3 from '/assets/bannergel3.jpg'
import bannergel4 from '/assets/bannergel4.jpeg'
import bannergel5 from '/assets/bannergel5.jpeg'

export default function Carousel() {
  const [current, setCurrent] = useState(0)
  const slides = [bannergel1, bannergel2, bannergel3, bannergel5]

  const nextSlide = () => setCurrent(current === slides.length - 1 ? 0 : current + 1)
  const prevSlide = () => setCurrent(current === 0 ? slides.length - 1 : current - 1)
  const goToSlide = (index) => setCurrent(index)

  // Auto-play cada 5 segundos
  React.useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 7000)
    return () => clearInterval(interval)
  }, [current])

  return (
    <div className="carousel-container">
      <button className="carousel-arrow carousel-arrow-left" onClick={prevSlide}>‹</button>
      <button className="carousel-arrow carousel-arrow-right" onClick={nextSlide}>›</button>
      
      <div className="carousel-slides">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={index === current ? 'carousel-slide active' : 'carousel-slide'}
          >
            {index === current && <img src={slide} alt={`Banner ${index + 1}`} />}
          </div>
        ))}
      </div>

      <div className="carousel-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={index === current ? 'dot active' : 'dot'}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}