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

const DeliveriesList = () => {
  const [filteredDeliveries, setFilteredDeliveries] = useState([])
  const [filters, setFilters] = useState({
    items: '',
    deliveryPerson: '',
    fromPharmacy: '',
    status: '',
  })

  useEffect(() => {
    // Function to fetch deliveries
    const fetchDeliveries = async () => {
      try {
        const response = await axios.get(`${baseUrl}/deliveries`)
        setFilteredDeliveries(response.data)
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching deliveries:', error)
        // Handle error states if needed
      }
    }

    // Call the function to fetch deliveries
    fetchDeliveries()
  }, []) // Run this effect only once (on component mount)

  // Update filters for Items input change
  const handleItemsChange = (e) => {
    setFilters({ ...filters, items: e.target.value })
  }

  // Update filters for Delivery Person input change
  const handleDeliveryPersonChange = (e) => {
    setFilters({ ...filters, deliveryPerson: e.target.value })
  }

  // Update filters for From Pharmacy input change
  const handleFromPharmacyChange = (e) => {
    setFilters({ ...filters, fromPharmacy: e.target.value })
  }

  // Update filters for Status input change
  const handleStatusChange = (e) => {
    setFilters({ ...filters, status: e.target.value })
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Deliveries List</strong>
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
                          placeholder="search by Items"
                          aria-label="Items"
                          onChange={handleItemsChange}
                        />
                      </CInputGroup>
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">
                      <CInputGroup className="mb-3">
                        <CFormInput
                          placeholder="search by Delivery Person"
                          aria-label="Delivery Person"
                          onChange={handleDeliveryPersonChange}
                        />
                      </CInputGroup>
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">
                      <CInputGroup className="mb-3">
                        <CFormInput
                          placeholder="search by From Pharmacy"
                          aria-label="From Pharmacy"
                          onChange={handleFromPharmacyChange}
                        />
                      </CInputGroup>
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                    <CTableHeaderCell scope="col">
                      <CInputGroup className="mb-3">
                        <CFormInput
                          placeholder="search by Status"
                          aria-label="Status"
                          onChange={handleStatusChange}
                        />
                      </CInputGroup>
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Items</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Delivery Person</CTableHeaderCell>
                    <CTableHeaderCell scope="col">From Pharmacy</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Requested By</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>

                    <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredDeliveries?.map((delivery, index) => (
                    <CTableRow key={index}>
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell>{delivery.items.join(', ')}</CTableDataCell>
                      <CTableDataCell>{delivery.deliveryPerson?.fullName}</CTableDataCell>
                      <CTableDataCell>{delivery.fromPharmacy?.name}</CTableDataCell>
                      <CTableDataCell>{delivery.requestedBy?.fullName}</CTableDataCell>
                      <CTableDataCell>{delivery.status}</CTableDataCell>
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

export default DeliveriesList
