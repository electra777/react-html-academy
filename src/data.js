import { RANDOMIZED } from './settings';

export const cats = [
	{
		id: 'YdAqiUkUoWA',
		url: '../public/img/cats-1.jpg',
		description: '',
	},
	{
		id: 'hX_hf2lPpUU',
		url: '../public/img/cats-2.jpg',
		description: '',
	},
	{
		id: 'w1JE5duY62M',
		url: '../public/img/cats-3.jpg',
		description: '',
	},
	{
		id: '3tYZjGSBwbk',
		url: '../public/img/cats-4.jpg',
		description: '',
	},
	{
		id: 'NoXUQ54pDac',
		url: '../public/img/cats-5.jpg',
		description: '',
	},
	{
		id: 'OZhYgZh0bAg',
		url: '../public/img/cats-6.jpg',
		description: '',
	},
];

export const cars = [
	{
		id: 'YdAqiUkUoWA',
		url: '../public/img/cars-1.jpg',
		description: '',
	},
	{
		id: 'hX_hf2lPpUU',
		url: '../public/img/cars-2.jpg',
		description: '',
	},
	{
		id: 'w1JE5duY62M',
		url: '../public/img/cars-3.jpg',
		description: '',
	},
	{
		id: '3tYZjGSBwbk',
		url: '../public/img/cars-4.jpg',
		description: '',
	},
	{
		id: 'NoXUQ54pDac',
		url: '../public/img/cars-5.jpg',
		description: '',
	},
	{
		id: 'OZhYgZh0bAg',
		url: '../public/img/cars-6.jpg',
		description: '',
	},
];

export const flowers = [
	{
		id: 'YdAqiUkUoWA',
		url: '../public/img/flowers-1.jpg',
		description: '',
	},
	{
		id: 'hX_hf2lPpUU',
		url: '../public/img/flowers-2.jpg',
		description: '',
	},
	{
		id: 'w1JE5duY62M',
		url: '../public/img/flowers-3.jpg',
		description: '',
	},
	{
		id: '3tYZjGSBwbk',
		url: '../public/img/flowers-4.jpg',
		description: '',
	},
	{
		id: 'NoXUQ54pDac',
		url: '../public/img/flowers-5.jpg',
		description: '',
	},
	{
		id: 'OZhYgZh0bAg',
		url: '../public/img/flowers-6.jpg',
		description: '',
	},
];

export const imageCollection = {
	flowers,
	cats,
	cars,
};

export const results = [
	{ name: 'Аня', stepsCount: 16 },
	{ name: 'Вася', stepsCount: 12 },
	{ name: 'Петя', stepsCount: 19 },
];

export const getImages = (type) => {
	const images = [...imageCollection[type]];
	images.forEach((item) => {
		images.push({ ...item, id: `${item.id}-1` });
	});

	return RANDOMIZED ? images.sort(() => 0.5 - Math.random()) : images;
};
