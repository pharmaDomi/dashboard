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
import { Loading } from 'src/loading/loading'
import { baseUrl } from 'src/helpers/BaseUrl'
import { getToken } from 'src/helpers/RetriveToken'
const AddPharmacy = () => {
  const [loading, setLoading] = useState(false)
  const [pharmacyData, setPharmacyData] = useState({
    pharmacyName: '',
    ownerName: '',
    phoneNumber: '',
    longitude: '',
    latitude: '',
    image: null,
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setPharmacyData({ ...pharmacyData, [name]: value })
  }

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0]
    previewFiles(imageFile)
  }
  const [tempsrc, setTempsrc] = useState('')
  function previewFiles(file) {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setTempsrc(reader.result)
      console.log(tempsrc)
    }
  }
  const token = getToken()
  const handleSubmit = async (token) => {
    setLoading(true)
    try {
      const response = await axios.post(
        `${baseUrl}/pharmacies`,
        {
          image: tempsrc,
          pharmacyData: pharmacyData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'X-Content-Type-Options': 'nosniff',
            'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
            'X-Frame-Options': 'DENY',
            'X-XSS-Protection': '1; mode=block',
            'Referrer-Policy': 'no-referrer',
            'Cache-Control': 'no-store',
          },
        },
      )

      console.log('Response:', response.data)
      setLoading(false)
      alert('Pharmacy added successfully!')
      setPharmacyData({
        pharmacyName: '',
        ownerName: '',
        phoneNumber: '',
        longitude: '',
        latitude: '',
      })
      setTempsrc('')
    } catch (error) {
      console.error('Error adding pharmacy:', error)

      // Display appropriate error messages based on error response
      if (error.response) {
        setLoading(false)
        // The request was made and the server responded with a status code
        if (error.response.status === 400) {
          alert('Error: Phone number should be 8 digits')
        } else if (error.response.status === 409) {
          alert('Error: Pharmacy name or phone number already exists')
        } else if (error.response.status === 500) {
          alert('Error: Could not upload image to server')
        } else {
          alert('Error: An unexpected error occurred. Please try again later.')
        }
      } else if (error.request) {
        setLoading(false)

        // The request was made but no response was received
        alert('Network error: Please check your internet connection and try again.')
      } else {
        setLoading(false)
        // Something else happened while setting up the request
        alert('Error: An unexpected error occurred. Please try again later.')
      }
    }
  }

  return (
    <div>
      {loading ? (
        <Loading loading={loading} />
      ) : (
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
                  <CFormInput type="file" id="inputGroupFile01" onChange={handleImageChange} />
                </CInputGroup>
                <img
                  style={{ width: '30%', height: '30%' }}
                  src={tempsrc}
                  alt="no file is selected"
                ></img>
              </CCardBody>
            </CCard>
            <CButton className="m-3" color="primary" onClick={() => handleSubmit(token)}>
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
                  image: null,
                })
              }
            >
              Clear All
            </CButton>
          </CCol>
        </CRow>
      )}
    </div>
  )
}

export default AddPharmacy
