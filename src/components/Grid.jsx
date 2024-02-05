import Card from './Card';

function Grid({ images = [], finishedItems, checkItems, type }) {
	const [visibleItems, setVisibleItems] = React.useState([]);

	const handleCardClick = (id) => {
		if (visibleItems.includes(id) || finishedItems.includes(id)) {
			return;
		}

		switch (visibleItems.length) {
			case 0:
				setVisibleItems([id]);
				break;
			case 1:
				setVisibleItems((items) => [...items, id]);
				checkItems(visibleItems[0], id);
				setTimeout(() => {
					setVisibleItems([]);
				}, TIMEOUT);
				break;
			default:
				setVisibleItems([]);
		}
	};

	return (
		<ul className={`cards cards-theme-${type}`}>
			{images.map((item) => (
				<Card
					key={item.id}
					id={item.id}
					url={item.url}
					description={item.description}
					isVisible={visibleItems.includes(item.id)}
					isFinished={finishedItems.includes(item.id)}
					onCardClick={handleCardClick}
				/>
			))}
		</ul>
	);
}

export default Grid;
