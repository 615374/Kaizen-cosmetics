import { useState } from "react"

export default function Product360({ src, alt }) {
  const [rotation, setRotation] = useState(0)

  const handleMove = (x, width) => {
    const percent = x / width
    setRotation((percent - 0.5) * 30)
  }

  return (
    <div
      onMouseMove={(e) => handleMove(e.nativeEvent.offsetX, e.currentTarget.offsetWidth)}
      onTouchMove={(e) => {
        if (e.touches.length > 0) {
          handleMove(
            e.touches[0].clientX - e.currentTarget.getBoundingClientRect().left,
            e.currentTarget.offsetWidth
          )
        }
      }}
      style={{
        perspective: "1000px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        padding: "18px 0",
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: "360px",
          maxWidth: "100%",
          transform: `rotateY(${rotation}deg)`,
          transition: "transform 0.12s linear",
          borderRadius: 14,
          boxShadow: "0 18px 40px rgba(0,0,0,0.18)",
        }}
      />
    </div>
  )
}

