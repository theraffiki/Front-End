// create watering schedule
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { withFormik, Form, Field } from 'formik';
import * as yup from 'yup';

const Body = styled.div`
  background-color: black;
  width: 100%;
  height: 100%;
`;

const PlantForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  padding: 1.5rem 0;
  margin: 3rem auto;
  background-color: #d4d4aa;
  color: #000;
`;

const Heading = styled.h1`
  font-size: 3rem;
  font-weight: 300;
  text-align: center;
`;

const FieldInput = styled(Field)`
  margin: 1rem auto;
  width: 70%;
  height: 2rem;
  border: none;
  padding: 0.5rem;
  font-size: 1.5rem;
  background-color: #666633;
  &::placeholder {
    color: #fff;
  }
`;

const Button = styled.button`
  height: 2.5rem;
  margin: 0.5rem auto;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  text-align: center;
  text-decoration: none;
  border: none;
  background-color: #fff;
  transition: all 0.3s ease-in;
  &:hover {
    background-color: #000;
    color: #fff;
  }
`;

const Error = styled.p`
  width: 70%;
  height: 1.5rem;
  font-size: 0.75rem;
  text-align: center;
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
  padding: 5px 10px;
  margin: -8px auto -1rem;
  z-index: 3;
`;

const NewPlant = ({ errors, touched, status }) => {
  const [newPlant, addNewPlant] = useState([]);

  useEffect(() => {
    if (status) {
      addNewPlant([...newPlant, status]);
    }
  }, [newPlant, status]);

  return (
    <>
      <Heading>Add a Plant!</Heading>
      <PlantForm>
        {touched.plant && errors.plant && (
          <Error className="error">{errors.plant}</Error>
        )}
        <FieldInput type="text" name="plant" placeholder="Plant Name" />

        {touched.species && errors.species && (
          <Error className="error">{errors.species}</Error>
        )}
        <FieldInput type="text" name="species" placeholder="Species" />

        {touched.water && errors.water && (
          <Error className="error">{errors.water}</Error>
        )}
        <FieldInput type="text" name="water" placeholder="Water Schedule" />

        <Button type="submit">Submit!</Button>
      </PlantForm>
    </>
  );
};

export default withFormik({
  mapPropsToValues: values => {
    return {
      plant: values.plant || '',
      species: values.species || '',
      water: values.water || ''
    };
  },
  validationSchema: yup.object().shape({
    plant: yup.string().required('Add plant name'),
    species: yup.string().required("What's it's species?"),
    water: yup.string().required('Make a Schedule!')
  }),
  handleSubmit: (values, { setStatus }) => {
    axios
      .post('https://water-my-plant-bw.herokuapp.com/api/plants/', values)
      .then(response => {
        console.log(response.data);
        setStatus(response.data);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }
})(NewPlant);
