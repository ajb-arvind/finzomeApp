import styles from '../assets/CSSModules/table-style.module.css';
import { FaRegPenToSquare, FaTrash } from 'react-icons/fa6';
import ModalComponent from './ModalComponent';
import { useState } from 'react';
import { useModalContext } from '../context/ModalContext';

const TableComponent = ({
  updateExistingDetail,
  details,
  handleDeleteDetail,
}) => {
  const { openModal } = useModalContext();

  return (
    <div className={styles.card}>
      <table>
        <thead>
          <tr>
            <th>S. No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Weekday</th>
            <th>Gender</th>
            <th>DOB</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {details &&
            details.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.contact}</td>
                  <td>
                    <ul className={styles.weekday_row}>
                      {item.weekday.map((day) => (
                        <li key={day}>{day}</li>
                      ))}
                    </ul>
                  </td>
                  <td>{item.gender}</td>
                  <td>{item.dob}</td>
                  <td>
                    <div className={styles.action_row}>
                      <button
                        className={`${styles.action_icon} ${styles.edit_icon}`}
                        onClick={() => openModal(item)}
                      >
                        <FaRegPenToSquare />
                      </button>
                      <button
                        onClick={() => handleDeleteDetail(item.id)}
                        className={`${styles.action_icon} ${styles.delete_icon}`}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <ModalComponent updateExistingDetail={updateExistingDetail} />
    </div>
  );
};
export default TableComponent;
