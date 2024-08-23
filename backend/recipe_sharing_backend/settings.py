INSTALLED_APPS = [
    'recipe_app',
    'rest_framework',
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  # Vite default port
]

# Add other configurations (databases, etc.)
