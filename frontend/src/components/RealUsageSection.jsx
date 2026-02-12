import resultadoVideo from "/assets/resultadoVideo.mp4"
import resultadoVideo2 from "/assets/resultadoVideo2.mp4"
import usoVideo from "/assets/usoVideo.mp4"

export default function RealUsageSection() {
  return (
    <section className="real-usage-section">
      <h2 className="real-usage-title">
        USO REAL <span>·</span> RESULTADO REAL
      </h2>

      <div className="real-usage-videos">

        <div className="real-usage-item">
          <p className="real-usage-label">TESTIMONIO · USO</p>
          <div className="real-usage-video">
            <video
              src={resultadoVideo2}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
          </div>
        </div>

        <div className="real-usage-item">
          <p className="real-usage-label">TESTIMONIO · DURACIÓN</p>
          <div className="real-usage-video">
            <video
              src={usoVideo}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
          </div>
        </div>

        <div className="real-usage-item">
          <p className="real-usage-label">RESULTADO · FINAL</p>
          <div className="real-usage-video">
            <video
              src={resultadoVideo}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
          </div>
        </div>

      </div>
    </section>
  )
}
