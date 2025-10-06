import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import StarRating from './StartRating';

// function Test() {
//   const [movieRating, setMovieRating] = useState(0)
//   return (
//     <div>
//       <StarRating maxRating={5} size={30} color='red' message={["Terrible", "Bad", "Okay", "Good", "Amazing"]} defaultRating={2} onSetRating={setMovieRating} />
//       <p> {movieRating}</p>
//     </div>
//   )
// }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating maxRating={7} size={35} />
    <StarRating maxRating={5} size={30} color='red' message={["Terrible", "Bad", "Okay", "Good", "Amazing"]} defaultRating={2} />
    <StarRating maxRating={5} message="not array" />
    <Test /> */}
  </React.StrictMode>
);


