import React, { useState, useCallback, useRef, useEffect } from 'react';

import {
    GoogleMap,
    Marker,
    Polygon,
    Circle,
    useLoadScript
} from '@react-google-maps/api';

import { borders } from '@/constants/bordersJS';
import CollapseButton from './CollapseButton';

const libraries = ['places'];

const mapContainerStyle = {
    height: '50vh',
    width: '100%'
};

const mapOptions = {
    zoomControl: true,
    scrollwheel: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
    clickableIcons: false,
    gestureHandling: 'greedy',
    mapId: '8e0ece1c437d65ae'
};

const center = {
    lat: 0,
    lng: 0
};

const options = {
    fillColor: '#34D399',
    fillOpacity: 0.35,
    strokeColor: '#34D399',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    geodesic: false,
    zIndex: 1
};

const DestinationMap = ({
    loading = false,
    error = false,
    destinations,
    showCountryLayer = true,
    showCircleLayer = true
}) => {
    const rtl = false;

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    });

    const mapRef = useRef();

    const [mapReady, setMapReady] = useState(null);
    const [countryLayer, setCountryLayer] = useState(true);
    const containerRef = useRef(null);

    const buildMarkers = () => {
        return destinations.map((groupDest) => {
            const filteredGroup = groupDest.filter((d) => {
                return d.geometry != null;
            });
            return filteredGroup.map((destination, index) => {
                const {
                    geometry: {
                        location: { lat, lng }
                    }
                } = filteredGroup[index];
                const key = `lat${lat}${index}`;
                return (
                    <Marker
                        key={key}
                        position={{
                            lat: lat,
                            lng: lng
                        }}
                        icon={{
                            url: `/assets/media/map-pin-fill-green.svg`,
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(16, 32),
                            scaledSize: new window.google.maps.Size(32, 32)
                        }}
                    />
                );
            });
        });
    };

    const buildCircles = () => {
        return destinations.map((groupDest) => {
            const filteredGroup = groupDest.filter((d) => {
                return (
                    d.place ||
                    d.address ||
                    d.administrative_area_level_1 ||
                    (!borders.hasOwnProperty(d.countryCode) && d.geometry)
                );
            });
            return filteredGroup.map((destination, index) => {
                const key = `${destination.countryCode}_${index}`;
                return (
                    <Circle
                        key={key}
                        center={buildCircleObj(destination).center}
                        options={buildCircleObj(destination).options}
                    />
                );
            });
        });
    };

    const buildCircleObj = (destination) => {
        const {
            geometry: {
                viewport: { south, west, north, east }
            }
        } = destination;

        const center = {
            lat: (south + north) / 2,
            lng: (east + west) / 2
        };

        const radius =
            Math.abs(Math.min(north - south, east - west) / 2) * 111139;

        const options = {
            strokeColor: '#34D399',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#34D399',
            fillOpacity: 0.35,
            radius
        };

        return {
            center,
            options
        };
    };

    const buildCountries = () => {
        return destinations.map((countryGroup, index) => {
            if (borders.hasOwnProperty(countryGroup[0].countryCode)) {
                let country = countryGroup[0].countryCode;
                if (borders[country] === 'MultiPolygon') {
                    return borders[country].coordinates.map((path, i) => {
                        return (
                            <Polygon
                                key={`${country}_${i}`}
                                paths={borders[country].coordinates[i]}
                                options={options}
                            />
                        );
                    });
                } else
                    return (
                        <Polygon
                            key={`${country}_${index}`}
                            paths={borders[country].coordinates}
                            options={options}
                        />
                    );
            } else {
                let tmpCountry = countryGroup.find(
                    (country) =>
                        !country.place &&
                        !country.address &&
                        !country.administrative_area_level_1
                );
                return (
                    <Circle
                        key={`${tmpCountry}`}
                        center={buildCircleObj(tmpCountry).center}
                        options={buildCircleObj(tmpCountry).options}
                    />
                );
            }
        });
    };

    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
        setMapReady(true);
    }, []);

    const onMapIdle = () => {
        const cZoom = mapRef.current.getZoom();
        if (cZoom > 7) setCountryLayer(false);
        else setCountryLayer(true);
    };

    const resetBounds = () => {
        if (mapReady) {
            const bounds = new window.google.maps.LatLngBounds();

            destinations.forEach((obj, index) => {
                const { countryCode } = obj[0];
                const coordinates = borders[countryCode]
                    ? borders[countryCode].coordinates
                    : [];

                coordinates.forEach((coord) => {
                    if (Array.isArray(coord)) {
                        coord.forEach((latLng) => {
                            bounds.extend(latLng);
                        });
                    } else {
                        bounds.extend(coord);
                    }
                });

                try {
                    if (!coordinates.length) {
                        bounds.union(obj[0].geometry.bounds);
                    }
                } catch (error) {
                    console.log('country with no bounds data');
                }
            });

            if (!destinations.length) {
                mapRef.current.setZoom(1);
                mapRef.current.setCenter({
                    lat: 0,
                    lng: 0
                });
            } else {
                mapRef.current.fitBounds(bounds);
            }
        }
    };

    useEffect(() => {
        resetBounds();
    }, [mapReady]);

    if (loadError) return 'Error';
    if (!isLoaded) return 'Loading...';

    return (
        <>
            <div className="mb-6 d-hdpi-2:mb-vw-6">
                <div className="relative" ref={containerRef}>
                    <>
                        <div className="absolute top-8 right-8 z-10 d-hdpi-2:top-vw-8 d-hdpi-2:right-vw-8">
                            <CollapseButton
                                labelHover="Zoom to fit"
                                handleClick={resetBounds}
                                icon="ri-artboard-2-line text-2xl d-hdpi-2:text-vw-2xl -ml-0.5 d-hdpi-2:-ml-vw-0.5"
                                size="10"
                                height="h-10 d-hdpi-2:h-vw-10"
                                width="w-10 d-hdpi-2:w-vw-10"
                                textSize="text-xs d-hdpi-2:text-vw-xs"
                                sizeHover="hover:w-36 d-hdpi-2:hover:w-vw-36"
                                offsetCenter="group-scope-hover:translate-x-3  d-hdpi-2:group-scope-hover:translate-x-1.5"
                                btnColor="bg-green-400 hover:bg-gray-900 text-green-900 hover:text-white"
                            />
                        </div>
                    </>

                    <GoogleMap
                        id="map"
                        mapContainerStyle={mapContainerStyle}
                        center={center}
                        zoom={2}
                        options={mapOptions}
                        onClick={null}
                        onLoad={onMapLoad}
                        onIdle={onMapIdle}>
                        {showCountryLayer && countryLayer && buildCountries()}
                        {buildMarkers()}
                        {showCircleLayer && buildCircles()}
                    </GoogleMap>
                </div>
            </div>
        </>
    );
};

export default DestinationMap;
