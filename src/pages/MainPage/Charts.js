import react from 'react';

const Charts = (props) => {
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
