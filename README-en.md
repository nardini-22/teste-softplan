# Teste Softplan

[![pt](https://img.shields.io/badge/README-Portuguese-green.svg)](https://github.com/nardini-22/teste-softplan/blob/master/README.md)

## ✏️ Introduction

Repository for Softplan related to the Front-end PL developer position. I created an application that includes a login, a user table with CRUD options for a specific user profile, and user session management through [JWT](https://jwt.io/) and cookies. 
I chose Vite as my React development tool due to personal preference and fondness for it. My focus was on maintaining high-quality code, keeping it simple, easy to read, understand, and modify. I selected Tailwind and Shadcn/UI to facilitate component development 
and allow me to concentrate on the application's business logic. Lastly, I chose Vitest + React Testing Library for automated testing. The front-end and back-end repositories for this test are separate because, as the position is for front-end development, 
I kept the functionalities to be evaluated in the main repository and the API in another. The link to the API for more details is in the features section.

## 🌐 Demo

https://teste-softplan.vercel.app/

## 👥 Login

To access the application, a username and password are required. I have already provided some users in the mock database. If you want to log in as an `admin`, you can use the username `admin@admin.com` and the password `admin1234`. Alternatively, if you want to log in as a `user`, you can use the username `user2@user.com` and the password `user2password`.

## 📋 Features

- [x] The application includes login and password protection;
- [x] Two types of roles (admin and user);
- [x] Ttable with all registered users;
- [x] The table features search and pagination;
- [x] It's possible to create, edit, delete, and view a user (CRUD);
- [x] The logged-in user has the option to view their profile and change their password;
- [x] The application includes automated tests;
- [x] The application consumes the [API](https://github.com/nardini-22/teste-softplan-api) also created by me.

## 👔 Business rules

- [x] The user with admin access can perform CRUD operations on other users and view them;
- [x] The user with user access will only be able to view the users in the system.

## 💻 Tech stack

* [React](https://react.dev/)
* [Vite](https://vitejs.dev/)
* [Typescript](https://www.typescriptlang.org/)
* [Zod](https://zod.dev/)
* [React Hook Form](https://react-hook-form.com/)
* [Tanstack Query](https://tanstack.com/query/latest)
* [Tanstack Table](https://tanstack.com/table/latest)
* [Tailwind CSS](https://tailwindcss.com/)
* [Shadcn/ui](https://ui.shadcn.com/)
* [Biome](https://biomejs.dev/) (Alternative to ESlint)
* [Vitest](https://vitest.dev/)
* [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## 🚀 Installation

To clone and run this application, you'll need [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/nardini-22/teste-softplan.git

# Go into the repository
$ cd teste-softplan

# Install dependencies
$ npm install

# Create a .env with same values as .env.example

# Run the app
$ npm run dev

# In case you want to run tests
$ npm run test
```

## ❤️ Enjoy this project? 
Developed by Arthur Nardini.

[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/arthur-nardini/)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/nardini-22)
