import React, { useState, useEffect } from "react";
import { Form, withFormik, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./Profile-Pages.scss";
import "../../index.scss";

//TODO - Test Use Effect with Seed Data
//TODO - Setup input for image, and coordinate with BE for storage via S3 bucket
//TODO - Create Loading Spinner Component

const userEndpoint = `https://carpal-${process.NODE_ENV}.herokuapp.com/}`;
const ProfilePage = ({ errors, status, touched }) => {
    const [user, setUser] = useState({
        first_name: "Steveen ",
        last_name: "Van",
        phone_number: "(555) 555-5555",
        email: "steve@steve.com",
        isDriver: false,
        hobbies: ["sports", "music", "dancing"],
        audio_love: ["electronic"],
        audio_hate: ["news"]
    });
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [load, setLoad] = useState(false);
    const [error, setError] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (isLoggedIn && !user) {
            console.log("use effect works");
            axios
                .get(`${userEndpoint}`)
                .then(res => {
                    setUser([...user, user]);
                    setLoad(true);
                })
                .catch(err => {
                    setError(err.message);
                    setLoad(true);
                });
        }
    }, [user]);

    function onEditProfileSubmit(e) {
        e.preventDefault();
        setIsEditing(!isEditing);
    }

    return (
        <div className="contanier">
            {isEditing ? (
                <div>
                    <Form className="formik-container">
                        {touched.name && errors.name}
                        <Field
                            name="first_name"
                            type="text"
                            placeholder="First name"
                            className="formik-fields"
                        />
                        <Field
                            name="last_name"
                            type="text"
                            placeholder="Last name"
                            className="formik-fields"
                        />
                        <Field
                            name="email"
                            type="email"
                            placeholder="Email"
                            className="formik-fields"
                        />
                        <Field
                            name="phone_number"
                            type=""
                            placeholder="Phone Number"
                            className="formik-fields"
                        />
                        <Field
                            name="role"
                            component="select"
                            className="formik-fields"
                        >
                            <option value="" disabled>
                                Would you like to be a driver:
                            </option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </Field>
                        <Field
                            name="hobbies"
                            component="select"
                            className="formik-fields"
                        >
                            <option value="" disabled>
                                Select your Hobby:
                            </option>
                            <option value="Jogging">Jogging</option>
                            <option value="Video games">Video games</option>
                            <option value="Sports">Sports</option>
                            <option value="Gardening">Gardening</option>
                        </Field>
                        <Field
                            name="audio_love"
                            component="select"
                            className="formik-fields"
                        >
                            <option value="" disabled>
                                Audio I love:
                            </option>
                            <option value="Pop">Pop</option>
                            <option value="Classical">Classical</option>
                        </Field>
                        <Field
                            name="audio_hate"
                            component="select"
                            className="formik-fields"
                        >
                            <option value="" disabled>
                                Audio I Hate:
                            </option>
                            <option value="Pop">Pop</option>
                            <option value="Classical">Classical</option>
                        </Field>

                        {/* Mapbox will go here */}
                        {user.first_name ? (
                            <button
                                type="submit"
                                className="form-btn"
                                onClick={onEditProfileSubmit}
                            >
                                Update Profile
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="form-btn"
                                onClick={onEditProfileSubmit}
                            >
                                Save Profile
                            </button>
                        )}
                    </Form>
                </div>
            ) : (
                <div className="container">
                    {user.first_name ? (
                        <>
                            <div className="profileHeader">
                                <div className="headerImage">
                                    <img
                                        className="profilePic"
                                        src="https://pbs.twimg.com/profile_images/1232869769013014535/iwN5kET4_400x400.jpg"
                                        alt="img1"
                                    ></img>
                                    <a
                                        className="overlaybutton"
                                        href="#"
                                        alt="Profile"
                                    >
                                        Upload Image
                                    </a>
                                </div>
                                <div className="headerDetails">
                                    <h3 role="header name" className="bold">
                                        {user.first_name}
                                        {user.last_name}
                                    </h3>
                                    <h3>{user.email}</h3>
                                    <h3>{user.phone_number}</h3>
                                </div>
                            </div>
                            <div className="bar"></div>
                            <div className="profileDetails">
                                {user.isDriver ? (
                                    <h2>You are a Driver</h2>
                                ) : (
                                    <h2>You are a Rider</h2>
                                )}
                                <div className="profileSection">
                                    <h2>Hobbies</h2>
                                    <div className="flexContainer">
                                        {user.hobbies.map(hobby => (
                                            <div className="bubble">
                                                {hobby}
                                            </div>
                                        ))}
                                    </div>

                                    <h2>Audio I Love</h2>
                                    <div className="flexContainer">
                                        {user.audio_love.map(audioLove => (
                                            <div className="bubble">
                                                {audioLove}
                                            </div>
                                        ))}
                                    </div>

                                    <h2>Audio I Hate</h2>
                                    <div className="flexContainer">
                                        {user.audio_hate.map(audioHate => (
                                            <div className="bubble">
                                                {audioHate}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* Mapbox will go here */}
                                <div className="buttonContainer">
                                    <button
                                        className="edit"
                                        onClick={onEditProfileSubmit}
                                    >
                                        Edit Profile
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        // <LoadingSpinner />
                        <h1>Pretend this is a loading spinner</h1>
                    )}
                </div>
            )}
        </div>
    );
};

export default withFormik({
    mapPropsToValues: values => {
        return {
            first_name: values.first_name || "",
            last_name: values.last_name || "",
            email: values.email || "",
            phone_number: values.phone_number || "",
            role: values.role || "",
            hobbies: values.hobbies || "",
            audio_hate: values.audio_hate || "",
            audio_love: values.audio_love || ""
        };
    },
    validationSchema: Yup.object().shape({
        first_name: Yup.string().required("First Name Required"),
        last_name: Yup.string().required("Last Name Required"),
        email: Yup.string()
            .email()
            .required("Email Required"),
        phone_number: Yup.number()
            .integer()
            .positive()
            .min(10)
            .required(),
        role: Yup.boolean().required("You must select a role"),
        hobbies: Yup.string(),
        audio_hate: Yup.string(),
        audio_love: Yup.string()
    }),
    handleSubmit: (values, { setStatus }) => {
        // axios.post(`${userEndpoint}`, values)
        // .then((res) => {
        //     setStatus(res.data)
        // })
        // .catch((err) => {
        //     console.log('Error:', err)
        // })
        alert("this will work", values);
    }
})(ProfilePage);