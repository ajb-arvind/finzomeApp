import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import styles from '../assets/CSSModules/form-style.module.css';
import { useModalContext } from '../context/ModalContext';
import { formatDateDDYMMYYY } from '../Utils/utlis';

const WEEKDAY = [
  { id: 0, name: 'Monday', value: 'monday' },
  { id: 1, name: 'Tuesday', value: 'tuesday' },
  { id: 2, name: 'Wednesday', value: 'wednesday' },
  { id: 3, name: 'Thursday', value: 'Thursday' },
  { id: 4, name: 'Friday', value: 'Friday' },
];

const FormComponent = ({ updateDetails }) => {
  const { currentItem, closeModal } = useModalContext();
  const InitialValues = currentItem
    ? {
        name: currentItem.name,
        email: currentItem.email,
        contact: currentItem.contact,
        weekday: currentItem.weekday,
        gender: currentItem.gender,
        dob: currentItem.dob,
      }
    : {
        name: '',
        email: '',
        contact: '',
        weekday: [],
        gender: '',
        dob: '',
      };
  return (
    <Formik
      initialValues={InitialValues}
      enableReinitialize
      validationSchema={Yup.object({
        name: Yup.string().required('Required'),

        email: Yup.string().email('Invalid email address').required('Required'),
        contact: Yup.string()
          .min(9, 'Must be length 9 or greater')
          .required('Required'),

        weekday: Yup.array().required('Required'),
        gender: Yup.string().required('Required'),
        dob: Yup.date()
          .required('Required')
          .max(
            formatDateDDYMMYYY(new Date()),
            'DOB should less than today date'
          ),
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        updateDetails(values, currentItem?.id);
        setSubmitting(false);
        resetForm();
        closeModal();
      }}
    >
      <Form className={styles.form}>
        <div className={styles.form_row}>
          <label className={styles.form_label} htmlFor="name">
            Name
          </label>
          <Field
            className={styles.form_input}
            name="name"
            type="text"
            placeholder="Jane Doe"
          />
          <div className={styles.form_alert}>
            <ErrorMessage name="name" />
          </div>
        </div>

        <div className={styles.form_row}>
          <label className={styles.form_label} htmlFor="email">
            Email Address
          </label>
          <Field
            className={styles.form_input}
            name="email"
            type="email"
            placeholder="jone.doe@mail.com"
          />
          <div className={styles.form_alert}>
            <ErrorMessage name="email" />
          </div>
        </div>

        <div className={styles.form_row}>
          <label className={styles.form_label} htmlFor="contact">
            Contact
          </label>
          <Field
            className={styles.form_input}
            name="contact"
            type="number"
            placeholder=""
          />
          <div className={styles.form_alert}>
            <ErrorMessage name="contact" />
          </div>
        </div>

        <label className={styles.form_label} htmlFor="weekday">
          Weekday
        </label>
        <div className={`${styles.form_row} ${styles.left_align}`}>
          {WEEKDAY.map((day) => {
            return (
              <div key={day.id} className={styles.form_checkbox_row}>
                <Field name="weekday" type="checkbox" value={day.value} />
                <label className={styles.form_label} htmlFor="weekday">
                  {day.name}
                </label>
              </div>
            );
          })}
          <div className={styles.form_alert}>
            <ErrorMessage name="weekday" />
          </div>
        </div>

        <label className={styles.form_label} htmlFor="gender">
          Gender
        </label>
        <div
          className={`${styles.form_row} ${styles.left_align} ${styles.form_checkbox_row}`}
        >
          <Field name="gender" type="radio" value="male" />
          <label className={styles.form_label} htmlFor="gender">
            Male
          </label>
          <Field name="gender" type="radio" value="female" />
          <label className={styles.form_label} htmlFor="gender">
            Female
          </label>
          <div className={styles.form_alert}>
            <ErrorMessage name="gender" />
          </div>
        </div>

        <div className={styles.form_row}>
          <label className={styles.form_label} htmlFor="dob">
            DOB
          </label>
          <Field className={styles.form_input} name="dob" type="date" />
          <div className={styles.form_alert}>
            <ErrorMessage name="dob" />
          </div>
        </div>

        <button type="submit" className={`${styles.btn} ${styles.btn_block}`}>
          {currentItem ? 'Save Edit' : 'Submit'}
        </button>
      </Form>
    </Formik>
  );
};
export default FormComponent;
