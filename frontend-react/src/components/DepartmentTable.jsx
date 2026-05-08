import { useEffect, useState } from "react";

import {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../services/departmentService";

function DepartmentTable() {
  const [departments, setDepartments] = useState([]);

  const [form, setForm] = useState({
    name: "",
    location: "",
  });

  const [editingId, setEditingId] = useState(null);

  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const fetchDepartments = async () => {
    const res = await getDepartments({
      page,
      pageSize,
    });

    setDepartments(res.data.data || []);
    setTotal(res.data.total || 0);
  };

  useEffect(() => {
    fetchDepartments();
  }, [page]);

  const resetForm = () => {
    setForm({
      name: "",
      location: "",
    });

    setEditingId(null);
  };

  const handleSave = async () => {
    if (editingId) {
      await updateDepartment(editingId, form);
    } else {
      await createDepartment(form);
    }

    resetForm();
    fetchDepartments();
  };

  const handleEdit = (dep) => {
    setForm(dep);
    setEditingId(dep.id);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete department?")) return;

    await deleteDepartment(id);

    fetchDepartments();
  };

  return (
    <div className="page">
      <div className="container">
        <h1 className="title">Departments</h1>

        <div className="card">
          <div className="form-grid">
            <input
              placeholder="Department Name"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />

            <input
              placeholder="Location"
              value={form.location}
              onChange={(e) =>
                setForm({
                  ...form,
                  location: e.target.value,
                })
              }
            />
          </div>

          <div
            style={{
              marginTop: 16,
              display: "flex",
              gap: 10,
            }}
          >
            <button
              className="primary-btn"
              onClick={handleSave}
            >
              {editingId ? "Update" : "Add"}
            </button>

            {editingId && (
              <button
                className="secondary-btn"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {departments.map((dep) => (
                <tr key={dep.id}>
                  <td>{dep.name}</td>

                  <td>{dep.location}</td>

                  <td>
                    <div className="actions">
                      <button
                        className="edit-btn"
                        onClick={() =>
                          handleEdit(dep)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(dep.id)
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button
              className="primary-btn"
              disabled={page === 1}
              onClick={() =>
                setPage((p) => p - 1)
              }
            >
              Previous
            </button>

            <span>
              Page <b>{page}</b>
            </span>

            <button
              className="primary-btn"
              disabled={page * pageSize >= total}
              onClick={() =>
                setPage((p) => p + 1)
              }
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DepartmentTable;