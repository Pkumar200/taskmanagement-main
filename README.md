# Task Manager Application

A simple Task Manager app built with **JavaScript**, **Express**, and **MongoDB** to allow users to manage their tasks. The app allows users to add, edit, update task statuses, and view a list of tasks.

## Features

- **Add Tasks**: Users can add new tasks with a title, description, due date, and status.
- **View Tasks**: All tasks are displayed with their details: title, description, due date, and status.
- **Edit Tasks**: Users can edit the task details including title, description, and due date.
- **Change Status**: Users can mark tasks as "Completed" or update their status to "Pending" or "In Progress".
- **Complete Tasks**: Once a task is marked as completed, it will be displayed with a link to indicate it's completed.

## Tech Stack

- **Frontend**: 
  - HTML, CSS, JavaScript
  - Fetch API to make HTTP requests to the backend
  - DOM manipulation to dynamically update the task list

- **Backend**:
  - **Express.js** for building the RESTful API
  - **MongoDB** for storing and managing task data
  - **Mongoose** for handling MongoDB operations
  - **CORS** for enabling cross-origin requests

## Installation

### Prerequisites

- **Node.js**: Ensure Node.js is installed on your system.
- **MongoDB**: You need to have MongoDB running locally or use a cloud instance (e.g., MongoDB Atlas).

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/task-manager.git
   cd task-manager
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the backend server:

   ```bash
   node server.js
   ```

4. Open the `index.html` in your browser or run a local server for the frontend. You can use `live-server` or any similar tool:

   ```bash
   live-server
   ```

   Your application should now be available at `http://localhost:5000`.

## API Endpoints

- **GET /tasks**: Fetch all tasks from the database.
- **POST /tasks**: Create a new task.
  - Request body: `{ "title": String, "description": String, "dueDate": String, "status": String }`
- **PUT /tasks/:id**: Update a task's details or status.
  - Request body: `{ "title": String, "description": String, "dueDate": String, "status": String }`
- **DELETE /tasks/:id**: Delete a task by ID.

## File Structure

```
.
├── client/                # Frontend files
│   ├── index.html         # Main HTML file
│   ├── style.css          # Styles
│   └── app.js             # Main JavaScript file
└── server.js              # Backend Express server
```

## Styling

The app uses simple and responsive styling to provide a user-friendly interface. You can customize the `style.css` file to adjust the UI elements as per your preferences.

## Usage

- After loading the page, you will see a form to add tasks. Fill in the task title, description, due date, and status (e.g., Pending, In Progress, Completed).
- The tasks you add will be displayed in a list on the right side of the screen.
- Each task can be edited, marked as completed, or have its status updated.

## Example

When adding a task, you’ll fill out the form with:

- **Title**: Task 1
- **Description**: Complete the project
- **Due Date**: 2025-02-01
- **Status**: Pending

The task will be displayed under the task list. You can then click on buttons to edit or change the task’s status.


