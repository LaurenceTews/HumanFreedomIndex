"use strict";
const { Pool } = require('pg');
const express = require('express');
const app = express();

const pool = new Pool({
    user: 'dbuser',
    host: 'localhost', 
    database: 'hfidb',
    password: 'dbpass',
    port: 5432,
})


app.use(function(req, res, next) {
    // change this to client IP in production
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


const getCountryByCategory = (request, response) => {
    let category = request.params['categoryID'];
    let sortOrder = request.params['sortOrder'];
    let year = request.params['year'];
    let query = `SELECT country, ${category} 
        FROM hfi_data WHERE year='${year}' AND ${category} IS NOT NULL
        ORDER BY ${category} ${sortOrder} LIMIT 10;`;

    pool.query(query, (error, results) => {
        if(error) {
            console.log(error)
        }
        response.status(200).json(results.rows);
    })
}

const  getCategoryByCountry = (request, response) => {
    let country = request.params['countryID']
    let category = request.params['categoryID']
    let query = `SELECT year, ${category} 
    FROM hfi_data 
    WHERE country='${country}'
    AND ${category} IS NOT NULL
    ORDER BY year;`;
    
    pool.query(query, (error, results) => {
        if(error) {
            console.log(error)
        } 
        response.status(200).json(results.rows)
    })
}

const getMultivariateData = (request, response) => {
    let categoryX = request.params['categoryXID']
    let categoryY = request.params['categoryYID']
    let year = request.params['year']
    let query = `SELECT country, ${categoryX}, ${categoryY} FROM hfi_data WHERE year='${year}';`

    pool.query(query, (error, results) => {
        if(error) {
            console.log(error)
        }
        response.status(200).json(results.rows)
    })
}

const getAllCountries = (request, response) => {
    pool.query(`SELECT DISTINCT country FROM hfi_data ORDER BY country ASC;`, (error, results) => {
        if(error) {
            console.log(error)
        }
        response.status(200).json(results.rows)
    })
}

const getCategories = (request, response) => {
    pool.query('SELECT categoryid, shortdescription, longdescription FROM hfi_descriptions;', (error, results) => {
        if (error) {
          console.log(error)
        }
        response.status(200).json(results.rows)
      })
}

const getCategoryDescriptions = (request, response) => {
    let categoryId = request.params['categoryId']
    let query = `SELECT categoryid, shortdescription, longdescription 
        FROM hfi_descriptions 
        WHERE categoryid = '${categoryId}';`

    pool.query(query, (error, results) => {
        if (error) {
          console.log(error)
        }
        response.status(200).json(results.rows)
      })
}

app.get("/countries/all", getAllCountries)
app.get("/countries/:categoryID/:year/:sortOrder", getCountryByCategory) 

app.get("/categories/all", getCategories)
app.get("/categories/:categoryId", getCategoryDescriptions)

app.get("/multivariate/:categoryXID/:categoryYID/:year", getMultivariateData)

app.get("/country/:countryID/:categoryID", getCategoryByCountry)

app.get('/', (request, response) => {
    response.json({ info: 'Human Freedom Index Express/PostgreSQL API' })
  })


app.listen(3000, () => console.log('listening on port 3000'));