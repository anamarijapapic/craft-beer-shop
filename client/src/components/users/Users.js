import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import { BsFloppyFill, BsPencilSquare, BsTrash } from 'react-icons/bs';
import { useAuth } from '../../context/AuthContext';
import useGetUsers from '../../hooks/users/useGetUsers';
import usePutUser from '../../hooks/users/usePutUser';
import useDeleteUser from '../../hooks/users/useDeleteUser';

const Users = () => {
  const { user } = useAuth();
  const { users, loading, getError, refetchUsers } = useGetUsers();
  const { putUser, putError } = usePutUser();
  const { deleteUser, deleteError } = useDeleteUser();
  const [editUser, setEditUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    if (putError) {
      console.error('Put Error:', putError);
    }
  }, [putError]);

  useEffect(() => {
    if (deleteError) {
      console.error('Delete Error:', deleteError);
    }
  }, [deleteError]);

  const handleEdit = (userData) => {
    setEditUser(userData);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setEditUser(null);
    setShowEditModal(false);
  };

  const handleUpdateUser = async () => {
    await putUser(editUser._id, editUser);
    refetchUsers();
    handleCloseEditModal();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(id, refetchUsers);
    }
  };

  if (!user || !user.isAdmin) {
    return (
      <Container className="mt-5">
        <h1>Only admin access allowed</h1>
      </Container>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (getError) {
    return <div>Error: {getError.message}</div>;
  }

  return (
    <Container className="mt-5">
      <h1>Users</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Email</th>
            <th>Admin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.email}</td>
              <td>{u.isAdmin.toString()}</td>
              <td>
                <Button
                  variant="light"
                  className="text-warning"
                  onClick={() => handleEdit(u)}
                >
                  <BsPencilSquare />
                </Button>
                {user.email !== u.email && (
                  <Button
                    variant="light"
                    className="text-danger"
                    onClick={() => handleDelete(u._id)}
                  >
                    <BsTrash />
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editUser && (
            <>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={editUser.email}
                  onChange={(e) =>
                    setEditUser({ ...editUser, email: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="isAdmin">
                <Form.Check
                  type="checkbox"
                  label="Admin"
                  checked={editUser.isAdmin}
                  onChange={(e) =>
                    setEditUser({ ...editUser, isAdmin: e.target.checked })
                  }
                />
              </Form.Group>
            </>
          )}

          {putError && <p className="text-danger">{putError}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Close
          </Button>
          <Button variant="warning" onClick={handleUpdateUser}>
            <BsFloppyFill /> Update
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Users;
