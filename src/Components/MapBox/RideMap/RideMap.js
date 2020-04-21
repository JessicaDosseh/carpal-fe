import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import Logo from "../../../img/Logo.png";
import "./RideMap.scss";
import "mapbox-gl/dist/mapbox-gl.css";
import { config } from "dotenv";
config();
const mapboxAPI = process.env.REACT_APP_MAPBOX_TOKEN;

function RideMap(props) {
    const [viewport, setViewport] = useState({
        latitude: 0,
        longitude: 0,
        zoom: 15,
        width: "100%",
        height: "100vh",
        position: "center"
    });

    const locations = [
        {
            lat: props.start[1],
            long: props.start[0]
        },
        {
            lat: props.end[1],
            long: props.end[0]
        }
    ];

    //State for keeping track of the Markers long/lat

    const [marker, setMarker] = useState({
        latitude: 37.718436,
        longitude: -122.457827
    });
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(getUserLocation);
    }, []);
    const getUserLocation = (position) => {
        var crd = position.coords;
        setViewport({
            ...viewport,
            latitude: crd.latitude,
            longitude: crd.longitude
        });
        //When we Get users location we set the marker to the users current location
        setMarker({
            latitude: crd.latitude,
            longitude: crd.longitude
        });
    };
    const handleDragEnd = (event) => {
        setViewport({
            ...viewport,
            longitude: event.lngLat[0],
            latitude: event.lngLat[1]
        });
        //Update Users location on dragend
        setMarker({
            longitude: event.lngLat[0],
            latitude: event.lngLat[1]
        });
    };
    return (
        <div role="map-wrapper" className="map">
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={mapboxAPI}
                onViewportChange={(viewport) => {
                    setViewport(viewport);
                }}
            >
                {locations &&
                    locations.map((cur, index) => (
                        <Marker
                            key={index}
                            latitude={cur.lat || marker.latitude}
                            longitude={cur.long || marker.longitude}
                            offsetLeft={-10}
                            offsetTop={-10}
                            draggable={true}
                            onDragEnd={handleDragEnd}
                        >
                            <img
                                src={`${Logo}`}
                                alt="marker"
                                style={{
                                    width: "20px",
                                    height: "20px",
                                    borderRadius: "50%"
                                }}
                            />
                        </Marker>
                    ))}
            </ReactMapGL>
        </div>
    );
}
export default RideMap;
