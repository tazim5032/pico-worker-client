# MicroTask Project

Welcome to the MicroTask Project! This project is a micro-task management system with different user roles and functionalities, allowing task creation, task completion, and financial transactions for task rewards. The live version of the project can be found [here](https://micro-task-55c95.web.app/).

- [Live Link](https://micro-task-55c95.web.app/).

Admin email: tazim@gmail.com
Admin Password: Aaaaaa

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
  - [Common Features](#common-features)
  - [Role-Based Features](#role-based-features)
    - [Admin](#admin)
    - [Task Creator](#task-creator)
    - [Worker](#worker)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

MicroTask is a web application that allows users to create, complete, and manage tasks. The platform supports three types of users: Admin, Task Creator, and Worker. Each user type has specific functionalities designed to streamline the task management and reward system.

## Features

### Common Features

- **Authentication**: Users can sign up using email/password or Google through Firebase Authentication.
- **JWT Token**: Secure authentication using JSON Web Tokens (JWT).
- **Responsive Design**: User-friendly interface that works on various devices.

### Role-Based Features

#### Admin

- Monitor and control all activities on the platform.
- Manage user roles (promote, demote, or remove users).
- Remove tasks from the system.
- Approve or reject withdrawal requests from workers.

#### Task Creator

- Add new tasks to the platform (requires coins).
- Review task submissions by workers.
- Accept or decline task submissions.
- Update and delete tasks.
- Purchase coins using a Stripe-based payment system.

#### Worker

- Browse available tasks and submit completed tasks.
- Earn money by completing tasks.
- Withdraw earned money using Bkash, Nagad, or Rocket.

## Technologies Used

- **Frontend**: React, React Hooks, React Icons, SweetAlert, React Form
- **Backend**: Express, Node.js
- **Database**: MongoDB
- **Authentication**: Firebase Authentication
- **Payments**: Stripe
- **Hosting**: Firebase Hosting

## Installation

To run the project locally, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/tazim5032/microtask.git
    cd microtask
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Setup environment variables**:
    - Create a `.env` file in the root directory and add necessary environment variables (e.g., Firebase configuration, Stripe keys, MongoDB URI).

4. **Run the development server**:
    ```bash
    npm start
    ```

5. **Open your browser** and navigate to `http://localhost:3000`.

## Usage

1. **Sign Up**: Create a new account using email/password or Google authentication.
2. **Role Assignment**: The admin assigns roles to users (Admin, Task Creator, or Worker).
3. **Task Management**: Task Creators can add tasks, and Workers can complete tasks.
4. **Financial Transactions**: Task Creators buy coins using Stripe, and Workers withdraw earnings using Bkash, Nagad, or Rocket.

## Contributing

We welcome contributions! Please follow these steps to contribute:

1. **Fork the repository**.
2. **Create a new branch** for your feature or bugfix:
    ```bash
    git checkout -b feature-name
    ```
3. **Commit your changes**:
    ```bash
    git commit -m "Add some feature"
    ```
4. **Push to the branch**:
    ```bash
    git push origin feature-name
    ```
5. **Create a new Pull Request**.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Feel free to reach out if you have any questions or need further assistance. Thank you for using MicroTask!