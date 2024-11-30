import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, Outlet } from "react-router-dom";
import { fetchCamperById, clearCamperDetails } from "../../redux/campersSlice";
import styles from "./CamperDetailsPage.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Features from "../Features/Features";
import Reviews from "../Reviews/Reviews";

const CamperDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    camperDetails: camper,
    isDetailsLoading: loading,
    error,
  } = useSelector((state) => state.campers);

  useEffect(() => {
    dispatch(fetchCamperById(id));

    return () => {
      dispatch(clearCamperDetails()); // Очистка состояния при размонтировании
    };
  }, [id, dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!camper) return null;

  return (
    <div className={styles.camperDetailsPage}>
      <div className={styles.details}>
        <h1>{camper.name}</h1>
        <div className={styles.pictures}>
          {camper.gallery.map((image, index) => (
            <img key={index} src={image.original} alt={`Camper ${index}`} />
          ))}
        </div>
        <p>{camper.description}</p>
      </div>

      <nav className={styles.nav}>
        <Link to="features" className={styles.navLink}>
          Features
        </Link>
        <Link to="reviews" className={styles.navLink}>
          Reviews
        </Link>
      </nav>

      <Outlet context={{ camper }} />

      <Formik
        initialValues={{
          name: "",
          email: "",
          bookingDate: "",
          comment: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Name is required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
          bookingDate: Yup.date().required("Booking date is required"),
          comment: Yup.string(),
        })}
        onSubmit={(values, { resetForm }) => {
          console.log("Booking form submitted:", values);
          resetForm();
        }}
      >
        <Form className={styles.bookingForm}>
          <h2>Book your campervan now</h2>
          <p>Stay connected! We are always ready to help you.</p>

          <div className={styles.formGroup}>
            <label htmlFor="name">Name*</label>
            <Field name="name" type="text" className={styles.inputField} />
            <ErrorMessage
              name="name"
              component="div"
              className={styles.error}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email*</label>
            <Field name="email" type="email" className={styles.inputField} />
            <ErrorMessage
              name="email"
              component="div"
              className={styles.error}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="bookingDate">Booking date*</label>
            <Field
              name="bookingDate"
              type="date"
              className={styles.inputField}
            />
            <ErrorMessage
              name="bookingDate"
              component="div"
              className={styles.error}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="comment">Comment</label>
            <Field
              name="comment"
              as="textarea"
              className={styles.textareaField}
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Send
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default CamperDetailsPage;
