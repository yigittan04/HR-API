import { useEffect, useState, useCallback } from "react";
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/employeeService";
import { getDepartments } from "../services/departmentService";

function EmployeeTable() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    salary: "",
    department_id: "",
    start_date: "",
  });

  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [total, setTotal] = useState(0);

  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");

  const fetchEmployees = useCallback(async () => {
    const res = await getEmployees({
      page,
      pageSize,
      search,
      department_id: departmentFilter || undefined,
    });

    setEmployees(res.data.data || []);
    setTotal(res.data.total || 0);
  }, [page, pageSize, search, departmentFilter]);

  const loadDepartments = async () => {
    const res = await getDepartments();
    setDepartments(res.data.data || []);
  };

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  useEffect(() => {
    loadDepartments();
  }, []);

  const resetForm = () => {
    setForm({
      first_name: "",
      last_name: "",
      email: "",
      salary: "",
      department_id: "",
      start_date: "",
    });
    setEditingId(null);
  };

  const handleSave = async () => {
    const payload = {
      ...form,
      salary: Number(form.salary),
      department_id: Number(form.department_id),
      start_date: form.start_date,
    };

    if (editingId) {
      await updateEmployee(editingId, payload);
    } else {
      await createEmployee(payload);
    }

    resetForm();
    fetchEmployees();
  };

  const handleEdit = (emp) => {
    setForm({
      first_name: emp.first_name || "",
      last_name: emp.last_name || "",
      email: emp.email || "",
      salary: emp.salary || "",
      department_id: emp.department_id || "",
      start_date: emp.start_date || "",
    });

    setEditingId(emp.id);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this employee?")) return;
    await deleteEmployee(id);
    fetchEmployees();
  };

  return (
    <div className="page">
      <h2>Employees</h2>

      <div className="card">
        <input
          placeholder="Search employee..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />

        <select
          value={departmentFilter}
          onChange={(e) => {
            setPage(1);
            setDepartmentFilter(e.target.value);
          }}
        >
          <option value="">All Departments</option>
          {departments.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
      </div>

      <div className="card">
        <input
          placeholder="First Name"
          value={form.first_name}
          onChange={(e) =>
            setForm({ ...form, first_name: e.target.value })
          }
        />

        <input
          placeholder="Last Name"
          value={form.last_name}
          onChange={(e) =>
            setForm({ ...form, last_name: e.target.value })
          }
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          placeholder="Salary"
          type="number"
          value={form.salary}
          onChange={(e) =>
            setForm({ ...form, salary: e.target.value })
          }
        />

        <input
          type="date"
          value={form.start_date}
          onChange={(e) =>
            setForm({ ...form, start_date: e.target.value })
          }
        />

        <select
          value={form.department_id}
          onChange={(e) =>
            setForm({ ...form, department_id: e.target.value })
          }
        >
          <option value="">Select Department</option>
          {departments.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        <button onClick={handleSave} className="primary-btn">
          {editingId ? "Update" : "Add"}
        </button>

        {editingId && (
          <button onClick={resetForm} className="secondary-btn">
            Cancel
          </button>
        )}
      </div>

      <div className="card">
        {employees.length === 0 ? (
          <p>No employees found.</p>
        ) : (
          employees.map((e) => (
            <div key={e.id} className="list-row">
              <div>
                <b>
                  {e.first_name} {e.last_name}
                </b>
                <div>{e.email}</div>
              </div>

              <div>${e.salary}</div>

              <div className="actions">
                <button className="edit-btn" onClick={() => handleEdit(e)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(e.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="pagination">
        <button
          className="primary-btn"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Previous
        </button>

        <span>
          Page {page}
        </span>

        <button
          className="primary-btn"
          disabled={page * pageSize >= total}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default EmployeeTable;