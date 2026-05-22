# Tech Stack

Backend: FastAPI  
Database: PostgreSQL  
ORM: SQLAlchemy  
Frontend: HTML, CSS, JavaScript  
Containerization: Docker  
Testing: Pytest, HTTPX

---

# Features

- JWT-based authentication
- Access control according to roles (admin, user)
- Department management (create, update, delete, view)
- Employee management (create, update, delete, view)
- Search and filtering (employees & departments)
- Pagination support
- Real-time UI updates
- RESTful API architecture

---

# How to Run the HR API (English)

Docker must be installed before running the project.
Use the following commands:

> sudo apt update
> sudo apt install -y docker.io docker-compose
> sudo systemctl enable --now docker

Run this command in the project folder:
> docker compose up --build

After opening the UI at http://localhost:5173, you can use the following features:

Admins are able to add, update and delete department/employee information.
Users are able to view information.

- Department Management
    - The admin can change the name and location of the department.
    - The user can view departments page by page.

- Employee Management
    - Admin is able to change the name, surname, salary, email, start date and the department the employee works in.
    - Dropdown menu is available for the department selection.
    - Start date can be selected from the calendar.
    - Both admins and users can see employee information and search by their name, surname or email addresses.

All changes are automatically saved to the database, and the UI updates in real-time.

Use the following command to stop the project:
> docker compose down

---

# Project Structure

```
hr_api
├── docker-compose.yml
├── Dockerfile
├── README.md
├── replacements.txt
├── requirements.txt
├── app
│   ├── config.py
│   ├── database.py
│   ├── dependencies.py
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   ├── auth_utils.py
│   ├── repositories
│   │   ├── users.py
│   │   ├── base_repository.py
│   │   ├── department_repository.py
│   │   └── employee_repository.py
│   ├── routers
│   │   ├── departments.py
│   │   ├── auth.py
│   │   └── employees.py
│   └── services
│       ├── auth.py
│       ├── department_service.py
│       └── employee_service.py
├── frontend
│   ├── Dockerfile
│   ├── app.js
│   ├── favicon.png
│   ├── login.html
│   ├── index.html
│   └── style.css
├── frontend-react
│   ├── README.md
│   ├── index.html
│   └── src
│       ├── App.css
│       ├── App.jsx
│       ├── main.jsx
│       ├── index.css
│       ├── components
│       │   ├── DepartmentTable.jsx
│       │   ├── EmployeeTable.jsx
│       │   └── Pagination.jsx
│       ├── pages
│       │   ├── Dashboard.jsx
│       │   └── Login.jsx
│       └── services
│           ├── api.js
│           ├── departmentService.js
│           └── employeeService.js
└── tests
    ├── test_departments.py
    ├── test_employees.py
    └── conftest.py
```

---

# System Structure

The backend follows a layered architecture to separate responsibilities and keep the code maintainable and scalable.
The system uses JWT (JSON Web Token) authentication.
If credentials are correct:
   - A JWT token is generated
   - The user role (admin/user) is stored
   - You are redirected to the dashboard

```
Client (Frontend)
        │
        ▼
Routers (API Layer)
        │
        ▼
Services (Business Logic)
        │
        ▼
Repositories (Database Access)
        │
        ▼
Database (PostgreSQL)
```

---

# Unit Testing

Pytest is used for unit testing.
Each test uses a fresh database session to ensure isolation.
Tests cover creating, updating, and deleting departments and employees, verifying that the API and database logic works as intended.

To run the tests, use the following commands:

> docker exec -it hr_api bash
> python3 -m pytest -v

---

## Routers

Routers define the HTTP endpoints.
They receive requests from the frontend, validate input using schemas, and call the appropriate service functions.

---

## Services

Services contain the core business logic of the application.
They process data and coordinate operations between routers and repositories.

---

## Repositories

Repositories are responsible for interacting with the database using SQLAlchemy.

---

## Schemas

Schemas define Pydantic models used for operations.

---

## Models

Models represent the database tables.

---

## Dependencies

Dependencies handle API key verification and database session injection.

---

## Database Configuration

Database configuration handles database connection, SQLAlchemy session creation and environment configuration.

---

## A Request Example Flow

1. Frontend sends POST /employees
2. employees.py router receives the request
3. Router calls employee_service.create_employee()
4. Service processes the logic and calls the repository
5. Repository inserts the employee into PostgreSQL
6. Response is returned to the client

---

# HR API Nasıl Çalıştırılır (Türkçe)

Projeyi çalıştırmadan önce Docker'ın yüklü olması gerekmektedir.
Docker'ı yüklemek için aşağıdaki komutları kullanabilirsiniz:

> sudo apt update
> sudo apt install -y docker.io docker-compose
> sudo systemctl enable --now docker

