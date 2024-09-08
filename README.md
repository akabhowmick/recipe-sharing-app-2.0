# Welcome to the Recipe Sharing App

## Table of Contents

1. [Inspiration](#inspiration)
2. [Project Breakdown](#project-breakdown)
3. [Current Features](#current-features)
4. [Backend Setup](#backend-setup)
5. [Frontend Setup](#frontend-setup)
6. [Future Features](#future-features)

## Inspiration

As an Indian-American married to a Korean-American, my wife and I often find ourselves calling our mothers for tips on how to prepare traditional dishes correctly. It would be great to have a platform where it is possible and easy to share information regarding our cultural dishes!

## Project Breakdown

- **Frontend:** React JS, Tailwind CSS, TypeScript
- **Backend:** Django

## Current Features

1. Login/Register to your account
2. Logout from your account
3. Post new recipes when logged in
4. View all recipes
5. Users can delete and update their recipes
6. For all recipes, the users can upload and display their unique images
7. Users can post comments, and edit and delete their comments
8. Users can select their favorites

## Backend Setup

1. Navigate to the Backend Directory:

```bash
cd backend/
```

2. Create a virtual environment by running the command:

```bash
python3 -m venv env
```

3. Activate the Virtual Environment:

   On Windows:

   ```bash
   .\env\Scripts\activate
   ```

   On macOs/Linux:

   ```bash
   source env/bin/activate
   ```

4. Install Django:

```bash
   pip install django
```

5. Navigate to the Project Directory:

```bash
cd recipes/
```

6. Run Initial Migrations:

```bash
python3 manage.py makemigrations
python3 manage.py migrate

```

6. Start the Development Server:

```bash
python3 manage.py runserver
```

## Frontend Setup

The frontend of the Recipe Sharing App is built with React JS, providing a dynamic and interactive user interface. Tailwind CSS is used for utility-first styling, ensuring a consistent and responsive design across all devices. TypeScript adds type safety, making the codebase more reliable and easier to maintain.

1. Navigate to the Frontend Directory (in a separate terminal):

```bash
cd frontend/
```

2. Install Dependencies:

```bash
npm install
```

3. Run the Development Server:

```bash
npm run dev
```

## Future Features

1. Profile Management:

   Enable users to update or delete their profiles, giving them the ability to manage their presence on the platform.

2. Filters and Search Bar:

   Users will be able to filter and search for specific recipes, and toggle between their saved recipes and all recipes.

3. Reviews for each recipe
