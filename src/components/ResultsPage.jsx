import ResultsTable from './ResultsTable';

import getDeclensionMin from '@dubaua/get-declension';
// import getDeclension from '@dubaua/get-declension';

function ResultsPage({ results, current, onResetGame }) {
	const wordsDeclension = getDeclensionMin({
		count: current,
		one: 'шаг',
		few: 'шага',
		many: 'шагов',
	});

	return (
		<section className="result container">
			<h2>Лучшие результаты:</h2>
			<p>
				Вы завершили игру за <b>{wordsDeclension}</b>, так держать!
			</p>
			<ResultsTable current={current} results={results} />
			<p>Хотите попробовать ещё раз?</p>
			<button onClick={onResetGame} className="button result-button" type="button">
				Новая игра
			</button>
		</section>
	);
}

export default ResultsPage;
