import React from 'react';

function Card({ id, url, description, isVisible, isFinished, isChecking, onCardClick, type }) {
	const className = `${isVisible ? 'card-show' : ''} ${isFinished ? 'card-finished' : ''}`;

	const handleClick = () => {
		onCardClick(id);
	};

	return (
		<li onClick={handleClick} className={`card ${className}`}>
			<img width="204" height="144" src={url} alt={description} />
		</li>
	);
}

export default Card;
