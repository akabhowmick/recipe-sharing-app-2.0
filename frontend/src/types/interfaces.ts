export interface RecipeAppUser {
  id?: number;
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
  user_id?: string;
}

export interface Like {
  id?: number;
  user: number;
  recipe: Recipe;
  created_at: Date;
}

export interface Comment {
  id?: number;
  user?: string;
  userId?: string;
  recipe: Recipe;
  content: string;
  created_at: Date;
}
