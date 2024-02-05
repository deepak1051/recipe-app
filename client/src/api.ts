import { Recipe } from './types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const searchRecipes = async (searchTerm: string, page: number) => {
  const baseUrl = new URL(`${API_BASE_URL}/api/recipes/search`);

  baseUrl.searchParams.append('searchTerm', searchTerm);
  baseUrl.searchParams.append('page', page.toString());

  const res = await fetch(baseUrl);

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return res.json();
};

export const getRecipeSummary = async (recipeId: number) => {
  const baseUrl = new URL(`${API_BASE_URL}/api/recipes/${recipeId}/summary`);

  const res = await fetch(baseUrl);

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return res.json();
};

export const getFavoriteRecipes = async () => {
  const url = new URL(`${API_BASE_URL}/api/recipes/favorite`);

  console.log(url);

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return res.json();
};

export const addFavoriteRecipe = async (recipe: Recipe) => {
  const url = new URL(`${API_BASE_URL}/api/recipes/favorite`);
  const body = {
    recipeId: recipe.id,
  };
  const res = await fetch(url, {
    body: JSON.stringify(body),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return res.json();
};

export const removeFavoriteRecipe = async (recipe: Recipe) => {
  const url = new URL(`${API_BASE_URL}/api/recipes/favorite`);
  const body = {
    recipeId: recipe.id,
  };

  try {
    const res = await fetch(url, {
      body: JSON.stringify(body),
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(res);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
