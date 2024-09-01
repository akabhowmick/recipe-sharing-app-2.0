from django.urls import path
from .views import RecipeView, LikeView, CommentView

urlpatterns = [
    path("recipes/", RecipeView.as_view(), name="recipe-list-create"),
    path("recipes/<int:id>/", RecipeView.as_view(), name="recipe-detail"),
    path("recipes/<int:recipe_id>/like/", LikeView.as_view(), name="recipe-like"),
    path(
        "recipes/<int:recipe_id>/comment/", CommentView.as_view(), name="recipe-comment"
    ),
    path(
        "recipes/<int:recipe_id>/comment/<int:comment_id>/",
        CommentView.as_view(),
        name="recipe-comment-detail",
    ),
]
