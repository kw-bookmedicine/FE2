import React from 'react';

// COMPONENTS
import HashTag from '../HashTag';

// STYLE
import '../../styles/Prescription/OneLinePrscrCard.css';

const OneLinePrscrCard = () => {
	return (
		<>
			<div className="OneLinePrscrCard_wrapper">
				<div className="oneLineCard_profile_wrapper">
					<img
						src="/icon/profile/basic_profile_img.svg"
						alt="작성자 프로필"
						id="oneLineCard_profile_img"
					/>
					<div className="oneLineCard_profile_userInfo_wrapper">
						<p id="oneLineCard_user_nickname">이름 없는 새</p>
						<p>2024.05.13</p>
					</div>
				</div>
				<div className="oneLineCard_title_wrapper">
					<p>
						“재미있는 판타지 소설을 읽어보고 싶을 땐 해리포터 불의 잔을
						읽어보세요”
					</p>
				</div>
				<div className="oneLineCard_bookInfo_wrapper">
					<img
						src="/loading_thumbnail_x4.png"
						alt="책 썸네일"
						id="oneLineCard_thumbnail"
					/>
					<div className="oneLineCard_bookInfo_right_wrapper">
						<div className="oneLineCard_bookInfo_content_wrapper">
							<div className="bookInfo_content_left_wrapper">
								<p id="oneLineCard_bookInfo_bookTitle">책 제목</p>
								<p>작가</p>
							</div>
							<div className="showBook_btn_wrapper">
								<button id="showBook_btn">책 보러가기</button>
							</div>
						</div>
						<div className="oneLineCard_bookInfo_keyword_wrapper">
							<HashTag text={'저주'} type={'keyword'} />
							<HashTag text={'해리포터'} type={'keyword'} />
							<HashTag text={'판타지'} type={'keyword'} />
						</div>
					</div>
				</div>
				<div className="oneLineCard_evaluation_wrapper">
					<div className="evaluation_wrapper">
						<img
							src="/icon/oneLine-prscr/like.png"
							id="oneLineCard_like_icon"
						/>
						<span>좋은 추천이에요</span>
						<span>20</span>
					</div>
					<div className="evaluation_wrapper">
						<img
							src="/icon/oneLine-prscr/laughing.png"
							id="oneLineCard_good_icon"
						/>
						<span>도움이 되었어요</span>
						<span>10</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default OneLinePrscrCard;