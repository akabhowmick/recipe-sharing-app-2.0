from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views import View
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializers import LikeSerializer, CommentSerializer
from django.utils.decorators import method_decorator
from .models import Recipe, Like, Comment
import json
from django.shortcuts import get_object_or_404
from django.core.exceptions import ValidationError


CustomUser = get_user_model()


@method_decorator(csrf_exempt, name="dispatch")
class RecipeView(View):

    def get(self, request, *args, **kwargs):
        recipe_id = kwargs.get("id")
        if recipe_id:
            recipe = get_object_or_404(Recipe, id=recipe_id)
            data = {
                "id": recipe.id,
                "title": recipe.title,
                "ingredients": recipe.ingredients,
                "instructions": recipe.instructions,
                "image": recipe.image,
                "cuisine_type": recipe.cuisine_type,
                "description": recipe.description,
                "fun_fact": recipe.fun_fact,
                "user": recipe.user.id,
            }
            return JsonResponse(data)
        else:
            recipes = Recipe.objects.all().values()
            return JsonResponse(list(recipes), safe=False)

    def post(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body)
            user_id = data.get("userID")
            # Validate and get the user
            user = get_object_or_404(CustomUser, id=user_id)

            # Create the recipe
            recipe = Recipe.objects.create(
                title=data["title"],
                ingredients=data["ingredients"],
                instructions=data["instructions"],
                image=data.get("image", ""),
                cuisine_type=data["cuisine_type"],
                description=data["description"],
                fun_fact=data["fun_fact"],
                user=user,
            )

            response_data = {
                "id": recipe.id,
                "title": recipe.title,
                "ingredients": recipe.ingredients,
                "instructions": recipe.instructions,
                "image": recipe.image,
                "cuisine_type": recipe.cuisine_type,
                "description": recipe.description,
                "fun_fact": recipe.fun_fact,
                "user": recipe.user.id,
            }

            return JsonResponse(response_data, status=201)

        except ValidationError as e:
            return JsonResponse({"error": str(e)}, status=400)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    def patch(self, request, *args, **kwargs):
        recipe_id = kwargs.get("id")
        if not recipe_id:
            return JsonResponse({"error": "Recipe ID is required"}, status=400)

        try:
            recipe = Recipe.objects.get(id=recipe_id)
        except Recipe.DoesNotExist:
            return JsonResponse({"error": "Recipe not found"}, status=404)

        data = json.loads(request.body)
        recipe.title = data.get("title", recipe.title)
        recipe.ingredients = data.get("ingredients", recipe.ingredients)
        recipe.instructions = data.get("instructions", recipe.instructions)
        recipe.image = data.get("image", recipe.image)
        recipe.cuisine_type = data.get("cuisine_type", recipe.cuisine_type)
        recipe.description = data.get("description", recipe.description)
        recipe.fun_fact = data.get("fun_fact", recipe.fun_fact)
        recipe.save()

        return JsonResponse(
            {
                "id": recipe.id,
                "title": recipe.title,
                "ingredients": recipe.ingredients,
                "instructions": recipe.instructions,
                "image": recipe.image,
                "cuisine_type": recipe.cuisine_type,
                "description": recipe.description,
                "fun_fact": recipe.fun_fact,
            }
        )

    def delete(self, request, *args, **kwargs):
        recipe_id = kwargs.get("id")
        if not recipe_id:
            return JsonResponse({"error": "Recipe ID is required"}, status=400)

        try:
            recipe = Recipe.objects.get(id=recipe_id)
        except Recipe.DoesNotExist:
            return JsonResponse({"error": "Recipe not found"}, status=404)

        recipe.delete()
        return HttpResponse(status=204)


