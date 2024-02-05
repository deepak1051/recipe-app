"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFavoriteRecipesByIDs = exports.getRecipeSummary = exports.searchRecipes = void 0;
const apiKey = process.env.API_KEY;
const searchRecipes = (searchTerm, page) => __awaiter(void 0, void 0, void 0, function* () {
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
        const res = yield fetch(url);
        const data = yield res.json();
        return data;
    }
    catch (error) {
        console.log(error);
    }
});
exports.searchRecipes = searchRecipes;
const getRecipeSummary = (recipeId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!apiKey) {
        throw new Error('API Key not found');
    }
    const url = new URL(`https://api.spoonacular.com/recipes/${recipeId}/summary`);
    const queryParams = {
        apiKey,
    };
    url.search = new URLSearchParams(queryParams).toString();
    try {
        const res = yield fetch(url);
        const data = yield res.json();
        return data;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getRecipeSummary = getRecipeSummary;
const getFavoriteRecipesByIDs = (ids) => __awaiter(void 0, void 0, void 0, function* () {
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
        const res = yield fetch(url);
        const data = yield res.json();
        return { results: data };
    }
    catch (error) {
        console.log(error);
    }
});
exports.getFavoriteRecipesByIDs = getFavoriteRecipesByIDs;
