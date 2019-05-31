import React from 'react';
import GoogleMapReact from 'google-map-react';

import Chart from 'chart.js';
import ReactChartkick, { ColumnChart } from 'react-chartkick';

const Charts = (props) => {
    const { crime } = props;
    ReactChartkick.addAdapter(Chart);

    const DataMap = ({ text }) => (
        <div
            style={{
                color: 'white',
                background: 'grey',
                padding: '7.5px 5px',
                display: 'inline-flex',
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '20%',
                transform: 'translate(-50%, -50%)'
            }}
        >
            {text}
        </div>
    );

    return (
        <div>
            <ColumnChart
                data={crime.map((crimes) => [crimes.LGA, crimes.total])}
            />

            <div align="center">
                <div style={{ height: '50vh', width: '75%' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{
                            key: 'AIzaSyA2lt6vm5zQU9hkdG2VOcRRNGlpdbpX6ck'
                        }}
                        defaultCenter={{
                            lat: -22.286783,
                            lng: 145.893207
                        }}
                        defaultZoom={7}
                    >
                        {crime.map((crimes, index) => (
                            <DataMap
                                key={index}
                                lat={crimes.lat}
                                lng={crimes.lng}
                                text={crimes.LGA + '\n' + crimes.total}
                            />
                        ))}
                    </GoogleMapReact>
                </div>
            </div>
        </div>
    );
};

export default Charts;