class LikeView(APIView):
    def post(self, request, recipe_id):
        try:
            recipe = Recipe.objects.get(id=recipe_id)
        except Recipe.DoesNotExist:
            return Response(
                {"error": "Recipe does not exist"}, status=status.HTTP_404_NOT_FOUND
            )

        user_id = request.data.get("user")

        # Validate and get the user
        try:
            user = CustomUser.objects.get(id=user_id)
        except CustomUser.DoesNotExist:
            return Response(
                {"error": "User does not exist"}, status=status.HTTP_400_BAD_REQUEST
            )

        data = {
            "user": user.id,
            "recipe": recipe.id,
        }

        # Check if the like already exists
        if Like.objects.filter(user=user, recipe=recipe).exists():
            return Response(
                {"detail": "You have already liked this recipe."},
                status=status.HTTP_409_CONFLICT,
            )

        # Serialize and save the like
        serializer = LikeSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, recipe_id=None):
        """
        If recipe_id is provided, get all likes for a specific recipe.
        Otherwise, get all likes by a specific user (requires user_id as a query param).
        """
        user_id = request.query_params.get("user")
        if recipe_id:
            # Get likes filtered by recipe
            try:
                recipe = Recipe.objects.get(id=recipe_id)
            except Recipe.DoesNotExist:
                return Response(
                    {"error": "Recipe does not exist."},
                    status=status.HTTP_404_NOT_FOUND
                )
            likes = Like.objects.filter(recipe=recipe).select_related('user')
            serializer = LikeSerializer(likes, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        elif user_id:
            # Get likes filtered by user
            try:
                user = CustomUser.objects.get(id=user_id)
            except CustomUser.DoesNotExist:
                return Response(
                    {"error": "User does not exist."},
                    status=status.HTTP_404_NOT_FOUND
                )
            likes = Like.objects.filter(user=user).select_related('recipe')
            serializer = LikeSerializer(likes, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(
                {"error": "Either recipe_id or user_id is required."},
                status=status.HTTP_400_BAD_REQUEST
            )

    def delete(self, request, recipe_id):
        """Delete a like by the user for a specific recipe."""
        user_id = request.data.get("user")

        # Validate and get the user
        try:
            user = CustomUser.objects.get(id=user_id)
        except CustomUser.DoesNotExist:
            return Response(
                {"error": "User does not exist"}, status=status.HTTP_400_BAD_REQUEST
            )

        # Try to get the like by user and recipe
        try:
            like = Like.objects.get(user=user, recipe_id=recipe_id)
        except Like.DoesNotExist:
            return Response(
                {
                    "error": "Like does not exist or you do not have permission to delete it."
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        # Delete the like
        like.delete()

        return Response(
            {"detail": "Like deleted successfully."}, status=status.HTTP_204_NO_CONTENT
        )

    def get_likes_by_recipe(self, request, recipe_id):
        """Get all likes for a specific recipe."""
        try:
            recipe = Recipe.objects.get(id=recipe_id)
        except Recipe.DoesNotExist:
            return Response(
                {"error": "Recipe does not exist."}, status=status.HTTP_404_NOT_FOUND
            )

        likes = Like.objects.filter(recipe=recipe).select_related("user")
        serializer = LikeSerializer(likes, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class CommentView(APIView):
    def post(self, request, recipe_id):
        recipe = Recipe.objects.get(id=recipe_id)
        user_id = request.data.get("user")

        # Validate and get the user
        try:
            user = CustomUser.objects.get(id=user_id)
        except CustomUser.DoesNotExist:
            return Response(
                {"error": "User does not exist"}, status=status.HTTP_400_BAD_REQUEST
            )

        data = {
            "user": user.id,
            "recipe": recipe.id,
            "content": request.data.get("content"),
        }

        serializer = CommentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, recipe_id):
        """Retrieve all comments for a recipe."""
        recipe = Recipe.objects.get(id=recipe_id)
        comments = Comment.objects.filter(recipe=recipe)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request, recipe_id, comment_id):
        try:
            comment = Comment.objects.get(id=comment_id, recipe_id=recipe_id)
        except Comment.DoesNotExist:
            return Response(
                {"error": "Comment not found"}, status=status.HTTP_404_NOT_FOUND
            )

        # Update the comment's content
        updated_content = request.data.get("content")
        if updated_content:
            comment.content = updated_content
            comment.save()

            serializer = CommentSerializer(comment)
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(
            {"error": "No content provided"}, status=status.HTTP_400_BAD_REQUEST
        )

    def delete(self, request, recipe_id, comment_id):
        try:
            comment = Comment.objects.get(id=comment_id, recipe_id=recipe_id)
        except Comment.DoesNotExist:
            return Response(
                {"detail": "Comment not found."},
                status=status.HTTP_404_NOT_FOUND,
            )
        comment.delete()
        return Response(
            {"detail": "Comment deleted."}, status=status.HTTP_204_NO_CONTENT
        )
