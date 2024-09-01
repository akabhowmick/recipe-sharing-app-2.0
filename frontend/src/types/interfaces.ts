export interface RecipeAppUser {
  email: string;
  name: string;
}

export interface Recipe {
  id?: number;
  title: string;
  ingredients: string;
  instructions: string;
  image: string;
  cuisine_type: string;
  description: string;
  fun_fact: string;
  user?: RecipeAppUser;
}

export interface Like {
  user: RecipeAppUser;
  recipe: Recipe;
  created_at: Date;
}

export interface Comment {
  id?: number;
  user: RecipeAppUser;
  recipe: Recipe;
  content: string;
  created_at: Date;
}
