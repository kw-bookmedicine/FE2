import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Main from './pages/Main';
import Feed from './pages/Feed';
import Search from './pages/Search';
import Mypage from './pages/Mypage';

import Login from './pages/Login';
import { Join2 } from './pages/Join2';
import Registration from './pages/Registration';

// COMPONENTS
import Header from './components/Header';

// STYLE
import GlobalStyles from './styles/GlobalStyles';
import LoginHome from './pages/LoginHome';

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<GlobalStyles />

				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/main" element={<LoginHome />} />
					<Route path="/feed" element={<Feed />} />
					<Route path="/search" element={<Search />} />
					<Route path="/mypage" element={<Mypage />} />

					<Route path="/login" element={<Login />} />
					<Route path="/join" element={<Join2 />} />
					<Route path="/test" element={<Registration />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
