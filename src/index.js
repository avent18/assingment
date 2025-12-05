import express from 'express';
import { getRepoByUserName, getUserRepos } from './gitClient.js';



const app = express();
const PORT = process.env.PORT || 3000;


//to check
app.get('/', (req, res) => {
  res.send('api is working');
});

//to get all repos of a user with optional filtering by language and stars
app.get('/repos', async (req, res) => {
  const {username, language, minStars} = req.query;
  if(!username){
    return res.status(400).json({error: 'username query parameter is required'});
  }

  let repos = await getUserRepos(username);
  if(language){
    repos = repos.filter(repo => repo.language && repo.language.toLowerCase() === language.toLowerCase());
  }

  if (minStars) {
  repos = repos.filter(repo => repo.stargazers_count >= Number(minStars));
}


  res.json(
    repos.map(repo => ({
      id : repo.id,
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description,
      html_url: repo.html_url,
      language : repo.language,
      stargazers_count: repo.stargazers_count
    })
    )
  );
})


app.get('/repos/:username/:repoName', async (req, res) => {
  const {username, repoName} = req.params;
  try {
    const repo = await getRepoByUserName(username, repoName);
    res.json({
      id : repo.id,
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description,
      html_url: repo.html_url,
      language : repo.language,
      stargazers_count: repo.stargazers_count
    });
  } catch (error) {
    res.status(500).json({error: 'Error fetching repository'});
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
