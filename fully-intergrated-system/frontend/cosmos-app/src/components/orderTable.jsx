import React, { useState } from "react";
import { getCustomerById, updateOrderStatus } from "../services/order-service";

function OrderTable({ orders, fetchData }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [editedStatus, setEditedStatus] = useState("");

  const handleEditClick = (item) => {
    setSelectedOrder(item);
    console.log(item);
    setEditedStatus(item.status);
    setShowEditModal(true);
  };

  const handleViewCustomerClick = async (customerId) => {
    try {
      const response = await getCustomerById(customerId);
      setSelectedCustomer(response.data);
      setShowCustomerModal(true);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(error.response.data.message);
      } else {
        alert("An unknown error occurred.");
      }
    }
  };

  const handleSavedChanges = async (orderId) => {
    console.log(orderId);
    setShowEditModal(false);

    try {
      await updateOrderStatus(orderId, { status: editedStatus });
      fetchData();
      alert("Successfully changed order status");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(error.response.data.message);
      } else {
        alert("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="mt-4">
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Customer ID</th>
            <th>Status</th>
            <th>Order Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.customerId}</td>
                <td>{item.status}</td>
                <td>{item.createdAt.split("T")[0]}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEditClick(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleViewCustomerClick(item.customerId)}
                  >
                    Customer
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {showEditModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Order</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowEditModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <label className="form-label">Status</label>
                <select
                  className="form-control"
                  value={editedStatus}
                  onChange={(e) => setEditedStatus(e.target.value)}
                >
                  <option value="" disabled>
                    Select Status
                  </option>
                  <option value="PENDING">Pending</option>
                  <option value="CONFIRM">Confirm</option>
                  <option value="SHIPPED">Shipped</option>
                  <option value="DELIVERED">Delivered</option>
                  <option value="CANCELED">Cancelled</option>
                </select>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditedStatus(null);
                  }}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleSavedChanges(selectedOrder.id)}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCustomerModal && selectedCustomer && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Customer Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowCustomerModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>ID:</strong> {selectedCustomer.id}
                </p>
                <p>
                  <strong>Name:</strong> {selectedCustomer.name}
                </p>
                <p>
                  <strong>Email:</strong> {selectedCustomer.email}
                </p>
                <p>
                  <strong>Address:</strong> {selectedCustomer.address}
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowCustomerModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {(showEditModal || showCustomerModal) && (
        <div className="modal-backdrop show"></div>
      )}
    </div>
  );
}

export default OrderTable;