Proje klasörünün içinde aşağıdaki komutu çalıştırın:
> docker compose up --build

Arayüzü http://localhost:5173 adresinde açtıktan sonra aşağıdaki özellikleri kullanabilirsiniz:

Admin sistemde departman ve çalışan bilgilerini ekleyebilir, güncelleyebilir ve silebilir.
Kullanıcılar varolan bilgileri inceleyebilir.

- Departman Yönetimi
    - Admin departmanın adını ve konumunu değiştirebilir.
    - Kullanıcı sayfalara göre departmanları inceleyebilir.

- Çalışan Yönetimi
    - Admin çalışanın adını, soyadını, maaşını, e-postasını, işe başlama tarihini ve çalıştığı departmanı değiştirebilir.
    - Kullanıcı açılır menüden (dropdown) bir departman seçebilir.
    - Kullanıcı takvimden bir işe başlama tarihi seçebilir.
    - Hem admin hem kullanıcı çalışan bilgilerini görüp ad, soyad veya email adresine göre arama yapabilir.

Yapılan tüm değişiklikler otomatik olarak veritabanına kaydedilir ve arayüz gerçek zamanlı olarak güncellenir.

Projeyi durdurmak için aşağıdaki komutu kullanabilirsiniz:
> docker compose down

---

# Proje Mimarisi

```
hr_api
├── docker-compose.yml
├── Dockerfile
├── README.md
├── replacements.txt
├── requirements.txt
├── app
│   ├── config.py
│   ├── database.py
│   ├── dependencies.py
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   ├── auth_utils.py
│   ├── repositories
│   │   ├── users.py
│   │   ├── base_repository.py
│   │   ├── department_repository.py
│   │   └── employee_repository.py
│   ├── routers
│   │   ├── departments.py
│   │   ├── auth.py
│   │   └── employees.py
│   └── services
│       ├── auth.py
│       ├── department_service.py
│       └── employee_service.py
├── frontend
│   ├── Dockerfile
│   ├── app.js
│   ├── favicon.png
│   ├── login.html
│   ├── index.html
│   └── style.css
├── frontend-react
│   ├── README.md
│   ├── index.html
│   └── src
│       ├── App.css
│       ├── App.jsx
│       ├── main.jsx
│       ├── index.css
│       ├── components
│       │   ├── DepartmentTable.jsx
│       │   ├── EmployeeTable.jsx
│       │   └── Pagination.jsx
│       ├── pages
│       │   ├── Dashboard.jsx
│       │   └── Login.jsx
│       └── services
│           ├── api.js
│           ├── departmentService.js
│           └── employeeService.js
└── tests
    ├── test_departments.py
    ├── test_employees.py
    └── conftest.py
```

---

# Sistem Mimarisi

```
Client (Frontend)
        │
        ▼
Routers (API Layer)
        │
        ▼
Services (Business Logic)
        │
        ▼
Repositories (Database Access)
        │
        ▼
Database (PostgreSQL)
```

---

# Birim Test

Projede birim test için Pytest kullanılır.
Her test, izole bir ortam sağlamak için yeni bir veritabanı oturumu kullanır.
Testler, departman ve çalışan ekleme, güncelleme ve silme eylemlerini kapsar ve API ile veritabanı mantığını doğrular.

Testleri çalıştırmak için aşağıdaki komutları kullanın:

> docker exec -it hr_api bash
> python3 -m pytest -v

---

## Router'lar

Router'lar HTTP endpointlerini tanımlar.
Frontend'den gelen istekleri alır, schema'lar kullanarak input'ları doğrular ve uygun service fonksiyonlarını çağırır.

---

## Servisler

Servisler uygulamanın temel iş mantığını içerir.
Verileri işler ve router ile repository katmanları arasındaki işlemleri koordine eder.

---

## Repository'ler

Repository'ler SQLAlchemy kullanarak veritabanı ile etkileşim kurmaktan sorumludur.

---

## Schema'lar

Schema'lar işlemler için kullanılan Pydantic modellerini tanımlar.

---

## Modeller

Modeller veritabanı tablolarını temsil eder.

---

## Bağımlılıklar

Dependencies API anahtarı doğrulamasını ve veritabanı oturumu enjeksiyonunu yönetir.

---

## Veritabanı Yapılandırması

Veritabanı yapılandırması veritabanı bağlantısını, SQLAlchemy oturumu oluşturmayı ve ortam yapılandırmasını yönetir.

---

## Kullanım Örneği

1. Frontend POST /employees isteği gönderir
2. employees.py router isteği alır
3. Router employee_service.create_employee() fonksiyonunu çağırır
4. Service iş mantığını işler ve repository katmanını çağırır
5. Repository çalışanı PostgreSQL veritabanına ekler
6. Yanıt istemciye döndürülür

---
