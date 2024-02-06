import React from 'react';
import { GAME_TYPES } from '../settings';

function InitialPage({ onStart }) {
	const buttons = GAME_TYPES.map(({ type, icon, label }) => (
		<button
			className={`ico-button ico-button-${icon}`}
			key={icon}
			onClick={() => onStart(type)}
			type="button">
			{label}
		</button>
	));

	return (
		<section className="rules container">
			<h2>Добро пожаловать!</h2>
			<p>Memory — игра для тренировки визуальной памяти</p>
			<div className="rules-panel">
				<h3>Правила игры</h3>
				<ul className="rules-list">
					<li>В наборе есть множество карточек – по две штуки с одним и тем же рисунком.</li>
					<li>
						Нужно разложить карточки «рубашкой» вверх на столе, а затем переворачивать по две.
					</li>
					<li>Если они совпадают – игрок забирает их и получает ещё один ход.</li>
				</ul>
			</div>
			{buttons}
		</section>
	);
}

export default InitialPage;
