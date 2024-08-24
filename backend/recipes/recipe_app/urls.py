from django.urls import path
from .views import RecipeView

urlpatterns = [
    path('recipes/', RecipeView.as_view(), name='recipe-list-create'),
    path('recipes/<int:id>/', RecipeView.as_view(), name='recipe-detail'),
]
