import React, { useState, useEffect } from 'react';
import LoginPage from './LoginPage';

const MainPage = (props) => {
    const [search, setSearch] = useState('');
    const [offences, setOffences] = useState([]);
    const [crime, setCrime] = useState([]);
    const [total, setTotal] = useState([]);
    const [load, setLoad] = useState(false);

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
            setOffences([]);
            setCrime([]);
            setTotal([]);
            setLoad(true);
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
                    setLoad(false);
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
            setOffences([]);
            setCrime([]);
            setTotal([]);
            setLoad(true);
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

                    setCrime(allLGA);
                    setTotal(allTotal);
                    setLoad(false);
                    console.log(response);
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

    const filterDiv = () => {
        const param = event.target.innerHTML; 
        let filter = ""; 
    
        //Example filter strings
        if (param === "area") {
            filter = "area=Moreton Bay Regional Council";
        } else if (param === "age") {
            filter = "age=Juvenile"
        } else if (param === "year") { 
            filter = "year=2006,2007,2008";
        }  
        
        //The parameters of the call
        let getParam = { method: "GET" };
        let head = { Authorization: 'Bearer ' + window.localStorage.getItem('token') };
        getParam.headers = head;
    
        //The URL
        const baseUrl = "https://cab230.hackhouse.sh/search?";
        const query = 'offence=Armed Robbery';
    
        const url = baseUrl + query + "&" + filter;
    
        fetch(encodeURI(url),getParam)
            .then(function(response) {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(function(result) {
                let appDiv = document.getElementById("app");
                appDiv.innerHTML = JSON.stringify(result);
            })
            .catch(function(error) {
                    console.log("There has been a problem with your fetch operation: ",error.message);
            }); 
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
            </div >
            <div align="center">
            {load? <div className="Loader"> </div> : null}
            </div>
            <div className="Tables" align="center">
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
                            <tr key={offence}>
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
