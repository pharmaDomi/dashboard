import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CRow,
  CButton,
} from '@coreui/react'
import axios from 'axios'
const AddPharmacy = () => {
  const [pharmacyData, setPharmacyData] = useState({
    pharmacyName: '',
    ownerName: '',
    phoneNumber: '',
    longitude: '',
    latitude: '',
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setPharmacyData({ ...pharmacyData, [name]: value })
  }

  const handleSubmit = async () => {
    try {
      const isAnyFieldEmpty = Object.values(pharmacyData).some((value) => value === '')
      if (isAnyFieldEmpty) {
        alert('Please fill in all fields')
        return
      }
      const response = await axios.post('http://localhost:3117/pharmacies', pharmacyData)
      console.log('Response:', response.data)
      // Show success message
      alert('Pharmacy added successfully!')
      // Reset form fields after successful submission
      setPharmacyData({
        pharmacyName: '',
        ownerName: '',
        phoneNumber: '',
        longitude: '',
        latitude: '',
      })
    } catch (error) {
      console.error('Error adding pharmacy:', error.response.data.error)
      // Show specific error message based on the error status
      if (error.response.status === 400) {
        alert('Phone number should be 8 digits.')
      } else if (error.response.status === 409) {
        alert('Pharmacy with the same name already exists.')
      } else {
        alert('Error adding pharmacy. Please try again.')
      }
    }
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add a new pharmacy</strong>
          </CCardHeader>
          <CCardBody>
            <CFormLabel htmlFor="pharmacyName">Pharmacy name</CFormLabel>

            <CInputGroup className="mb-3">
              <CFormInput
                name="pharmacyName"
                value={pharmacyData.pharmacyName}
                onChange={handleInputChange}
                placeholder="Pharmacy name"
                aria-label="Pharmacy name"
              />
            </CInputGroup>
            <CFormLabel htmlFor="ownerName">Owner name</CFormLabel>

            <CInputGroup className="mb-3">
              <CFormInput
                name="ownerName"
                value={pharmacyData.ownerName}
                onChange={handleInputChange}
                placeholder="Pharmacy owner name"
                aria-label="Recipient&#39;s username"
                aria-describedby="basic-addon2"
              />
            </CInputGroup>
            <CFormLabel htmlFor="PhoneNumber">Phone Number</CFormLabel>
            <CInputGroup className="mb-3">
              <CInputGroupText id="basic-addon3">+216</CInputGroupText>
              <CFormInput
                id="PhoneNumber"
                name="phoneNumber"
                value={pharmacyData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Phone Number"
                aria-describedby="basic-addon3"
              />
            </CInputGroup>
            <CFormLabel htmlFor="Longitude">Location</CFormLabel>
            <CInputGroup className="mb-3">
              <CFormInput
                placeholder="Longitude"
                name="longitude"
                value={pharmacyData.longitude}
                onChange={handleInputChange}
                aria-label="longitude"
              />
              <CInputGroupText>/</CInputGroupText>
              <CFormInput
                placeholder="Latitude"
                name="latitude"
                value={pharmacyData.latitude}
                onChange={handleInputChange}
                aria-label="Latitude"
              />
            </CInputGroup>
            <CFormLabel htmlFor="basic-url">Add An image</CFormLabel>
            <CInputGroup className="mb-3">
              <CFormInput type="file" id="inputGroupFile01" />
            </CInputGroup>
          </CCardBody>
        </CCard>
        <CButton className="m-3" color="primary" onClick={handleSubmit}>
          Add
        </CButton>
        <CButton
          className="m-3"
          color="danger"
          onClick={() =>
            setPharmacyData({
              pharmacyName: '',
              ownerName: '',
              phoneNumber: '',
              longitude: '',
              latitude: '',
            })
          }
        >
          Clear All
        </CButton>
      </CCol>
    </CRow>
  )
}

export default AddPharmacy
