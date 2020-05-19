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

// const [requestedRide, setRequestedRide] = useState();
// have a hook for the drivers requested ride

// onclick set the status to pending then accepted.

// how are we going to relate locationID to requestRideID
// right now in SavedRides we can pull lcoation ID, but we need to make sure that the favorite location ID and requestedID match
// START BUTTON
// sets your pickup coordinates, post then take the returned start_location_id = location id, currently defaulting to 1
// ASYNC setRequestedRide with the new obj
// post new object with start_location_id from POST request above, end_location_id is from selected location
// props.history.push(/requests)
// useState({
//     id: autoincrements,
//     start_location_id: 1, (default to a value),
//     driver_id: null,
//     rider_id: (comes from token -- gets user ID from token),
//     end_location_id: currentLocation.id,
//     status: 'pending',
// })
// ^^ this will be POSTed to /rides/requests

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
        console.log("in handle start", currentLocation);
        props.setStartLocation(currentLocation);
    };

    const handleEnd = () => {
        console.log("in handle end", currentLocation);
        props.setEndLocation(currentLocation);
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
            {console.log(props.data)};
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
