import { Recipe } from './types';

export const searchRecipes = async (searchTerm: string, page: number) => {
  const baseUrl = new URL('http://localhost:5000/api/recipes/search');

  baseUrl.searchParams.append('searchTerm', searchTerm);
  baseUrl.searchParams.append('page', page.toString());

  const res = await fetch(baseUrl);

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return res.json();
};

export const getRecipeSummary = async (recipeId: number) => {
  const baseUrl = new URL(
    `http://localhost:5000/api/recipes/${recipeId}/summary`
  );

  const res = await fetch(baseUrl);

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return res.json();
};

export const getFavoriteRecipes = async () => {
  const url = new URL(`http://localhost:5000/api/recipes/favorite`);

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return res.json();
};

export const addFavoriteRecipe = async (recipe: Recipe) => {
  const url = new URL(`http://localhost:5000/api/recipes/favorite`);
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
  const url = new URL(`http://localhost:5000/api/recipes/favorite`);
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
