from django.db import models
from django.conf import settings
from users.models import CustomUser

class Recipe(models.Model):
    id = models.AutoField(primary_key=True)  # Auto-generated unique ID
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    ingredients = models.TextField()
    instructions = models.TextField()
    image = models.TextField(blank=True, default="")
    cuisine_type = models.CharField(max_length=100)
    description = models.TextField()
    fun_fact = models.TextField()

    def __str__(self):
        return self.title


# // TODO Test these endpoints
class Like(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name="likes")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "recipe")

    def __str__(self):
        return f"{self.user} likes {self.recipe}"


class Comment(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='comments')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.user} on {self.recipe}"