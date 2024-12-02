import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useParams,
  Link,
  Outlet,
  Routes,
  Route,
  NavLink,
  useNavigate,
} from "react-router-dom";
import { fetchCamperById, clearCamperDetails } from "../../redux/campersSlice";
import styles from "./CamperDetailsPage.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DNA } from "react-loader-spinner";
import { toast } from "react-hot-toast";

const CamperDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    camperDetails: camper,
    isDetailsLoading: loading,
    error,
  } = useSelector((state) => state.campers);

  useEffect(() => {
    dispatch(fetchCamperById(id));

    if (
      !window.location.pathname.includes("features") &&
      !window.location.pathname.includes("reviews")
    ) {
      navigate("features", { replace: true });
    }

    return () => {
      dispatch(clearCamperDetails());
    };
  }, [id, dispatch, navigate]);

  if (loading)
    return (
      <div>
        <div className={styles.loaderContainer}>
          <DNA
            visible={true}
            height="100"
            width="100"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </div>
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  if (!camper) return null;

  return (
    <div className={styles.camperDetailsPage}>
      <div className={styles.details}>
        <h3 className={styles.name}>{camper.name}</h3>
      </div>
      <div className={styles.location}>
        <div className={styles.rating}>
          <svg width="16" height="16">
            <use href="/sprite.svg#icon-star"></use>
          </svg>
          {camper.rating} ({camper.reviews.length} Reviews)
        </div>
        <div>
          <svg className={styles.icon} width="16" height="16">
            <use href="/sprite.svg#icon-map"></use>
          </svg>
          {camper.location}
        </div>
      </div>
      <div className={styles.footer}>
        <p className={styles.price}>€{camper.price.toFixed(2)}</p>
      </div>
      <div className={styles.pictures}>
        {camper.gallery.map((image, index) => (
          <img key={index} src={image.original} alt={`Camper ${index}`} />
        ))}
      </div>
      <p className={styles.description}>{camper.description}</p>

      <nav className={styles.nav}>
        <NavLink
          to="features"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          Features
        </NavLink>
        <NavLink
          to="reviews"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          Reviews
        </NavLink>
      </nav>

      <div className={styles.container}>
        <div className={styles.info}>
          <Outlet context={{ camper }} />
        </div>

        <div className={styles.formContainer}>
          <Formik
            initialValues={{
              name: "",
              email: "",
              bookingDate: null,
              comment: "",
            }}
            validationSchema={Yup.object({
              name: Yup.string().required("Name is required"),
              email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
              bookingDate: Yup.date()
                .required("Booking date is required")
                .nullable(),
              comment: Yup.string(),
            })}
            onSubmit={(values, { resetForm }) => {
              toast.success("Camper successfully booked!");
              resetForm();
            }}
          >
            {({ setFieldValue, values, isValid, dirty }) => (
              <Form className={styles.bookingForm}>
                <h2 className={styles.title}>Book your campervan now</h2>
                <p className={styles.description}>
                  Stay connected! We are always ready to help you.
                </p>
                <div className={styles.formGroup}>
                  <Field
                    name="name"
                    type="text"
                    placeholder="Name*"
                    className={styles.inputField}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className={styles.error}
                  />
                </div>
                <div className={styles.formGroup}>
                  <Field
                    name="email"
                    type="email"
                    className={styles.inputField}
                    placeholder="Email*"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={styles.error}
                  />
                </div>
                <div className={styles.formGroup}>
                  <DatePicker
                    selected={values.bookingDate}
                    onChange={(date) => setFieldValue("bookingDate", date)}
                    dateFormat="dd.MM.yyyy"
                    placeholderText="Booking date*"
                    className={styles.inputField}
                  />
                  <ErrorMessage
                    name="bookingDate"
                    component="div"
                    className={styles.error}
                  />
                </div>
                <div className={styles.formGroup}>
                  <Field
                    name="comment"
                    as="textarea"
                    placeholder="Comment"
                    className={styles.textareaField}
                  />
                </div>
                <button
                  type="submit"
                  disabled={!(isValid && dirty)}
                  className={styles.submitButton}
                >
                  Send
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CamperDetailsPage;
