import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// PAGES
import Home from './pages/Home';
import Main from './pages/LoginHome';
import Feed from './pages/Feed';
import MyFeed from './pages/MyFeed';
import Search from './pages/Search';
import Mypage from './pages/Mypage';
import BookDetail from './pages/BookDetail';
import Login from './pages/Login';
import Join from './pages/Join';
import Signup2 from './pages/Signup2';
import Signup3 from './pages/Signup3';
import FindUserInfo from './pages/FindUserInfo';
import Registration from './pages/Registration';
import BookList from './pages/BookList';
import SmallCategory from './pages/SmallCategory';
import Edit from './pages/Edit';
import UserInfo from './pages/UserInfo';

// STYLE
import GlobalStyles from './styles/GlobalStyles';
import './App.css';
import ScrollTop from './components/ScrollTop';
import LoginFind from './pages/LoginFind';
import LoginLayout from './components/LoginLayout';
import LoginFindResult from './pages/LoginFindResult';
import PasswordFind from './pages/PasswordFind';
import PasswordFindResult from './pages/PasswordFindResult';

function App() {
	// 브라우저 새로고침 스크롤 이벤트
	useEffect(() => {
		window.onbeforeunload = function pushRefresh() {
			window.scrollTo(0, 0);
		};
	}, []);

	let [category, setCategory] = useState('소설');

	https: return (
		<BrowserRouter>
			<div className="App">
				<GlobalStyles />
				<ScrollTop />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/logout" element={<Home />} />
					<Route path="/main" element={<Main />} />
					<Route path="/feed" element={<Feed />} />
					<Route path="/search" element={<Search />} />
					<Route path="/mypage" element={<Mypage />} />
					<Route path="/myfeed" element={<MyFeed />} />
					<Route path="/edit" element={<Edit />} />
					<Route path="/edit/:page" element={<UserInfo />} />

					<Route path="/login" element={<Login />} />
					<Route path="/join" element={<Join />} />
					<Route path="/join2" element={<Join2 />} />
					<Route element={<LoginLayout />}>
						<Route path="/login-find" element={<LoginFind />} />
						<Route path="/login-find-result" element={<LoginFindResult />} />
						<Route path="/password-find" element={<PasswordFind />} />
						<Route
							path="/password-find-result"
							element={<PasswordFindResult />}
						/>
					</Route>
					<Route path="/test" element={<Registration />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Join />} />
					<Route path="/signup/1" element={<Signup2 />} />
					<Route path="/signup/2" element={<Signup3 />} />
					<Route path="/find/user/info/:page" element={<FindUserInfo />} />
					<Route path="/test" element={<Registration />} />

					<Route path="/book-detail" element={<BookDetail />} />
					<Route path="/book/list/:title" element={<BookList />} />
					<Route path="/book/:title/:category" element={<SmallCategory />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
