
export default function UsosSection({ usos }) {
  return (
    <section className="usos-section">
  <div className="usos-container">

    <h2 className="usos-title">
      NO ES PROMESA <span>·</span> ES FIJACIÓN
    </h2>

    <div className="usos-strip">
      {usos.map((uso, i) => (
        <div key={i} className="uso-item">
          <img src={uso.image} alt={uso.text} />
          <p>{uso.text}</p>
        </div>
      ))}
    </div>

  </div>
</section>

)}