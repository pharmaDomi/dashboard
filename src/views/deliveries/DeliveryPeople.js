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

const DeliveryPeopleList = () => {
  const [deliveryPeople, setDeliveryPeople] = useState([])
  const [filteredDeliveryPeople, setFilteredDeliveryPeople] = useState([])
  const [filters, setFilters] = useState({
    name: '',
    email: '',
    phone: '',
  })

  useEffect(() => {
    const fetchDeliveryPeople = async () => {
      try {
        const response = await axios.get('http://localhost:3117/deliveries/deliveryPeople')
        setDeliveryPeople(response.data.deliveryPeople)
        setFilteredDeliveryPeople(response.data.deliveryPeople)
      } catch (error) {
        console.error('Error fetching delivery people:', error)
      }
    }

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

  useEffect(() => {
    filterAndSearch()
  }, [filters])

  const filterAndSearch = () => {
    let filteredData = [...deliveryPeople]

    filteredData = filteredData.filter(
      (deliveryPerson) =>
        deliveryPerson.fullName.toLowerCase().includes(filters.name.toLowerCase()) &&
        deliveryPerson.email.toLowerCase().includes(filters.email.toLowerCase()) &&
        deliveryPerson.phoneNumber?.includes(filters.phone),
    )

    setFilteredDeliveryPeople(filteredData)
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
