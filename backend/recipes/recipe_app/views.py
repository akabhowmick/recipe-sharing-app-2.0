from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views import View
from django.utils.decorators import method_decorator
from .models import Recipe
import json


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
