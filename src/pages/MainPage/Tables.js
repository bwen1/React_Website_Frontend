import React from 'react';

const Tables = (props) => {
    const { crime, offences, tableSortLGA, tableSortTotal } = props;

    return (
        <div className="Tables" align="center">
            {crime.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th className="tableHeading" onClick={tableSortLGA}>
                                LGA
                            </th>
                            <th
                                className="tableHeading"
                                onClick={tableSortTotal}
                            >
                                Total
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {crime.map((crimes, index) => (
                            <tr key={index}>
                                <td>{crimes.LGA}</td>
                                <td>{crimes.total}</td>
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
    );
};

export default Tables;
