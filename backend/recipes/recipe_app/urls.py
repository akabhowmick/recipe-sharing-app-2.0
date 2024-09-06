from django.urls import path
from .views import RecipeView, LikeView, CommentView

urlpatterns = [
    path("recipes/", RecipeView.as_view(), name="recipe-list-create"),
    path("recipes/<int:id>/", RecipeView.as_view(), name="recipe-detail"),
    # GET and POST for a specific recipe
    path('recipes/<int:recipe_id>/likes/', LikeView.as_view()),
    # GET all likes by a user (user_id as a query parameter)
    path('users/likes/', LikeView.as_view()),  # URL for likes by a user
    path(
        "recipes/<int:recipe_id>/comment/", CommentView.as_view(), name="recipe-comment"
    ),
    path(
        "recipes/<int:recipe_id>/comment/<int:comment_id>/",
        CommentView.as_view(),
        name="recipe-comment-detail",
    ),
]
