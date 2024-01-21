import styles from '../assets/CSSModules/modal-style.module.css';
import { useModalContext } from '../context/ModalContext';
import FormComponent from './FormComponent';
const ModalComponent = ({ updateExistingDetail }) => {
  const { isModalOpen, closeModal } = useModalContext();

  return (
    <div
      className={`${styles.modal_overlay} ${
        isModalOpen ? styles.show_modal : null
      }`}
    >
      <div className={styles.modal_container}>
        <FormComponent updateDetails={updateExistingDetail} />
        <button className={styles.close_modal_btn} onClick={closeModal}>
          X
        </button>
      </div>
    </div>
  );
};
export default ModalComponent;
