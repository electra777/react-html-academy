function Progress({ stepsCount, value, max }) {
	return (
		<>
			<div className="progress-wrapper">
				<div className="progress" style={{ width: `${(value / max) * 100}%` }}></div>
			</div>
			<p className="progress-description">
				Открыто <span>{value}</span> / <span>{max}</span>
			</p>
			<div className="steps">Шаг {stepsCount}</div>
		</>
	);
}

export default Progress;
