import React from 'react'
import API_KEY from './API_KEY'
const request_by_id = {
    // 213: {"id":213,"url":`/discover/tv?api_key=${API_KEY}&with_networks=213`, "title":"Netflix Orignals"},
    // // fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    // // fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    // 28: {"id":28,"url":`/discover/movie?api_key=${API_KEY}&with_genres=28`,"title":"Action Movies"},
    // 12: {"id":12,"url":`/discover/movie?api_key=${API_KEY}&with_genres=12`,"title":"Adventure Movies"},
    // 16: {"id":16,"url":`/discover/movie?api_key=${API_KEY}&with_genres=16`,"title":"Animation Movies"},
    // 18: {"id":18,"url":`/discover/movie?api_key=${API_KEY}&with_genres=18`,"title":"Drama Shows & Movies"},
    // 53: {"id":53,"url":`/discover/movie?api_key=${API_KEY}&with_genres=53`,"title":"Thriller Movies"},
    // 878 : {"id":878,"url":`/discover/movie?api_key=${API_KEY}&with_genres=878`,"title":"Sci-Fi Movies"},
    // 9648: {"id":9648,"url":`/discover/movie?api_key=${API_KEY}&with_genres=9648`,"title":"Mystery Movies"},
    // 35:{"id":35,"url":`/discover/movie?api_key=${API_KEY}&with_genres=35`,"title":"Comedy Movies"},
    // 27: {"id":27,"url":`/discover/movie?api_key=${API_KEY}&with_genres=27`,"title":"Horror Movies"},
    // 10749: {"id":10749,"url":`/discover/movie?api_key=${API_KEY}&with_genres=10749`,"title":"Romance Movies"},
    // 99: {"id":99,"url":`/discover/movie?api_key=${API_KEY}&with_genres=99`,"title":"Dcoumentries"},


    213: {"url":`/discover/tv?api_key=${API_KEY}&with_networks=213`, "title":"Netflix Orignals"},
    // fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    // fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    28: {"url":`/discover/movie?api_key=${API_KEY}&with_genres=28`,"title":"Action Movies"},
    12: {"url":`/discover/movie?api_key=${API_KEY}&with_genres=12`,"title":"Adventure Movies"},
    16: {"url":`/discover/movie?api_key=${API_KEY}&with_genres=16`,"title":"Animation Movies"},
    18: {"url":`/discover/movie?api_key=${API_KEY}&with_genres=18`,"title":"Drama Shows & Movies"},
    53: {"url":`/discover/movie?api_key=${API_KEY}&with_genres=53`,"title":"Thriller Movies"},
    878 : {"url":`/discover/movie?api_key=${API_KEY}&with_genres=878`,"title":"Sci-Fi Movies"},
    9648: {"url":`/discover/movie?api_key=${API_KEY}&with_genres=9648`,"title":"Mystery Movies"},
    35:{"url":`/discover/movie?api_key=${API_KEY}&with_genres=35`,"title":"Comedy Movies"},
    27: {"url":`/discover/movie?api_key=${API_KEY}&with_genres=27`,"title":"Horror Movies"},
    10749: {"url":`/discover/movie?api_key=${API_KEY}&with_genres=10749`,"title":"Romance Movies"},
    99: {"url":`/discover/movie?api_key=${API_KEY}&with_genres=99`,"title":"Dcoumentries"},
}

export default request_by_id
