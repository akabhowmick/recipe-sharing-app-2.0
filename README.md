## Backend cd

# 1. Create a virtual environment

python3 -m venv env

# 2. Activate the virtual environment

# On Windows:

.\env\Scripts\activate

# On macOS/Linux:

source env/bin/activate

# 3. Install Django

pip install django

# 4. Start a new Django project

django-admin startproject myproject

# 5. Navigate to project directory

cd myproject

# 6. Run initial migrations
python3 manage.py makemigrations
python3 manage.py migrate

# 7. Start the development server

python manage.py runserver

# 8. (Optional) Create a new app within the project

python manage.py startapp 
<!-- Update this file -->
# 9. (Optional) Install additional dependencies from requirements.txt

pip install -r requirements.txt

# 10. Deactivate the virtual environment when done

deactivate

## Requirements:

1. Need Python
   python --version
   python3 --version
