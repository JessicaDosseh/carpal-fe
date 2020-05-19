import React, { useState, useEffect } from "react";
import "./SavedRideCard.scss";
import {
    DeleteLocation,
    getFavorites
} from "../../../Redux/Actions/LocationActions";
import {
    setStartLocation,
    setEndLocation
} from "../../../Redux/Actions/UserAction";
import { connect } from "react-redux";
import EditLocationForm from "./EditLocation";

function SavedRideCard(props) {
    const [show, setShow] = useState(false);
    const [currentLocation, setCurrentLocation] = useState();

    const { onUpdate } = props;

    useEffect(() => {
        const place = props.loc.filter((location) => {
            if (location.id === props.id) {
                setCurrentLocation(location);
            }
        });
    }, []);

    const handleDelete = (id) => {
        props.DeleteLocation(props.id);
        props.onUpdate();
    };

    const handleEdit = (id) => {
        setShow(!show);
    };

    const handleShow = () => {
        setShow(!show);
    };
    const handleStart = () => {
        // console.log("in handle start", currentLocation);
        props.setStartLocation(props.data);
    };
    const handleEnd = () => {
        // console.log("in handle end", currentLocation);
        props.setEndLocation(props.data);
    };

    return (
        <div className="saved-card">
            {show ? (
                <EditLocationForm
                    setCurrentLocation={setCurrentLocation}
                    toggle={handleShow}
                    location_id={props.data.id}
                    onUpdate={onUpdate}
                />
            ) : (
                <section className="saved-card">
                    <h3>{props.data.name}</h3>
                    <button onClick={handleEdit}> Edit </button>
                    <button onClick={handleDelete}> Delete </button>
                    <button onClick={handleStart}>Use as Start</button>
                    <button onClick={handleEnd}>Use as End</button>
                </section>
            )}
        </div>
    );
}

const mapStateToProps = (state) => ({
    loc: state.locations.favoriteLocation
});

export default connect(mapStateToProps, {
    DeleteLocation,
    getFavorites,
    setStartLocation,
    setEndLocation
})(SavedRideCard);
