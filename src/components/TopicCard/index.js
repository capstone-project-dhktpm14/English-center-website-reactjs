import { Button } from 'antd';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './style.scss';
import imageNotFound from 'assets/images/image-not-found.svg';
import { TagOutlined } from '@ant-design/icons';

function TopicCard(props) {
	const { topic, maxCharacterCount } = props;
	

	const { url } = useLocation();
	const { image, slug, name, description, additionalInfo } = topic;


	const [isTruncated, setIsTruncated] = useState(true);

	const shortDescription = isTruncated
		? description.slice(0, maxCharacterCount) + '...'
		: description;

	return (
		<div className="topic-card">
			<div className="topic-card__image">
				<Link to={`${slug}`}>
					<img
						src={image}
						alt="Oops ... Not found"
						onError={(e) => (e.target.src = imageNotFound)}
					/>
				</Link>
			</div>
			<div className="topic-card__content">
				<div className="topic-card__title">
					<Link to={`${slug}`}>{name}</Link>
				</div>

				{description.length > maxCharacterCount ? (
					<>
						<div className="topic-card__description">
							{shortDescription}
							<Button type="link" onClick={() => setIsTruncated(!isTruncated)}>
								{isTruncated ? 'Show more >' : 'Hide <'}
							</Button>
						</div>
					</>
				) : (
					<div className="topic-card__description">{description}</div>
				)}
				{/* <div className="topic-card__topic-info"><TagOutlined />{""}{additionalInfo}</div> */}
				<div className="topic-card__additional-info">{additionalInfo}</div>

			</div>
		</div>
	);
}

TopicCard.propTypes = {
	topic: PropTypes.object,
	maxCharacterCount: PropTypes.number,
};
TopicCard.defaultProps = {
	topic: {},
	maxCharacterCount: 140,
};

export default TopicCard;
