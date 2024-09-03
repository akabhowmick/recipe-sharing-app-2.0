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


CustomUser = get_user_model()


@method_decorator(csrf_exempt, name="dispatch")
class RecipeView(View):

    def get(self, request, *args, **kwargs):
        recipe_id = kwargs.get("id")
        if recipe_id:
            try:
                recipe = Recipe.objects.get(id=recipe_id)
                data = {
                    "id": recipe.id,
                    "title": recipe.title,
                    "ingredients": recipe.ingredients,
                    "instructions": recipe.instructions,
                    "image": recipe.image,
                    "cuisine_type": recipe.cuisine_type,
                    "description": recipe.description,
                    "fun_fact": recipe.fun_fact,
                }
                return JsonResponse(data)
            except Recipe.DoesNotExist:
                return JsonResponse({"error": "Recipe not found"}, status=404)
        else:
            recipes = Recipe.objects.all().values()
            return JsonResponse(list(recipes), safe=False)

    def post(self, request, *args, **kwargs):
        data = json.loads(request.body)
        recipe = Recipe.objects.create(
            title=data["title"],
            ingredients=data["ingredients"],
            instructions=data["instructions"],
            image=data.get("image", ""),
            cuisine_type=data["cuisine_type"],
            description=data["description"],
            fun_fact=data["fun_fact"],
        )
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
            },
            status=201,
        )

    def put(self, request, *args, **kwargs):
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
        }

        # Check if the like already exists
        if Like.objects.filter(user=user, recipe=recipe).exists():
            return Response(
                {"detail": "You have already liked this recipe."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Serialize and save the like
        serializer = LikeSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, recipe_id):
        recipe = Recipe.objects.get(id=recipe_id)
        like = Like.objects.filter(user=request.user, recipe=recipe).first()
        if like:
            like.delete()
            return Response(
                {"detail": "Like removed."}, status=status.HTTP_204_NO_CONTENT
            )
        return Response(
            {"detail": "Like not found."}, status=status.HTTP_400_BAD_REQUEST
        )


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

    def put(self, request, recipe_id, comment_id):
        """Update an existing comment."""
        try:
            comment = Comment.objects.get(
                id=comment_id, recipe__id=recipe_id, user=request.user
            )
        except Comment.DoesNotExist:
            return Response(
                {
                    "detail": "Comment not found or you do not have permission to edit this comment."
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = CommentSerializer(comment, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, recipe_id, comment_id):
        """Delete a comment."""
        try:
            comment = Comment.objects.get(
                id=comment_id, recipe__id=recipe_id, user=request.user
            )
        except Comment.DoesNotExist:
            return Response(
                {
                    "detail": "Comment not found or you do not have permission to delete this comment."
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        comment.delete()
        return Response(
            {"detail": "Comment deleted."}, status=status.HTTP_204_NO_CONTENT
        )
