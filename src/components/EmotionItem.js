import '../styles/EmotionItem.css';

const EmotionItem = ({ emotion_id, emotion_img, onClick, isSelected }) => {
	return (
		<>
			<div
				onClick={() => onClick(emotion_id)}
				className={[
					'EmotionItem',
					isSelected ? `EmotionItem_on_${emotion_id}` : `EmotionItem_off`,
				].join(' ')}
			>
				<img src={emotion_img} className="EmotionImg" />
			</div>
		</>
	);
};

export default EmotionItem;
