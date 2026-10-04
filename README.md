# Rota Generator 
Welcome to my rota generator. 

## What problem is this solving?
The Rota Generator is a web application designed to help organisations create monthly rotas using configurable availability, eligibility, coverage, location and fairness rules.

Creating rotas manually is time consuming and can lead to double bookings, coverage shortages and uneven distribution of duties. This project aims to solve a real world problem that many organisations face.

## Project status 
The project has moved from design into early backend development. The project brief, user stories, database schema and initial Express API are in place.

## Backend progress

The rota, staff, activity and location APIs are connected to the MySQL database. Their route groups are mounted at `/api/rota`, `/api/staff`, `/api/activities`, and `/api/locations`.

The following API endpoints have been implemented and manually tested in Postman:

| Method | Endpoint | Purpose | Test result |
| --- | --- | --- | --- |
| `GET` | `/api/rota` | Get all rotas | Returned `200 OK` |
| `GET` | `/api/rota/:id` | Get one rota by ID | Returned the requested rota |
| `POST` | `/api/rota` | Create a rota | Used to create test rota data |
| `PUT` | `/api/rota/:id` | Update rota team and dates | Returned `200 OK`; changes confirmed with a `GET` request |
| `DELETE` | `/api/rota/:id` | Delete a rota | Returned `204 No Content`; deletion confirmed with a later `GET` request |
| `GET` | `/api/rota/:rotaId/assignments` | Get all assignments for one rota | Returned the rota's assignment records |
| `POST` | `/api/rota/:rotaId/assignments` | Create a rota assignment | Returned `201 Created`; new assignment confirmed with a `GET` request |
| `PUT` | `/api/rota/:rotaId/assignments/:assignmentId/staff` | Assign or change the staff member on an assignment | Returned `200 OK`; assignment was confirmed as manual and linked to the selected staff member |
| `DELETE` | `/api/rota/:rotaId/assignments/:assignmentId/staff` | Remove a staff member from a rota assignment | Returned a success message; database check confirmed `staff_member_id` was set to `NULL` |
| `PUT` | `/api/staff/:id` | Update staff details | Returned `200 OK` |
| `DELETE` | `/api/staff/:id` | Permanently delete a staff member | Tested with a temporary staff record; deletion was confirmed in MySQL |
| `GET` | `/api/activities` | Get all activity types | Returned the activity list |
| `POST` | `/api/activities` | Create an activity | Returned `201 Created`; new activity confirmed with a `GET` request |
| `PUT` | `/api/activities/:id` | Update an activity | Returned a success response; changes confirmed with a `GET` request |
| `DELETE` | `/api/activities/:id` | Delete an unused activity | Successfully deleted a test activity; MySQL protects activities used in assignments |
| `GET` | `/api/locations` | Get all locations | Returned the location list |
| `POST` | `/api/locations` | Create a location | Returned `201 Created`; new location confirmed with a `GET` request |
| `PUT` | `/api/locations/:id` | Update a location | Returned a success response; changes confirmed with a `GET` request |
| `DELETE` | `/api/locations/:id` | Delete an unused location | Successfully deleted a temporary test location; MySQL protects locations used in assignments |

Test data was initially created for the staff removal endpoint by adding a test rota assignment and activity in MySQL. The rota-assignment `POST` endpoint can now create additional assignment test data through the API.

## Next backend steps

- Add `GET` and `POST` endpoints for staff members, so staff can be viewed and created through the API.
- Add endpoints for teams and roles, which are needed to set up staff, activities, and locations.
- Optionally test error responses, such as `404 Not Found` for an ID that does not exist.

## Intended users
The primary user is someone who is responsible for generating a rota within their organisation, this could be a manager/team leader as an example. 

## Features
These are the current planned features;
- configurable roles and locations
- staff availibity
- absence recording
- monthly rota generatioin
- conflict warnings
- rota history
- rules including set office days

## Privacy
All examples use fictional names and generic locations - no real staff information is included. 

## Documentation relating to the project
## Design
- [Project brief](documents/portfolio-project-brief.md)
- [User stories](documents/user-stories.md)

## Technology used

- Front end: TBC Potentially react
- Back end: Javascript, Node.js, Express
- Database: MySQL
- Development tools: DBeaver, Postman

## Running the project locally
1. Clone the repository.
2. Install the dependencies.
3. Create the environment file.
4. Create the database.
5. Run the development server.

## Testing 

Manual API testing has been carried out in Postman for all implemented rota, rota-assignment, staff, activity and location endpoints listed above. Database checks were completed in MySQL after deleting a rota, removing a staff member from a rota assignment and deleting temporary staff, activity and location records.

## Learning 
This is my first project so I am listing what I have learnt below:
- understanding how to create a clear brief.
- Creating Express controllers and routes that use MySQL queries.
- Testing API requests and responses with Postman.
- Using foreign key error messages to identify the related database record required for test data.
- Mounting route groups in the main Express server file.
- Using URL parameters to work with a rota's related assignment records.
- Building and testing complete create, read, update and delete endpoints for activities and locations.
