import axios from 'axios';

const baseUrl = "http://localhost:3000"

export function getAllCountries() {
     return axios.get(baseUrl + "/countries/all"); 
}

export function getAllCategories() {
    return axios.get(baseUrl + "/categories/all");
}

export function getCategoryDescription(categoryId) {
     return axios.get(baseUrl + `/categories/${categoryId}`) 
}

export function getTopByCategory(categoryId, year, sortOrder) { 
    return axios.get(baseUrl + `/countries/${categoryId}/${year}/${sortOrder}`) 
}

export function getTimeSeriesByCategory(countryId, categoryId) {
    return axios.get(baseUrl + `/country/${countryId}/${categoryId}`)
}

export function getCrossCategoryByYear(categoryXId, categoryYId, year) {
    return axios.get(baseUrl + `/multivariate/${categoryXId}/${categoryYId}/${year}`)
}