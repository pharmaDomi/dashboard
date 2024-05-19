import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CInputGroup,
  CFormInput,
} from '@coreui/react'
import axios from 'axios'
import { baseUrl } from 'src/helpers/BaseUrl'
import { getToken } from 'src/helpers/RetriveToken'

const DeliveryPeopleList = () => {
  const [filteredDeliveryPeople, setFilteredDeliveryPeople] = useState([])
  const [filters, setFilters] = useState({
    name: '',
    email: '',
    phone: '',
  })
  const fetchDeliveryPeople = async () => {
    const token = getToken()
    try {
      const response = await axios.get(`${baseUrl}/deliveries/deliveryPeople`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          'Content-Type': 'application/json', // Specify the content type
          Accept: 'application/json', // Specify the accepted response type
          'X-Content-Type-Options': 'nosniff', // Prevent MIME-sniffing
          'Strict-Transport-Security': 'max-age=31536000; includeSubDomains', // Enforce HTTPS
          'X-Frame-Options': 'DENY', // Prevent clickjacking
          'X-XSS-Protection': '1; mode=block', // Enable XSS protection
          'Referrer-Policy': 'no-referrer', // Control referrer information
          'Cache-Control': 'no-store', // Prevent caching of sensitive data
        },
      })

      setFilteredDeliveryPeople(response.data)
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching delivery people:', error)
    }
  }
  useEffect(() => {
    fetchDeliveryPeople()
  }, [])

  const handleNameChange = (e) => {
    setFilters({ ...filters, name: e.target.value })
  }

  const handleEmailChange = (e) => {
    setFilters({ ...filters, email: e.target.value })
  }

  const handlePhoneChange = (e) => {
    setFilters({ ...filters, phone: e.target.value })
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Delivery People</strong>
          </CCardHeader>
          <CCardBody>
            <div className="table-responsive">
              <CTable hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                    <CTableHeaderCell scope="col">
                      <CInputGroup className="mb-3">
                        <CFormInput
                          placeholder="Search by Name"
                          aria-label="Name"
                          onChange={handleNameChange}
                        />
                      </CInputGroup>
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">
                      <CInputGroup className="mb-3">
                        <CFormInput
                          placeholder="Search by Email"
                          aria-label="Email"
                          onChange={handleEmailChange}
                        />
                      </CInputGroup>
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">
                      <CInputGroup className="mb-3">
                        <CFormInput
                          placeholder="Search by Phone"
                          aria-label="Phone"
                          onChange={handlePhoneChange}
                        />
                      </CInputGroup>
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Vehicle Type</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredDeliveryPeople?.map((deliveryPerson, index) => (
                    <CTableRow key={index}>
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell>{deliveryPerson.fullName}</CTableDataCell>
                      <CTableDataCell>{deliveryPerson.email}</CTableDataCell>
                      <CTableDataCell>{deliveryPerson.phoneNumber}</CTableDataCell>
                      <CTableDataCell>{deliveryPerson.vehicleType}</CTableDataCell>
                      <CTableDataCell>Actions...</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default DeliveryPeopleList
