# Welcome to the Recipe Sharing App

## Table of Contents

1. [Inspiration](#inspiration)
2. [Project Breakdown](#project-breakdown)
3. [Current Features](#current-features)
3. [Backend Setup](#backend-setup)
4. [Frontend Setup](#frontend-setup)
5. [Future Features](#future-features)

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
python manage.py runserver
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

1. Recipe Management:

   Allow users to update or delete their recipes, ensuring they have full control over their content.
   => two more views in the django paths 

2. Profile Management:

   Enable users to update or delete their profiles, giving them the ability to manage their presence on the platform.
   => fix login, register 
   => allow users to put more information into their profile 
   

3. Image Uploads:

   Introduce a feature for users to upload images for their recipes, adding a visual element to the culinary creations.
   => just finish after changing the main image path

4. Social Interactions:

   Expand the app's social features, allowing users to share recipes on other platforms, like, favorite, bookmark, and comment on recipes. This will foster a community of food enthusiasts and encourage engagement.
   => favorite recipe [should be its own table and endpoint]
   => comment on recipe [should be its own table and endpoint] 
