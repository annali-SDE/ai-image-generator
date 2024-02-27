import React, { useRef, useState } from 'react';
import './ImageGenerator.css';
import default_image from '../assets/default_image.svg';

const ImageGenerator = () => {
	const [image_url, setImageUrl] = useState('/');
	const [loading, setLoading] = useState(false);
	let inputRef = useRef(null);
	const imageGenerator = async () => {
		console.log('fgfg', inputRef.current.value);
		if (inputRef.current.value === '') {
			return 0;
		}
		setLoading(true);
		const response = await fetch(
			'https://api.openai.com/v1/images/generations',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer your openai api key here',
					'User-Agent': 'Chrome'
				},
				body: JSON.stringify({
					prompt: `${inputRef.current.value}`,
					n: 1,
					size: '512x512'
				})
			}
		);
		let data = await response.json();
		console.log(data);
		setImageUrl(data.data[0].url);
		setLoading(false);
	};
	return (
		<div className='ai-image-generator'>
			<div className='header'>
				AI Image <span>Generator</span>
			</div>
			<div className='img-loading'>
				<div className='image'>
					<img src={image_url === '/' ? default_image : image_url} alt=''></img>
				</div>
				<div className='loading'>
					<div className={loading ? 'loading-bar-full' : 'loading-bar'}></div>
					<div className={loading ? 'loading-text' : 'display-none'}>
						Loading...
					</div>
				</div>
			</div>
			<div className='search-box'>
				<input
					type='text'
					ref={inputRef}
					className='search-input'
					placeholder='Describe What Kind of Image You Want to Generate'
				/>
				<div
					className='generate-btn'
					onClick={() => {
						imageGenerator();
					}}
				>
					Generate
				</div>
			</div>
		</div>
	);
};

export default ImageGenerator;
