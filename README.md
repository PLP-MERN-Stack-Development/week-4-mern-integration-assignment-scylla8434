[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19865178&assignment_repo_type=AssignmentRepo)
# MERN Stack Integration Assignment

This assignment focuses on building a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application that demonstrates seamless integration between front-end and back-end components.

## Assignment Overview

You will build a blog application with the following features:
1. RESTful API with Express.js and MongoDB
2. React front-end with component architecture
3. Full CRUD functionality for blog posts
4. User authentication and authorization
5. Advanced features like image uploads and comments

## Project Structure

```
mern-blog/
├── client/                 # React front-end
│   ├── public/             # Static files
│   ├── src/                # React source code
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API services
│   │   ├── context/        # React context providers
│   │   └── App.jsx         # Main application component
│   └── package.json        # Client dependencies
├── server/                 # Express.js back-end
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── utils/              # Utility functions
│   ├── server.js           # Main server file
│   └── package.json        # Server dependencies
└── README.md               # Project documentation
```

## Getting Started

1. Accept the GitHub Classroom assignment invitation
2. Clone your personal repository that was created by GitHub Classroom
3. Follow the setup instructions in the `Week4-Assignment.md` file
4. Complete the tasks outlined in the assignment

## Files Included

- `Week4-Assignment.md`: Detailed assignment instructions
- Starter code for both client and server:
  - Basic project structure
  - Configuration files
  - Sample models and components

## Requirements

- Node.js (v18 or higher)
- MongoDB (local installation or Atlas account)
- npm or yarn
- Git

## Submission

Your work will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

1. Complete both the client and server portions of the application
2. Implement all required API endpoints
3. Create the necessary React components and hooks
4. Document your API and setup process in the README.md
5. Include screenshots of your working application

## Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)

# MERN Blog Application

## Project Overview
A full-stack MERN (MongoDB, Express.js, React.js, Node.js) blog application with authentication, image uploads, pagination, search/filter, and comments.

## Setup Instructions
1. Install Node.js (v18+) and MongoDB.
2. Clone this repository.
3. Install server dependencies:
   ```
   cd server
   npm install
   ```
4. Install client dependencies:
   ```
   cd client
   npm install
   ```
5. Set up environment variables using `.env.example` files in both `client` and `server`.
6. Start the development servers:
   ```
   # In the server directory
   npm run dev
   # In the client directory
   npm run dev
   ```

## API Documentation
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `GET /api/posts` - List posts (pagination, search, filter)
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create post (auth)
- `PUT /api/posts/:id` - Update post (auth)
- `DELETE /api/posts/:id` - Delete post (auth)
- `POST /api/posts/:id/comments` - Add comment (auth)
- `GET /api/categories` - List categories
- `POST /api/categories` - Create category (auth)

## Features Implemented
- User authentication (JWT)
- CRUD for posts and categories
- Image upload for posts
- Pagination, search, and filter for posts
- Comments on posts
- React Router navigation
- Optimistic UI, loading/error states

## Screenshots

See [client/screenshots.md](client/screenshots.md) for light/dark mode screenshots and feature highlights.

## Features
- Modern, responsive, premium UI/UX
- Dark mode toggle (user and system theme)
- Authentication (register, login, logout)
- CRUD for posts and categories
- Comments with avatars and animation
- Image upload with drag-and-drop
- Category badges, post cards, search
- Pagination-ready, accessible, and mobile-friendly

## How to Add Screenshots
1. Run the app in both light and dark mode.
2. Take screenshots of the main pages (home, post view, forms, etc.).
3. Save them in the `client/screenshots/` folder as shown in `screenshots.md`.
4. Update the documentation as needed.

---

## Submission Checklist
- [x] All features work end-to-end
- [x] UI/UX is modern, responsive, and polished
- [x] Dark mode toggle works
- [x] README and screenshots are updated
- [x] .env.example files provided
- [x] Ready for grading or showcase