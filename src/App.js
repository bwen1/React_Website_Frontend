import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import MainPage from './pages/MainPage';
// TODO: npm start
const App = () => {
    const [page, setPage] = useState('Login');

    //What does this do again?
    const handleChangePage = (pageId) => {
        setPage(pageId);
    };

    return (
        <div className="app">
            {page === 'Login' && <LoginPage changePage={handleChangePage} />}
            {page === 'SignUp' && <SignUpPage changePage={handleChangePage} />}
            {page === 'MainPage' && <MainPage changePage={handleChangePage} />}
        </div>
    );
};

export default App;
