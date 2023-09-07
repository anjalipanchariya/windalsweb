import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import Modal from 'react-modal';
import { useParams } from 'react-router-dom';

const Station = () => {



  const [stations, setStations] = useState([
    { id: 1, name: 'Product A' },
    { id: 2, name: 'Product B' },
    { id: 3, name: 'Product C' },
  ]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isOkayModalOpen, setIsOkayModalOpen] = useState(false);
  const [isrejectedModalOpen, setIsRejectedModalOpen] = useState(false);
  const [modalInputValue, setModalInputValue] = useState('');
  
  
  
  
  const openModal = (product) => {
    setSelectedProduct(product);
    if (product === 'Okay/notOkay') {
      setIsOkayModalOpen(true);
    } else if (product === 'Rejected') {
      setIsRejectedModalOpen(true);
    }
  };

  const handleModalSubmit = () => {
    // Handle the form submission within the modal
    console.log(`Submitted value in ${selectedProduct} modal: ${modalInputValue}`);
    // You can send the input value to the backend or perform any other necessary actions here
    closeModal();
  };

  const closeModal = () => {
    setIsOkayModalOpen(false);
    setIsRejectedModalOpen(false);
  };

  

  return (
    <div>
    
      <Formik
        initialValues={{
          station: ''
        }}
        onSubmit={(values, { resetForm }) => {
          console.log('Selected station:', values.station);
          resetForm();
        }}
      >
        <Form>
          <div>
            <label htmlFor="station">Select a station:</label>
            <Field as="select" name="station" id="station">
              <option value="" disabled>Select a station</option>
              {stations.map(station => (
                <option key={station.id} value={station.name}>
                  {station.name}
                </option>
              ))}
            </Field>
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </Form>
      </Formik>

      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Okay/notOkay</th>
            <th>Rejected</th>
          </tr>
        </thead>
        <tbody>
          {stations.map((station, index) => (
            <tr key={station.id}>
              <td>{station.name}</td>
              <td>
                <button onClick={() => openModal('Okay/notOkay')}>Okay/notOkay</button>
              </td>
              <td>
                <button onClick={() => openModal('Rejected')}>Rejected</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Okay action */}
      <Modal
        isOpen={isOkayModalOpen}
        onRequestClose={() => setIsOkayModalOpen(false)}
        contentLabel="Okay Modal"
      >
        <h2>Okay/notOkay</h2>
        <p>Product Name: {selectedProduct}</p>
        <p>Modal content for the Okay action</p>
        <button onClick={() => setIsOkayModalOpen(false)}>Close Modal</button>
      </Modal>

      {/* Modal for Not Okay action */}
      <Modal
        isOpen={isrejectedModalOpen}
        onRequestClose={() => setIsRejectedModalOpen(false)}
        contentLabel="Rejected Modal"
      >
        <h2>Rejected Product</h2>
        <p>Product Name: {selectedProduct}</p>
        <p>Reason why it is rejected.</p>
        <div>
          <label htmlFor="modalInput">Enter Something:</label>
          <input
            type="text"
            id="modalInput"
            value={modalInputValue}
            onChange={(e) => setModalInputValue(e.target.value)}
          />
        </div>
        <button onClick={handleModalSubmit}>Submit</button>
        <button onClick={closeModal}>Close Modal</button>
        

        
      </Modal>
    </div>
  );
};

export default Station;