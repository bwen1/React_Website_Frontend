import React from 'react';

const Header = (props) => {
    const { handleClickLogout } = props;

    return (
        <div className="header">
            <h1>Queensland Offences</h1>
            <div align="right">
                <button className="logoutButton" onClick={handleClickLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Header;
