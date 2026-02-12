export default function VideoShowcase({ video1, video2 }) {
  return (
    <section className="video-showcase">
      <div className="video-box">
        <video
          src={video1}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      </div>

      <div className="video-box">
        <video
          src={video2}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      </div>
    </section>
  )
}
