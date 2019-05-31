import React from 'react';

const Functions = (props) => {
const { search, handleChangeSearch, searchButton, chartButton, handleClickClear } = props;
    return (
        <div align="left">
                <input
                    type="search"
                    value={search}
                    onChange={handleChangeSearch}
                    placeholder="Show all offences"
                    style={{ fontSize: '15px' }}
                />
                <button className="mainButtons" onClick={searchButton}>
                    Search
                </button>

                <button className="mainButtons" onClick={chartButton}>
                    Chart
                </button>
                <button className="mainButtons" onClick={handleClickClear}>
                    Clear
                </button>
            </div>
    )
}

export default Functions;