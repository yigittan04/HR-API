import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
    const [employees, setEmployees] = useState([]);
    const [departments, setDepartments] = useState([]);

    const [editingId, setEditingId] = useState(null);
    const [editingDepId, setEditingDepId] = useState(null);

    const [empForm, setEmpForm] = useState({
        name: "",
        surname: "",
        email: "",
        salary: "",
        date_joined: "",
        department_id: "",
    });

    const [depForm, setDepForm] = useState({
        name: "",
        location: "",
    });

    const loadAll = async () => {
        const [empRes, depRes] = await Promise.all([
            api.get("/employees"),
            api.get("/departments"),
        ]);

        setEmployees(empRes.data);
        setDepartments(depRes.data);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;
        loadAll();
    }, []);

    const saveEmployee = async () => {
        try {
            const payload = {
                first_name: empForm.name,
                last_name: empForm.surname,
                email: empForm.email,
                salary: empForm.salary ? Number(empForm.salary) : null,
                department_id: empForm.department_id ? Number(empForm.department_id) : null,
                start_date: empForm.date_joined
                    ? `${empForm.date_joined}T00:00:00`
                    : null,
            };

            if (editingId) {
                await api.put(`/employees/${editingId}`, payload);
            } else {
                await api.post("/employees", payload);
            }

            setEditingId(null);
            setEmpForm({
                name: "",
                surname: "",
                email: "",
                salary: "",
                date_joined: "",
                department_id: "",
            });

            loadAll();
        } catch (err) {
            console.log(err.response?.data);
            alert("Employee create/update failed");
        }
    };

    const deleteEmployee = async (id) => {
        await api.delete(`/employees/${id}`);
        loadAll();
    };

    const saveDepartment = async () => {
        try {
            if (editingDepId) {
                await api.put(`/departments/${editingDepId}`, depForm);
            } else {
                await api.post("/departments", depForm);
            }

            setDepForm({ name: "", location: "" });
            setEditingDepId(null);
            loadAll();
        } catch (err) {
            console.log(err.response?.data);
        }
    };

    const deleteDepartment = async (id) => {
        await api.delete(`/departments/${id}`);
        loadAll();
    };

    return (
        <div style={{ display: "flex", gap: "30px", padding: "30px", fontFamily: "sans-serif" }}>

            {/*Employees*/}
            <div style={boxStyle}>
                <h2>Employees</h2>

                <input style={inputStyle} placeholder="Name"
                    value={empForm.name}
                    onChange={(e) => setEmpForm({ ...empForm, name: e.target.value })}
                />

                <input style={inputStyle} placeholder="Surname"
                    value={empForm.surname}
                    onChange={(e) => setEmpForm({ ...empForm, surname: e.target.value })}
                />

                <input style={inputStyle} placeholder="Email"
                    value={empForm.email}
                    onChange={(e) => setEmpForm({ ...empForm, email: e.target.value })}
                />

                <input style={inputStyle} type="number" placeholder="Salary"
                    value={empForm.salary}
                    onChange={(e) => setEmpForm({ ...empForm, salary: e.target.value })}
                />

                <input style={inputStyle} type="date"
                    value={empForm.date_joined}
                    onChange={(e) => setEmpForm({ ...empForm, date_joined: e.target.value })}
                />

                <select style={inputStyle}
                    value={empForm.department_id}
                    onChange={(e) =>
                        setEmpForm({ ...empForm, department_id: e.target.value })
                    }
                >
                    <option value="">Select Department</option>
                    {departments.map((d) => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                </select>

                <button style={buttonStyle} onClick={saveEmployee}>
                    {editingId ? "Update Employee" : "Add Employee"}
                </button>

                <hr />

                <div style={listStyle}>
                    {employees.map((e) => (
                        <div key={e.id} style={itemStyle}>
                            {e.first_name} {e.last_name} | ${e.salary}

                            <button
                                style={smallBtn}
                                onClick={() => {
                                    setEmpForm({
                                        name: e.first_name,
                                        surname: e.last_name,
                                        email: e.email,
                                        salary: e.salary,
                                        date_joined: e.start_date?.split("T")[0] || "",
                                        department_id: e.department_id,
                                    });
                                    setEditingId(e.id);
                                }}
                            >
                                Edit
                            </button>

                            <button
                                style={deleteBtn}
                                onClick={() => deleteEmployee(e.id)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/*Departments*/}
            <div style={boxStyle}>
                <h2>Departments</h2>

                <input style={inputStyle}
                    placeholder="Name"
                    value={depForm.name}
                    onChange={(e) => setDepForm({ ...depForm, name: e.target.value })}
                />

                <input style={inputStyle}
                    placeholder="Location"
                    value={depForm.location}
                    onChange={(e) => setDepForm({ ...depForm, location: e.target.value })}
                />

                <button style={buttonStyle} onClick={saveDepartment}>
                    {editingDepId ? "Update Department" : "Add Department"}
                </button>

                <hr />

                <div style={listStyle}>
                    {departments.map((d) => (
                        <div key={d.id} style={itemStyle}>
                            {d.name} - {d.location}

                            <button
                                style={smallBtn}
                                onClick={() => {
                                    setDepForm({
                                        name: d.name,
                                        location: d.location,
                                    });
                                    setEditingDepId(d.id);
                                }}
                            >
                                Edit
                            </button>

                            <button
                                style={deleteBtn}
                                onClick={() => deleteDepartment(d.id)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const boxStyle = {
    flex: 1,
    background: "#1d8991",
    padding: "20px",
    borderRadius: "10px",
    color: "white",
};

const inputStyle = {
    display: "block",
    marginBottom: "10px",
    padding: "8px",
    width: "100%",
    borderRadius: "6px",
    border: "none",
};

const buttonStyle = {
    padding: "8px 12px",
    borderRadius: "6px",
    border: "none",
    background: "#4CAF50",
    color: "white",
    cursor: "pointer",
};

const deleteBtn = {
    marginLeft: "10px",
    background: "#e74c3c",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "4px 8px",
    cursor: "pointer",
};

const smallBtn = {
    marginLeft: "10px",
    background: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "4px 8px",
    cursor: "pointer",
};

const listStyle = {
    maxHeight: "300px",
    overflowY: "auto",
    marginTop: "10px",
};

const itemStyle = {
    marginBottom: "10px",
};

export default Dashboard;