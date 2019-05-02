import React, { useState, useEffect } from 'react';
import LoginPage from './LoginPage';


const MainPage = (props) => {
    const [refOffences, setROffences] = useState([]);
    const [refCrimes, setRCrimes] = useState([]);
    const [search, setSearch] = useState('');
    const [offences, setOffences] = useState([]);
    const [crime, setCrime] = useState([]);
    const [total, setTotal] = useState([]);
    const [load, setLoad] = useState(false);

    const [filterGender, setGender] = useState('');
    const [filterYear, setYear] = useState('');
    const [filterAge, setAge] = useState('');
    const [filterArea, setArea] = useState('');

    const [genderList, setGenderList] = useState([]);
    const [yearList, setYearList] = useState([]);
    const [ageList, setAgeList] = useState([]);
    const [areaList, setAreaList] = useState([]);


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
                console.log(response.genders);
            });

        fetch(encodeURI('https://cab230.hackhouse.sh/ages'), getParam)
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                setAgeList(response.ages);
                console.log(response.ages);
            });

        fetch(encodeURI('https://cab230.hackhouse.sh/years'), getParam)
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                setYearList(response.years);
                console.log(response.years);
            });

        fetch(encodeURI('https://cab230.hackhouse.sh/areas'), getParam)
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                setAreaList(response.areas);
                console.log(response.areas);
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
        setTotal([]);
    };

    const searchButton = () => {
        if (search === '') {
            setOffences([]);
            setCrime([]);
            setTotal([]);
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
                    setRCrimes(allLGA);
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
//https://codepen.io/mtclmn/pen/QyPVJp
    const filterFunc = (event) =>{
        var updatedList;
        if (offences.length > 0) {updatedList = refOffences;
            updatedList = updatedList.filter(function(item){
        return item.toLowerCase().search(
            event.target.value.toLowerCase()) !== -1;
    });
    setOffences(updatedList);}

    else {
    updatedList = refCrimes;
    updatedList = updatedList.filter(function(item){
      return item.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    setCrime(updatedList);
}
      }


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

                <button className="mainButtons" onClick={null}>
                    Chart
                </button>
                <button className="mainButtons" onClick={handleClickClear}>
                    Clear
                </button>
            </div>

            <div>
                <select
                    onChange={(e) => setGender(e.target.value)}
                    className="Filters"
                    value={filterGender}
                >
                    <option value="">Gender</option>
                    {genderList.map((gender) => (
                        <option key={gender} value={'gender=' + gender}>
                            {gender}
                        </option>
                    ))}
                </select>
                <select
                    onChange={(e) => setAge(e.target.value)}
                    className="Filters"
                    value={filterAge}
                >
                    <option value="">Age</option>
                    {ageList.map((age) => (
                        <option key={age} value={'age=' + age}>
                            {age}
                        </option>
                    ))}
                </select>

                <select
                    onChange={(e) => setYear(e.target.value)}
                    className="Filters"
                    value={filterYear}
                >
                    <option value="">Year</option>
                    {yearList.map((year) => (
                        <option key={year} value={'year=' + year}>
                            {year}
                        </option>
                    ))}
                </select>
                <select
                    onChange={(e) => setArea(e.target.value)}
                    className="Filters"
                    value={filterArea}
                >
                    <option value="">Area</option>
                    {areaList.map((area) => (
                        <option key={area} value={'area=' + area}>
                            {area}
                        </option>
                    ))}
                </select>
                <input type="text" className="filterSearch" placeholder="Search results" onChange={filterFunc}/>
            </div>

            <br />
            <br />
 

            <div align="center">
                {load ? <div className="Loader"> </div> : null}
            </div>
            <div className="Tables" align="center">
                {crime.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th onClick={tableSort}>LGA</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {crime.map((crimes, index) => (
                                <tr key={index}>
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
