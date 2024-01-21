import Form from './component/FormComponent';
import TableComponent from './component/TableComponent';
import styles from './assets/CSSModules/app-style.module.css';
import { useState } from 'react';
import ModalComponent from './component/ModalComponent';

const INITIAL_DETAILS = [
  {
    id: 1,
    name: 'Arvind Badwar',
    email: 'arvind.bdw@gmail.com',
    contact: 987654321,
    weekday: ['monday', 'tuesday', 'wednesday'],
    gender: 'male',
    dob: '1998-01-01',
  },
];

function App() {
  const [details, setDetails] = useState(INITIAL_DETAILS);
  // console.log(details);

  const addNewDetails = (value) => {
    console.log(value);
    const newValue = { ...value, id: details.length + 1 };
    setDetails([...details, newValue]);
  };

  function handleDeleteDetail(id) {
    const newDetails = details.filter((item) => item.id !== id);
    setDetails(newDetails);
  }

  function updateExistingDetail(value, id) {
    const newDetails = details.map((item) => {
      if (item.id === id) return { ...value, id: id };
      else return item;
    });
    setDetails(newDetails);
    
  }

  return (
    <div className={styles.container}>
      <Form updateDetails={addNewDetails} />
      <TableComponent
        details={details}
        handleDeleteDetail={handleDeleteDetail}
        updateExistingDetail={updateExistingDetail}
      />
    </div>
  );
}

export default App;
