import React, { useState, useCallback, useRef, useEffect } from 'react';

import {
    GoogleMap,
    Marker,
    Polygon,
    Circle,
    OverlayView,
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

const AccommodationMap = ({
    destinations: { locations },
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

    const containerRef = useRef(null);

    const firstTime = useRef(true);

    const circleOptions = {
        strokeColor: '#34D399',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#34D399',
        fillOpacity: 0.2
    };
    const buildMarkers = () => {
        const overlays = drawCircles();
        return locations
            .filter((loc) => loc.type !== 'circle')
            .map((obj, index) => {
                const {
                    location: { lat, lng }
                } = locations[index].data;
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
                            anchor: new window.google.maps.Point(15, 30),
                            scaledSize: new window.google.maps.Size(30, 30)
                        }}
                    />
                );
            })
            .concat(overlays);
    };

    const drawCircles = () => {
        if (!mapReady) return;
        const overlayArray = [];
        const circlesArr = [];
        locations
            .filter((loc) => loc.type === 'circle')
            .forEach((obj, index) => {
                const {
                    circle: { location, radius },
                    label
                } = obj;
                const key = `${location.lat}${index}`;

                circlesArr.push(
                    <Circle
                        options={{ ...circleOptions }}
                        key={`circle_${key}`}
                        center={location}
                        radius={radius}
                    />
                );

                overlayArray.push(
                    <OverlayView
                        key={key}
                        position={location}
                        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
                        <div style={{ background: 'white' }}>{label}</div>
                    </OverlayView>
                );
            });

        return overlayArray.concat(circlesArr);
    };
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
        setMapReady(true);
    }, []);

    const onMapIdle = () => {
        const cZoom = mapRef.current.getZoom();
    };

    const resetBounds = () => {
        if (mapReady) {
            const bounds = new window.google.maps.LatLngBounds();

            locations
                .filter((loc) => loc.type === 'circle')
                .forEach((obj, index) => {
                    const { bounds: circleBounds } = obj.circle;
                    bounds.union(circleBounds);
                });
            locations
                .filter((loc) => loc.type !== 'circle')
                .forEach((obj) => {
                    const {
                        data: { location }
                    } = obj;

                    bounds.extend(location);
                });

            if (!locations.length) {
                mapRef.current.setZoom(1);
                mapRef.current.setCenter({
                    lat: 0,
                    lng: 0
                });
            } else {
                if (locations.length === 1) {
                    if (locations[0].type === 'circle') {
                        mapRef.current.setCenter({
                            lat: locations[0].circle.location.lat,
                            lng: locations[0].circle.location.lng
                        });
                        mapRef.current.fitBounds(bounds);
                    } else {
                        mapRef.current.setCenter({
                            lat: locations[0].data.location.lat,
                            lng: locations[0].data.location.lng
                        });
                        mapRef.current.setZoom(18);
                    }
                } else mapRef.current.fitBounds(bounds);
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
            <div className="mb-6">
                <div className="relative" ref={containerRef}>
                    <>
                        <div className="absolute top-8 right-8 z-10">
                            <CollapseButton
                                labelHover="Zoom to fit"
                                handleClick={resetBounds}
                                icon="ri-artboard-2-line text-2xl -ml-0.5"
                                size="10"
                                textSize="text-xs"
                                sizeHover="w-36"
                                offsetCenter="3"
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
                        {buildMarkers()}
                    </GoogleMap>
                </div>
            </div>
        </>
    );
};

export default AccommodationMap;
