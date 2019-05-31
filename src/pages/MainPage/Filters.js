import React from 'react';

const Filters = (props) => {
    const {
        setGender,
        filterGender,
        genderList,
        setAge,
        filterAge,
        ageList,
        setYear,
        filterYear,
        yearList,
        setArea,
        filterArea,
        areaList,
        filterFunc
    } = props;

    
    return (
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
            <input
                type="text"
                className="filterSearch"
                placeholder="Filter search"
                onChange={filterFunc}
            />
        </div>
    );
};

export default Filters;
