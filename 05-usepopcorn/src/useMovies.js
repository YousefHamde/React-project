import { useEffect, useState } from "react";
const KEY = "c1c1b006";

export function useMovies(query , onCloseMovie) {

    const [movies, setMovies] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState("");




    useEffect(function () {
        // cleanUP Data Fetch
        const controller = new AbortController()
        async function fetchMovies() {
            try {
                setLoading(true)
                setError('');
                const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, { signal: controller.signal });
                // console.log(res)

                if (!res.ok) throw new Error("Something went wrong with fetching movie");


                const data = await res.json();
                // console.log(data.Search)
                if (data.Response === 'False') throw new Error("Movie not found")
                setMovies(data.Search)
                setError('');
            } catch (err) {
                console.error(err.message)
                if (err.name === 'AbortError') {
                    setError(err.message)
                }
            } finally {
                setLoading(false)
            }
        }
        if (query.length < 3) {
            setMovies([])
            setError('')
            return
        }
        onCloseMovie()
        fetchMovies();

        return function () {
            controller.abort();
        }
    }, [query ]);

    return { movies, isLoading, error }

}