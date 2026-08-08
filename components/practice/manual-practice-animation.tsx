export function ManualPracticeAnimation() {
  return (
    <div className="manual-practice-scene" role="img" aria-label="Animasi bus belajar Ruang Sinergi melaju sambil mengumpulkan XP">
      <span className="manual-practice-sun" aria-hidden="true" />
      <span className="manual-practice-cloud manual-practice-cloud-one" aria-hidden="true" />
      <span className="manual-practice-cloud manual-practice-cloud-two" aria-hidden="true" />
      <span className="manual-practice-xp manual-practice-xp-one" aria-hidden="true">+10 XP</span>
      <span className="manual-practice-xp manual-practice-xp-two" aria-hidden="true">★</span>
      <div className="manual-practice-road" aria-hidden="true"><span /></div>
      <div className="manual-practice-bus" aria-hidden="true">
        <div className="manual-practice-bus-body">
          <span className="manual-practice-window manual-practice-window-one" />
          <span className="manual-practice-window manual-practice-window-two" />
          <span className="manual-practice-bus-label">RS</span>
          <span className="manual-practice-headlight" />
        </div>
        <span className="manual-practice-wheel manual-practice-wheel-one" />
        <span className="manual-practice-wheel manual-practice-wheel-two" />
      </div>
    </div>
  );
}