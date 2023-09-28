# Enhance Your Financial Journey with Our Personal Finance Tracking Application

![Project Logo](project-logo.png) <!-- Include a logo or screenshot if applicable -->

A robust and user-friendly personal finance tracking tool to assist you in properly managing your finances. It is Your digital financial compass and is made to lead you through the challenging landscape of managing your own finances. With our app, you can easily track your expenses, manage your budgets, and analyze your spending patterns.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Data Security](#data-security)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Welcome to the Personal Finance Tracking Application! This application is designed to empower users like you to take control of your finances. Managing personal finance has become a crucial skill in a time marked by financial complexity and ever-changing economic environments. Financial stability and future goals can be strongly impacted by one's capacity to manage income, expenses, savings, and investments. We provide our Personal Finance Tracking Application to help you on your path to financial empowerment.

## Features

Here are some of the key features of our Personal Finance Tracking Application:

- **Expense and Income Tracking:** Easily record your daily expenses and income sources to keep a clear overview of your financial transactions.

- **Budget Management:** Set up budgets for different spending categories and receive alerts when you approach or exceed your budget limits.

- **Category-Based Spending Analysis:** Gain insights into your spending patterns by categorizing your transactions. Visualize your expenses in interactive charts and reports.

- **Data Export and Backup:** Export your financial data for record-keeping or create backups to ensure the safety of your information.

## Getting Started

Let's get started with our Personal Finance Tracking Application. Follow these steps to set up and use the app.

### Prerequisites

Before you begin, make sure you have the following prerequisites installed on your system:

- **Node.js:** You need Node.js to run the application. If you don't have it, you can download it from [here](https://nodejs.org/).

- **MongoDB Database:** Our app uses MongoDB to store your financial data. If you don't have MongoDB installed, you can download it [here](https://www.mongodb.com/).

if you don't want to install MongoDB on your system, you can use a cloud-based MongoDB service such as [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

if you don't want to use MongoDB Atlas, you can use a docker for MongoDB. I am adding a docker-compose file for MongoDB.

```bash
docker-compose up -d
```

- **Git:** You need Git to clone the repository. If you don't have it, you can download it from [here](https://git-scm.com/).

- **Yarn:** We use Yarn as our package manager. If you don't have it, run the following command to install it (make sure you have Node.js installed):

  ```bash
  npm install -g yarn
  ```

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/dev-Anamul/personal-finance-tracker.git
   cd personal-finance-tracker
   ```

2. **Install Dependencies:**

   ```bash
    yarn install
   ```

3. **Create a .env file:**

   ```bash
    touch .env
   ```

4. **Add the following environment variables to the .env file:**

   ```bash
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/personal-finance-tracker
    JWT_SECRET=your-secret
   ```

5. **Start the Application:**

   ```bash
    yarn start
   ```

6. **Open the Application in Your Browser:**

   ```bash
    http://localhost:3000
   ```

## Usage

### Register

To use the application, you need to register an account. Click on the **Register** button on the login page and fill out the registration form. Once you submit the form, you will be redirected to the login page. You can now log in to your account using your email and password.

### Add Transactions

Once you log in to your account, you can start adding transactions. Click on the **Add Transaction** button on the dashboard page to add a new transaction. You can add transactions for both expenses and income sources. Make sure you select the correct transaction type before submitting the form.

### Manage Budgets

You can set up budgets for different spending categories to keep track of your spending. Click on the **Budgets** button on the dashboard page to manage your budgets. You can add, edit, and delete budgets from the budgets page.

### View Reports

You can view your spending reports to gain insights into your spending patterns. Click on the **Reports** button on the dashboard page to view your reports. You can view your spending reports by category and by month.

### Export Data

You can export your financial data for record-keeping or create backups to ensure the safety of your information. Click on the **Export Data** button on the dashboard page to export your data. You can export your data in CSV format.

## Data Security

We take data security very seriously. We use industry-standard security measures to protect your data. We use the following security measures to protect your data:

- **Encryption:** We encrypt your data using the AES-256 encryption algorithm. We use a 256-bit encryption key to encrypt your data. We use the same encryption key to encrypt and decrypt your data.

- **Hashing:** We hash your passwords using the bcrypt hashing algorithm. We use a 10-round salt to hash your passwords. We use the same salt to hash and verify your passwords.

- **Salting:** We use a 16-byte salt to hash your passwords. We use the same salt to hash and verify your passwords.

- **Authentication:** We use JSON Web Tokens (JWTs) to authenticate your requests. We use the HS256 algorithm to sign your JWTs. We use the same secret to sign and verify your JWTs.
