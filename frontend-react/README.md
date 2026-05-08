# React + Vite Update

## New Endpoint Parametres and Technical Details
This endpoint supports server-side pagination, searching, and filtering.

- Pagination is handled using `page` and `pageSize` parameters.
- Search function uses SQL `LIKE` query on employee fields.
- Department filtering is applied using `department_id`.
- All filters are combined dynamically in the backend query.
- The response includes:
  - `data`: list of employees
  - `total`: total number of matching records (used for pagination below)