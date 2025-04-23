/*
  Challenge 2: Users Who Dislike More Movies Than They Like

  Get a list of users who have rated more movies negatively than positively.

  Use the methods in utils/mocked-api to retrieve user and rating data.
  Check how many movies each user liked and disliked, then return only those with more dislikes.

  Requirements:
  - Use only Promise static methods (e.g., Promise.all, Promise.then, etc.) to handle the results
  - Only print the user information in the output—no extra text or formatting

 */

/**
 * @typedef {Object} User
 * @property {number} id - The unique identifier for the user.
 * @property {string} name - The name of the user.
 * @property {number} age - The age of the user.
 */

/**
 * Logs and returns the users who dislike more movies than they like.
 *
 * @returns {Promise<User[]>} A promise that resolves to an array of users who dislike more movies than they like.
 */
const { getUsers, getLikedMovies, getDislikedMovies } = require('./utils/mocked-api');
const getMovieCount = (movieList, userId) => {
  const userMovies = movieList.find(item => item.userId === userId);
  return userMovies ? userMovies.movies.length : 0;
}
const getUsersWithMoreDislikedMoviesThanLikedMovies = () => {
  return Promise.all([
    getUsers(), 
    getLikedMovies(),
    getDislikedMovies() 
  ]).then(([users, likeMovies, dislikeMovies]) => {
      const processedUsers = users.map(user => {
        const likesCount = getMovieCount(likeMovies, user.id);
        const dislikesCount = getMovieCount(dislikeMovies, user.id);
        if(likesCount < dislikesCount){
          return {...user}
        }
        return null
      });
      return processedUsers.filter(user => user!== null)
  }).catch(err => {
    return Promise.reject(new Error('failed to load data.', err));
  });
};

getUsersWithMoreDislikedMoviesThanLikedMovies().then((users) => {
  console.log("Users with more disliked movies than liked movies:");
  users.forEach((user) => {
    console.log(user);
  });
}).catch(err => console.log(err));
