import React, { useState, useEffect } from 'react';
import LoginPage from './LoginPage';

const MainPage = (props) => {
    const [search, setSearch] = useState('');
    const [offences, setOffences] = useState([]);
    const [crime, setCrime] = useState([]);
    const [total, setTotal] = useState([]);

    const handleChangeSearch = (event) => {
        setSearch(event.target.value);
    };

    // Onclick logout button
    const handleClickLogout = () => {
        props.changePage('Login'); // Change page to Login page
        window.localStorage.removeItem('token'); // Clear local storage token
    };

    const handleClickClear = () => {
        setOffences([]);
        setCrime([]);
        setTotal([]);
    };

    /*const fetchListOffences = () => {
        fetch('https://cab230.hackhouse.sh/offences')
            .then(function(response) {
                if (response.ok) {
                    //console.log('first' + response);
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(function(response) {
                setOffences(response.offences);
                console.log(response);
            })

            //const contents = this.result.foreach
            .catch(function(error) {
                console.log(
                    'There has been a problem with your fetch operation: ',
                    error.message
                );
            });
    }; */

    const searchButton = () => {
        if (search === '') {
            fetch('https://cab230.hackhouse.sh/offences')
                .then(function(response) {
                    if (response.ok) {
                        //console.log('first' + response);
                        return response.json();
                    }
                    throw new Error('Network response was not ok.');
                })
                .then(function(response) {
                    setCrime([]);
                    setTotal([]);
                    setOffences(response.offences);
                    console.log(response);
                })

                //const contents = this.result.foreach
                .catch(function(error) {
                    console.log(
                        'There has been a problem with your fetch operation: ',
                        error.message
                    );
                });
        } else {
            //The parameters of the call
            let getParam = { method: 'GET' };
            let head = {
                Authorization: 'Bearer ' + window.localStorage.getItem('token')
            };
            getParam.headers = head;

            //The URL
            const baseUrl = 'https://cab230.hackhouse.sh/search?';
            const query = 'offence=' + search;
            const url = baseUrl + query;

            fetch(encodeURI(url), getParam)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Network response was not ok.');
                })
                .then((response) => {
                    const allLGA = response.result.map(
                        (location) => location.LGA
                    );

                    const allTotal = response.result.map(
                        (location) => location.total
                    );
                    setOffences([]);
                    setCrime(allLGA);
                    setTotal(allTotal);

                    //console.log(response);
                })
                .catch((error) => {
                    console.log(
                        'There has been a problem with your fetch operation: ',
                        error.message
                    );
                });
        }
        //console.log(total);
    };
    //TODO fix table sorting
    const tableSort = () => {
        const crimeData = total;
        crimeData.sort((a, b) => a - b);
        setCrime(crimeData);
    };

    return (
        <div>
            <div className="header">
                <h1>Queensland Offences</h1>
                <div align="right">
                    <button
                        className="logoutButton"
                        onClick={handleClickLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>

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

                {/*<button className="mainButtons" onClick={fetchListOffences}>
                    List All
    </button>*/}
                <button className="mainButtons" onClick={handleClickClear}>
                    Clear
                </button>
            </div>
            <div className="Tables">
                {crime.length > 1 ? (
                    <table>
                        <thead>
                            <tr>
                                <th onClick={tableSort}>LGA</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {crime.map((crimes, index) => (
                                <tr>
                                    <td>{crimes}</td>
                                    <td>{total[index]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : null}

                <table>
                    <tbody>
                        {offences.map((offence) => (
                            <tr>
                                <td> {offence} </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="text">
                {/*{'My current token is: ' + window.localStorage.getItem('token')}*/}
            </p>
        </div>
    );
};

export default MainPage;
