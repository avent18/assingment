import axios from 'axios';
import { setCache, getCache } from './cache.js';

const GIT_API_BASE_URL = 'https://api.github.com';

export const getUserRepos = async (username) => {
  try {
    const cacheKey = `repos:${username}`;
    const cached = getCache(cacheKey);
    if (cached) return cached;


    const response = await axios.get(`${GIT_API_BASE_URL}/users/${username}/repos`);
    setCache(cacheKey, response.data);  
    return response.data;
  } catch (error) {
    console.error('Error fetching user repositories:', error);
    throw error;
  }
};

export const getRepoByUserName = async (username, repoName) => {
  try {

    const cacheKey = `repo:${username}/${repoName}`;
    const cached = getCache(cacheKey);
    if (cached) return cached;

    const response = await axios.get(`${GIT_API_BASE_URL}/repos/${username}/${repoName}`);
    setCache(cacheKey, response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching repository:', error);
    throw error;
  }
};