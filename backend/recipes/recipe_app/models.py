from django.db import models

class Recipe(models.Model):
    id = models.AutoField(primary_key=True)  # Auto-generated unique ID
    title = models.CharField(max_length=255)
    ingredients = models.TextField()
    instructions = models.TextField()
    image = models.TextField(blank=True, default="")
    cuisine_type = models.CharField(max_length=100)
    description = models.TextField()
    fun_fact = models.TextField()

    def __str__(self):
        return self.title
