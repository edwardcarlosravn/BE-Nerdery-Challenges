/*

  Challenge 3: Most Common Subscription for Harsh Reviewers

  Find the most common subscription among users who dislike more movies than they like.
  Use the methods in utils/mocked-api to get user and rating data.
  Check each user's likes vs. dislikes, filter those with more dislikes, and return the most frequent subscription.

  Requesites:
    - Use await with the methods from utils/mocked-api to get the data
    - Make sure to return a string containing the name of the most common subscription
*/

/**
 * Logs the most common subscription among users
 * who disliked more movies than they liked.
 *
 * @returns {Promise<string>} Logs the subscription name as a string.
 */
const { getUsers, getLikedMovies, getDislikedMovies,  getUserSubscriptionByUserId} = require('./utils/mocked-api');
const getMovieCount = (movieList, userId) => {
  const userMovies = movieList.find(item => item.userId === userId);
  return userMovies ? userMovies.movies.length : 0;
}
const getCommonDislikedSubscription = async () => {
  try {
    const [users, likedMovies, dislikedMovies] = await Promise.all([getUsers(), getLikedMovies(),getDislikedMovies()]);
    const processedUsers = users.map(async user => {
      const likesCount = getMovieCount(likedMovies, user.id);
      const dislikesCount = getMovieCount(dislikedMovies, user.id);
      if (likesCount < dislikesCount) {
        const subscription = await getUserSubscriptionByUserId(user.id);
        return subscription?.subscription || '';
      }
      return null;
    });
    const subscriptions = (await Promise.all(processedUsers)).filter(subscription => subscription !== null && subscription !== '');
    if(subscriptions.length === 0) return "No subscription for people with more dislikes than likes";
    const subscriptionCounts = subscriptions.reduce((acc, sub) => {
      acc[sub] = (acc[sub] || 0) + 1;
      return acc;
    },{})
    return Object.entries(subscriptionCounts).sort((a, b) => b[1] - a[1])[0][0];
  } catch (err) {
    throw err;
  }
};

getCommonDislikedSubscription().then((subscription) => {
  console.log("Common more dislike subscription is:", subscription);
});
