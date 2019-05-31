import React, { useState, useEffect } from 'react';

import Tables from './MainPage/Tables';
import Header from './MainPage/Header';
import Charts from './MainPage/Charts';
import Filters from './MainPage/Filters';
import Functions from './MainPage/Functions';

const MainPage = (props) => {
    const [refOffences, setROffences] = useState([]);
    const [refCrimes, setRCrimes] = useState([]);
    const [search, setSearch] = useState('');
    const [offences, setOffences] = useState([]);
    const [crime, setCrime] = useState([]);

    const [load, setLoad] = useState(false);

    const [filterGender, setGender] = useState('');
    const [filterYear, setYear] = useState('');
    const [filterAge, setAge] = useState('');
    const [filterArea, setArea] = useState('');

    const [genderList, setGenderList] = useState([]);
    const [yearList, setYearList] = useState([]);
    const [ageList, setAgeList] = useState([]);
    const [areaList, setAreaList] = useState([]);

    const [chart, setChart] = useState(false);
    const [ascending, setAscending] = useState(false);
    const [alphabetical, setAlphabetical] = useState(true);

    useEffect(() => {
        let getParam = { method: 'GET' };
        let head = {
            Authorization: 'Bearer ' + window.localStorage.getItem('token')
        };
        getParam.headers = head;
        fetch(encodeURI('https://cab230.hackhouse.sh/genders'), getParam)
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                setGenderList(response.genders);
                //console.log(response.genders);
            });

        fetch(encodeURI('https://cab230.hackhouse.sh/ages'), getParam)
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                setAgeList(response.ages);
                //console.log(response.ages);
            });

        fetch(encodeURI('https://cab230.hackhouse.sh/years'), getParam)
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                setYearList(response.years);
                //console.log(response.years);
            });

        fetch(encodeURI('https://cab230.hackhouse.sh/areas'), getParam)
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                setAreaList(response.areas);
                //console.log(response.areas);
            });
    }, []);

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
    };

    const chartButton = () => {
        chart ? setChart(false) : setChart(true);
    };

    const searchButton = () => {
        if (search === '') {
            setOffences([]);
            setCrime([]);
            setChart(false);

            setLoad(true);
            fetch('https://cab230.hackhouse.sh/offences')
                .then((response) => {
                    if (response.ok) {
                        //console.log('first' + response);
                        return response.json();
                    }
                    throw new Error('Network response was not ok.');
                })
                .then((response) => {
                    setOffences(response.offences);
                    setROffences(response.offences);
                    //console.log(response);
                    setLoad(false);
                })

                //const contents = this.result.foreach
                .catch((error) => {
                    setLoad(false);
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

            const url =
                baseUrl +
                query +
                '&' +
                filterGender +
                '&' +
                filterAge +
                '&' +
                filterYear +
                '&' +
                filterArea;
            setOffences([]);
            setCrime([]);

            setLoad(true);
            fetch(encodeURI(url), getParam)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Network response was not ok.');
                })
                .then((response) => {
                    setCrime(response.result);
                    setRCrimes(response.result);
                    setLoad(false);
                })
                .catch((error) => {
                    setLoad(false);
                    console.log(
                        'There has been a problem with your fetch operation: ',
                        error.message
                    );
                });
        }
    };

    const tableSortLGA = () => {
        const sortCrime = crime.slice();
        if (alphabetical === true) {
            sortCrime.sort((a, b) => a.LGA.localeCompare(b.LGA));
            sortCrime.reverse();
            setAlphabetical(false);
            setCrime(sortCrime);
        } else {
            sortCrime.sort((a, b) => a.LGA.localeCompare(b.LGA));
            setAlphabetical(true);
            setCrime(sortCrime);
        }
    };

    const tableSortTotal = () => {
        if (ascending === true) {
            setAscending(false);
            setCrime((crime) =>
                crime.slice().sort((a, b) => a.total - b.total)
            );
        } else {
            setAscending(true);
            setCrime((crime) =>
                crime.slice().sort((a, b) => b.total - a.total)
            );
        }
    };

    const filterFunc = (event) => {
        let updatedList;
        if (refCrimes < 1) {
            updatedList = refOffences;
            updatedList = updatedList.filter(function(item) {
                return (
                    item
                        .toLowerCase()
                        .search(event.target.value.toLowerCase()) !== -1
                );
            });
            setOffences(updatedList);
        } else {
            updatedList = refCrimes;
            updatedList = updatedList.filter(function(item) {
                return (
                    item.LGA.toLowerCase().search(
                        event.target.value.toLowerCase()
                    ) !== -1
                );
            });
            setCrime(updatedList);
        }
    };

    return (
        <div>
            <Header handleClickLogout={handleClickLogout} />

            <Functions
                search={search}
                handleChangeSearch={handleChangeSearch}
                searchButton={searchButton}
                chartButton={chartButton}
                handleClickClear={handleClickClear}
            />

            <Filters
                setGender={setGender}
                filterGender={filterGender}
                genderList={genderList}
                setAge={setAge}
                filterAge={filterAge}
                ageList={ageList}
                setYear={setYear}
                filterYear={filterYear}
                yearList={yearList}
                setArea={setArea}
                filterArea={filterArea}
                areaList={areaList}
                filterFunc={filterFunc}
            />

            <br />
            <br />

            <div align="center">
                {load ? <div className="Loader"> </div> : null}
            </div>

            {chart && !load ? (
                // Chartkick chart https://chartkick.com/react
                <Charts crime={crime} />
            ) : null}

            {!chart ? (
                <Tables
                    crime={crime}
                    offences={offences}
                    tableSortLGA={tableSortLGA}
                    tableSortTotal={tableSortTotal}
                />
            ) : null}
            <p className="text">
                {/*{'My current token is: ' + window.localStorage.getItem('token')}*/}
            </p>
        </div>
    );
};

export default MainPage;
