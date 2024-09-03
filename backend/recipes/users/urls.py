# backend/users/urls.py
from django.urls import path

from .views import RegisterView, LoginView, ProtectedView


urlpatterns = [
    path("api/register/", RegisterView.as_view(), name="register"),
    path("api/login/", LoginView.as_view(), name="login"),
    path("api/protected/", ProtectedView.as_view(), name="protected_view"),
]
