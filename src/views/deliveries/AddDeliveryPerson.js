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

const AddDeliveryPerson = () => {
  const [deliveryPersonData, setDeliveryPersonData] = useState({
    cin: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
    vehicleType: '',
  })

  const [loading, setLoading] = useState(false)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setDeliveryPersonData({ ...deliveryPersonData, [name]: value })
  }

  const showErrorAlert = (message) => {
    alert(`Error: ${message}`)
  }

  const showSuccessAlert = (message) => {
    alert(`Success: ${message}`)
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)

      const isAnyFieldEmpty = Object.values(deliveryPersonData).some((value) => value === '')
      if (isAnyFieldEmpty) {
        showErrorAlert('Please fill in all fields')
        return
      }

      const response = await axios.post(
        'http://localhost:3117/deliveries/createDeliveryPerson',
        deliveryPersonData,
      )
      console.log('Response:', response.data)

      // Show success message
      showSuccessAlert('Delivery person added successfully!')

      // Reset form fields after successful submission
      setDeliveryPersonData({
        cin: '',
        fullName: '',
        email: '',
        phoneNumber: '',
        address: '',
        vehicleType: '',
      })
    } catch (error) {
      console.error('Error adding delivery person:', error.response.data.error)

      // Show specific error message based on the error status
      if (error.response.status === 400) {
        showErrorAlert('Phone number and cin should be 8 digits.')
      } else if (error.response.status === 409) {
        showErrorAlert('Delivery person with the same email already exists.')
      } else {
        showErrorAlert('Error adding delivery person. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add a new delivery person</strong>
          </CCardHeader>
          <CCardBody>
            <CFormLabel htmlFor="fullName">cin</CFormLabel>
            <CInputGroup className="mb-3">
              <CFormInput
                name="cin"
                value={deliveryPersonData.cin}
                onChange={handleInputChange}
                placeholder="Cin"
                aria-label="Cin"
              />
            </CInputGroup>
            <CFormLabel htmlFor="fullName">Full Name</CFormLabel>
            <CInputGroup className="mb-3">
              <CFormInput
                name="fullName"
                value={deliveryPersonData.fullName}
                onChange={handleInputChange}
                placeholder="Full Name"
                aria-label="Full Name"
              />
            </CInputGroup>

            <CFormLabel htmlFor="email">Email</CFormLabel>
            <CInputGroup className="mb-3">
              <CFormInput
                name="email"
                type="email"
                value={deliveryPersonData.email}
                onChange={handleInputChange}
                placeholder="Email"
                aria-label="Email"
              />
            </CInputGroup>

            <CFormLabel htmlFor="phoneNumber">Phone Number</CFormLabel>
            <CInputGroup className="mb-3">
              <CInputGroupText id="basic-addon3">+216</CInputGroupText>
              <CFormInput
                id="phoneNumber"
                name="phoneNumber"
                value={deliveryPersonData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Phone Number"
                aria-describedby="basic-addon3"
              />
            </CInputGroup>

            <CFormLabel htmlFor="address">Address</CFormLabel>
            <CInputGroup className="mb-3">
              <CFormInput
                name="address"
                type="text"
                value={deliveryPersonData.address}
                onChange={handleInputChange}
                placeholder="Address"
                aria-label="Address"
              />
            </CInputGroup>
            <CFormLabel htmlFor="vehicle">vehicle</CFormLabel>
            <CInputGroup className="mb-3">
              <CFormInput
                name="vehicleType"
                value={deliveryPersonData.vehicleType}
                onChange={handleInputChange}
                placeholder="vehicle"
                aria-label="vehicle"
              />
            </CInputGroup>

            {/* Add other form fields as needed */}
          </CCardBody>
        </CCard>
        <CButton className="m-3" color="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Adding...' : 'Add'}
        </CButton>
        <CButton
          className="m-3"
          color="danger"
          onClick={() =>
            setDeliveryPersonData({
              fullName: '',
              email: '',
              phoneNumber: '',
              password: '',
              address: '',
              img: '',
              id: '',
              vehicleType: '',
              licensePlate: '',
            })
          }
        >
          Clear All
        </CButton>
      </CCol>
    </CRow>
  )
}

export default AddDeliveryPerson
