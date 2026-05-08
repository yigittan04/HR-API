# React + Vite Update

## New Endpoint Parametres
| Parameter       | Type     Description |
|-----------------|---------|------------|
| page            | int     | Page number |
| pageSize        | int     | Number of records per page |
| search          | string  | Searches by employee name |
| department_id   | int     | Filters employees by specific department |

## Technical Details
This endpoint supports server-side pagination, searching, and filtering.

- Pagination is handled using `page` and `pageSize` parameters.
- Search function uses SQL `LIKE` query on employee fields.
- Department filtering is applied using `department_id`.
- All filters are combined dynamically in the backend query.
- The response includes:
  - `data`: list of employees
  - `total`: total number of matching records (used for pagination below)