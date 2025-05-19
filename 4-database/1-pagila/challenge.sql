
/*
    Challenge 1.
    Write a SQL query that counts the number of films in each category in the Pagila database.
    - The query should return two columns: category and film_count
    - category should display the name of each category
    - film_count should show the total number of films in that category
    - Results should be grouped by category name
 */
SELECT c.name category, COUNT(fc.film_id) film_count
FROM category c
JOIN film_category fc ON c.category_id = fc.category_id
GROUP BY c.name
ORDER BY c.name;

-- your query here


 /*
    Challenge 2.
    Write a SQL query that finds the top 5 customers who have spent the most money in the Pagila database.
    - The query should return three columns: first_name, last_name, and total_spent
    - total_spent should show the sum of all payments made by that customer
    - Results should be ordered by total_spent in descending order
    - The query should limit results to only the top 5 highest-spending customers
 */

 -- your query here

SELECT c.first_name, c.last_name, SUM(p.amount) total_spent
FROM customer c
JOIN payment p ON c.customer_id = p.customer_id
GROUP BY c.customer_id, c.first_name, c.last_name
ORDER BY total_spent DESC
LIMIT 5;


/*
    Challenge 3.
    Write a SQL query that lists all film titles that have been rented in the past 10 years in the Pagila database.
    - The query should return one column: title
    - title should display the name of each film that has been rented
    - The time period for "recent" should be within the last 10 years from the current date
    - Results should only include films that have rental records in this time period
*/


-- your query here

SELECT DISTINCT f.title
FROM film f
JOIN inventory i ON f.film_id = i.film_id
JOIN rental r ON i.inventory_id = r.inventory_id
WHERE r.rental_date >= CURRENT_DATE - INTERVAL '10 years'
ORDER BY f.title;

/*
    Challenge 4.
    Write a SQL query that lists all films that have never been rented in the Pagila database.
    - The query should return two columns: title and inventory_id
    - title should display the name of each film that has never been rented
    - inventory_id should show the inventory ID of the specific copy
*/


SELECT f.title, i.inventory_id
FROM film f
JOIN inventory i ON f.film_id = i.film_id
LEFT JOIN rental r ON i.inventory_id = r.inventory_id
WHERE r.rental_id IS NULL
ORDER BY f.title;



/*
    Challenge 5.
    Write a SQL query that lists all films that were rented more times than the average rental count per film in the Pagila database.
    - The query should return two columns: title and rental_count
    - title should display the name of each film
    - rental_count should show the total number of times the film was rented
*/
WITH film_rentals AS (
    SELECT f.film_id, f.title, COUNT(r.rental_id) rental_count
    FROM film f
    JOIN inventory i ON f.film_id = i.film_id
    JOIN rental r ON i.inventory_id = r.inventory_id
    GROUP BY f.film_id, f.title
)
SELECT title, rental_count
FROM film_rentals
WHERE rental_count > (SELECT AVG(rental_count) FROM film_rentals)
ORDER BY rental_count DESC;


-- your query here

/*
    Challenge 6.
    Write a SQL query that calculates rental activity for each customer.
    - The query should return the customer's first_name and last_name
    - It should also return their first rental date as first_rental
    - Their most recent rental date should be shown as last_rental
    - The difference in days between the first and last rentals should be shown as rental_span_days
    - Results should be grouped by customer and ordered by rental_span_days in descending order
*/
SELECT 
    c.first_name, 
    c.last_name,
    MIN(r.rental_date) AS first_rental,
    MAX(r.rental_date) AS last_rental,
    (MAX(r.rental_date) - MIN(r.rental_date)) rental_span_days
FROM customer c
JOIN rental r ON c.customer_id = r.customer_id
GROUP BY c.customer_id, c.first_name, c.last_name
ORDER BY rental_span_days DESC;
-- your query here

/*
    Challenge 7.
    Find all customers who have not rented movies from every available genre.
    - The result should include the customer's first_name and last_name
    - Only include customers who are missing at least one genre in their rental history
*/


-- your query here
WITH customer_genre_count AS (
    SELECT
        r.customer_id,
        COUNT(DISTINCT cat.category_id) AS genres_rented
    FROM rental r
    JOIN inventory i ON r.inventory_id = i.inventory_id
    JOIN film f ON i.film_id = f.film_id
    JOIN film_category fc ON f.film_id = fc.film_id
    JOIN category cat ON fc.category_id = cat.category_id
    GROUP BY r.customer_id
),
total_genres AS (
    SELECT COUNT(DISTINCT category_id) AS total_genres
    FROM category
)
SELECT c.first_name, c.last_name
FROM customer c
JOIN customer_genre_count cg ON c.customer_id = cg.customer_id
JOIN total_genres tg ON cg.genres_rented < tg.total_genres;
/*
    Bonus Challenge 8 (opt)
    Find the Top 3 Most Frequently Rented Films in Each Category and Their Total Rental Revenue.
    - The result should include the film title, category name, rental count, and total revenue
    - Only the top 3 films per category should be returned
    - Results should be ordered by category and ranking within the category
*/


-- your query here

WITH ranked_films AS (
    SELECT
        cat.name AS category,
        ARRAY_AGG(
            STRUCT(
                f.title,
                COUNT(r.rental_id) AS rental_count,
                SUM(p.amount) AS total_revenue
            )
            ORDER BY COUNT(r.rental_id) DESC, SUM(p.amount) DESC
            LIMIT 3
        ) AS top_films
    FROM category cat
    JOIN film_category fc ON cat.category_id = fc.category_id
    JOIN film f ON fc.film_id = f.film_id
    JOIN inventory i ON f.film_id = i.film_id
    JOIN rental r ON i.inventory_id = r.inventory_id
    JOIN payment p ON r.rental_id = p.rental_id
    GROUP BY cat.name
)
SELECT
    category,
    film.title,
    film.rental_count,
    film.total_revenue
FROM ranked_films
CROSS JOIN UNNEST(top_films) AS film
ORDER BY category, film.rental_count DESC;

