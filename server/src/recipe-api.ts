const apiKey = process.env.API_KEY;

export const searchRecipes = async (searchTerm: string, page: number) => {
  if (!apiKey) {
    throw new Error('API Key not found');
  }

  const url = new URL('https://api.spoonacular.com/recipes/complexSearch');
  const queryParams = {
    apiKey,
    query: searchTerm,
    number: '10',
    offset: ((page - 1) * 10).toString(),
  };

  url.search = new URLSearchParams(queryParams).toString();

  try {
    const res = await fetch(url);
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getRecipeSummary = async (recipeId: string) => {
  if (!apiKey) {
    throw new Error('API Key not found');
  }

  const url = new URL(
    `https://api.spoonacular.com/recipes/${recipeId}/summary`
  );
  const queryParams = {
    apiKey,
  };

  url.search = new URLSearchParams(queryParams).toString();

  try {
    const res = await fetch(url);
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getFavoriteRecipesByIDs = async (ids: string[]) => {
  if (!apiKey) {
    throw new Error('API Key not found');
  }
  const url = new URL(`https://api.spoonacular.com/recipes/informationBulk`);
  const params = {
    apiKey,
    ids: ids.join(','),
  };

  url.search = new URLSearchParams(params).toString();

  try {
    const res = await fetch(url);
    const data = await res.json();

    return { results: data };
  } catch (error) {
    console.log(error);
  }
};
