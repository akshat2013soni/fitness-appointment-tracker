import React, { useState } from "react";
import "./Home.css";
import EditB from "../assets/edit.png";
import DeleteB from "../assets/delete.png";

const clientsinfo = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    location: "New York",
    appointments: ["2023-11-06 10:00 AM", "2023-11-10 3:30 PM"],
  },
  {
    id: 2,
    firstName: "Alice",
    lastName: "Smith",
    location: "Los Angeles",
    appointments: ["2023-11-12 2:00 PM", "2023-11-15 4:15 PM"],
  },
  {
    id: 3,
    firstName: "Bob",
    lastName: "Johnson",
    location: "Chicago",
    appointments: ["2023-11-08 11:30 AM", "2023-11-18 1:45 PM"],
  },
  {
    id: 4,
    firstName: "Emily",
    lastName: "Wilson",
    location: "San Francisco",
    appointments: ["2023-11-07 3:00 PM", "2023-11-17 10:45 AM"],
  },
];

const Home = () => {
  const [clients, setClients] = useState(clientsinfo);
  const [selectedClient, setSelectedClient] = useState(null);
  const [editingClient, setEditingClient] = useState(null);
  const [editedInfo, setEditedInfo] = useState({});
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [newAppointmentDate, setNewAppointmentDate] = useState(null);
  const [isDateTimePickerOpen, setIsDateTimePickerOpen] = useState(false);
  const [editAppointmentIndex, setEditAppointmentIndex] = useState(null);
  const [newClientInfo, setNewClientInfo] = useState({
    id: "",
    firstName: "",
    lastName: "",
    location: "",
    appointments: [],
  });
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
  const handleOpenAppointmentsModal = (client) => {
    setSelectedClient(client);
  };

  const handleOpenEditModal = (client) => {
    setEditingClient(client);
    setEditedInfo({
      firstName: client.firstName,
      lastName: client.lastName,
      location: client.location,
    });
  };

  const handleRemoveClient = (clientId) => {
    setClients((prevClients) =>
      prevClients.filter((client) => client.id !== clientId)
    );
  };

  const handleEditSubmit = () => {
    setClients((prevClients) => {
      return prevClients.map((client) =>
        client.id === editingClient.id ? { ...client, ...editedInfo } : client
      );
    });
    setEditingClient(null);
  };

  const handleRemoveAppointment = (appointmentId) => {
    setSelectedClient((prevSelectedClient) => ({
      ...prevSelectedClient,
      appointments: prevSelectedClient.appointments.filter(
        (appointment) => appointment !== appointmentId
      ),
    }));
  };

  const openDateTimePicker = () => {
    setIsDateTimePickerOpen(true);
  };

  const confirmDelete = (deleteAction, item) => {
    const confirmation = window.confirm("Are you sure to delete?");

    if (confirmation) {
      deleteAction(item); // Perform the delete action if confirmed
    }
  };

  const formatDateTime = (isoDateTime) => {
    const date = new Date(isoDateTime);
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
    };
    return date.toLocaleString("en-US", options);
  };

  const addAppointment = () => {
    if (newAppointmentDate) {
      if (editAppointmentIndex !== null) {
        // If editAppointmentIndex is not null, it means we are editing an existing appointment
        selectedClient.appointments[editAppointmentIndex] = newAppointmentDate;
        setEditAppointmentIndex(null); // Reset the edit index
      } else {
        // If editAppointmentIndex is null, it means we are adding a new appointment
        setSelectedClient((prevSelectedClient) => ({
          ...prevSelectedClient,
          appointments: [
            ...prevSelectedClient.appointments,
            newAppointmentDate,
          ],
        }));
      }
      setIsDateTimePickerOpen(false);
      setNewAppointmentDate("");
    }
  };

  const handleEditAppointment = (appointment, index) => {
    setNewAppointmentDate(appointment); // Pre-fill the date-time picker with the appointment's date and time
    setEditAppointmentIndex(index); // Remember the index of the appointment being edited
    setIsDateTimePickerOpen(true); // Open the date-time picker modal
  };

  const openAddClientModal = () => {
    setIsAddClientModalOpen(true);
  };

  const addNewClient = () => {
    if (
      newClientInfo.id &&
      newClientInfo.firstName &&
      newClientInfo.lastName &&
      newClientInfo.location
    ) {
      setClients((prevClients) => [...prevClients, newClientInfo]);
      setNewClientInfo({
        id: "",
        firstName: "",
        lastName: "",
        location: "",
        appointments: [],
      });
      setIsAddClientModalOpen(false);
      alert("Client added successfully!");
    } else {
      alert("Please fill in all required fields."); // Use the default JavaScript alert for error message
    }
  };

  const closeModal = () => {
    setSelectedClient(null);
    setEditingClient(null);
    setSelectedAppointment(null);
  };
  return (
    <div className="home">
      <h1>My Fit Buddies</h1>

      <div className="client-grid">
        {clients.map((client) => (
          <div key={client.id} className="client-card">
            <div className="client-info">
              <p>Client ID: {client.id}</p>
              <strong>
                Name: {client.firstName} {client.lastName}
              </strong>
              <p>Location: {client.location}</p>
            </div>
            <button
              className="appointments-button"
              onClick={() => handleOpenAppointmentsModal(client)}
            >
              Appointments
            </button>
            <button
              className="edit-info-button"
              onClick={() => handleOpenEditModal(client)}
            >
              <img src={EditB} alt="Edit" />
            </button>
            <button
              className="remove-client-button"
              onClick={() => confirmDelete(handleRemoveClient, client.id)}
            >
              <img src={DeleteB} alt="Remove Client" />
            </button>
          </div>
        ))}
      </div>

      <button className="add-client-button" onClick={openAddClientModal}>
        Add New Client
      </button>

      {isAddClientModalOpen && (
        <div className="modal-container">
          <div className="modal add-client-modal">
            <h2>Add New Client</h2>
            <form>
              <div className="form-group">
                <label>Client ID:</label>
                <input
                  type="number"
                  value={newClientInfo.id}
                  onChange={(e) =>
                    setNewClientInfo({ ...newClientInfo, id: e.target.value })
                  }
                  required={true}
                />
              </div>
              <div className="form-group">
                <label>First Name:</label>
                <input
                  type="text"
                  value={newClientInfo.firstName}
                  onChange={(e) =>
                    setNewClientInfo({
                      ...newClientInfo,
                      firstName: e.target.value,
                    })
                  }
                  required={true}
                />
              </div>
              <div className="form-group">
                <label>Last Name:</label>
                <input
                  type="text"
                  value={newClientInfo.lastName}
                  onChange={(e) =>
                    setNewClientInfo({
                      ...newClientInfo,
                      lastName: e.target.value,
                    })
                  }
                  required={true}
                />
              </div>
              <div className="form-group">
                <label>Location:</label>
                <input
                  type="text"
                  value={newClientInfo.location}
                  onChange={(e) =>
                    setNewClientInfo({
                      ...newClientInfo,
                      location: e.target.value,
                    })
                  }
                  required={true}
                />
              </div>
              <button onClick={addNewClient}>Add</button>
              <button onClick={() => setIsAddClientModalOpen(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {selectedClient && (
        <div className="modal-container">
          <div className="modal">
            <h2>
              Appointments for {selectedClient.firstName}{" "}
              {selectedClient.lastName}
            </h2>
            <table>
              <thead>
                <tr>
                  <th>Appointment ID</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {selectedClient.appointments.map((appointment, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{formatDateTime(appointment)}</td>
                    <td>
                      <button
                        className="edit-appointment-button"
                        onClick={() =>
                          handleEditAppointment(appointment, index)
                        }
                      >
                        <img src={EditB} alt="Edit" />
                      </button>
                      <button
                        className="delete-appointment-button"
                        onClick={() =>
                          confirmDelete(handleRemoveAppointment, appointment)
                        }
                      >
                        <img src={DeleteB} alt="Remove Client" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={openDateTimePicker}>Add Appointment</button>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}

      {isDateTimePickerOpen && (
        <div className="modal-container">
          <div className="modal datetime-picker-modal">
            <h2>Select Appointment Date and Time</h2>
            <input
              type="datetime-local"
              value={newAppointmentDate}
              onChange={(e) => setNewAppointmentDate(e.target.value)}
            />
            <button onClick={addAppointment}>Add</button>
            <button onClick={() => setIsDateTimePickerOpen(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
      {editingClient && (
        <div className="modal-container">
          <div className="modal edit-modal">
            <h2>
              Edit Info for {editingClient.firstName} {editingClient.lastName}
            </h2>
            <form onSubmit={handleEditSubmit}>
              <div className="form-group">
                <label>First Name:</label>
                <input
                  type="text"
                  value={editedInfo.firstName}
                  onChange={(e) =>
                    setEditedInfo({ ...editedInfo, firstName: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Last Name:</label>
                <input
                  type="text"
                  value={editedInfo.lastName}
                  onChange={(e) =>
                    setEditedInfo({ ...editedInfo, lastName: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Location:</label>
                <input
                  type="text"
                  value={editedInfo.location}
                  onChange={(e) =>
                    setEditedInfo({ ...editedInfo, location: e.target.value })
                  }
                />
              </div>
              <button type="submit">Save</button>
            </form>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Home;
