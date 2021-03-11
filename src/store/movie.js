import axios from 'axios'
import {writable, get} from 'svelte/store'
import _unionBy from 'lodash/unionBy'
import {OMDB_API_KEY} = process.eenv

export const movies = writable([]);
export const loading = writable(false);
export const theMovie = writable({})
export const message = writable('Search for the movie title!')

export function initMovies(){
    movies.set([])
    message.set('Search for the movie title!')
    loading.set(false)
}

export async function searchMovies(payload){
    
    if(get(loading)) return
    loading.set(true)
    message.set('');

    const {title, type, year, number } = payload;
    let total = 0;

    try {
        const res = await _fetchMovie({title : title, type : type, year : year, page : 1})

        const {Search, totalResults} = res.data
        total = totalResults
        movies.set(_unionBy(Search, 'imdbID'))

    } catch (msg) {

        movies.set([])
        message.set(msg)
        loading.set(false)

        return
    }

    const pageLength = Math.ceil(total / 10 )
    if (pageLength > 1){
        for (let page = 2 ; page <= pageLength; page++){
            if (page > (number / 10)){
                break;    
            }
            const res = await _fetchMovie({title : title, type : type, year : year, page : page})
            movies.update(($movies) => _unionBy($movies, res.data.Search, 'imdbID'))
        }
    }

    loading.set(false)
}

export async function searchMovieWithId(id){
    
    if (get(loading)) return
    loading.set(true)

    const res = await _fetchMovie({id : id})

    theMovie.set(res.data)

    loading.set(false)

}

function _fetchMovie(payload){
    
    const {title, type, year, page, id} = payload

    const url = id 
        ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}&plot=full`
        : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}` 

    return new Promise(async (resolve, reject)=>{

        try {
            const res = await axios.get(url)
            console.log(res.data)
            if(res.data.Error){ // OMDb API 에러
                reject(res.data.Error)
            }
            resolve(res)
        } catch (error) {
            console.log(error.response.status)
            reject(error.message)
        }

    })

}