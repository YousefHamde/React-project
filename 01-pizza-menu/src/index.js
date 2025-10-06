import React from 'react';
import ReactDOM from 'react-dom/client';
import './indexx.css';

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];


function App() {
  return <div className='container'>
    <Header />
    <Menu />
    <Footer />
  </div>
}

function Header() {
  return <header className='header'>
    <h1>fast react pizza co. </h1>
  </header>
}




// conditional rendering  with &&
/*
function Menu() {
  const pizzas = pizzaData;
  const numPizza = pizzas.length;
  console.log(numPizza)
  return <div className='menu'>
    <h2>our menu</h2>
    <p></p>
    {numPizza > 0 &&
      (<ul className='pizzas'>
        {pizzas.map(pizza =>
          <Pizza pizzaObj={pizza} key={pizza.name} />
        )}
      </ul>)
    }
  </div>
}
  */

// conditional rendering  with ternaries
function Menu() {
  const pizzas = pizzaData;
  // const pizzas = [];
  const numPizza = pizzas.length;
  console.log(numPizza)

  return <div className='menu'>
    <h2>our menu</h2>
    {numPizza > 0 ?
      (<ul className='pizzas'>
        {pizzas.map(pizza =>
          <Pizza pizzaObj={pizza} key={pizza.name} />
        )}
      </ul>) :
      (
        <p>We're still working our menu. please come back later :</p>
      )
    }
  </div>
}

function Pizza({ pizzaObj }) {
  // conditional rendering  with  multiple returns
  // if (pizzaObj.soldOut) return null;

  return (
    <li className={`pizza  ${pizzaObj.soldOut ? 'sold-out' : ''}`}>
      <img src={pizzaObj.photoName} alt='pizza focaccia' />
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>
        <span>{pizzaObj.soldOut ? "SOLD OUT" : pizzaObj.price}</span>
      </div>
    </li >
  )
}


// destruction props
function Order({ closeHour, openHour }) {
  <div className='order'>
    <p>We're open from {openHour}:00 to {closeHour}:00. come visit us or order online.</p>
    <button className='btn'>order</button>
  </div>
}
// conditional rendering  with ternaries
function Footer() {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;
  console.log(isOpen)
  return <footer className='footer'>
    {isOpen ? <Order closeHour={closeHour} openHour={openHour} /> :
      (
        <p>We're happy to welcome you between {openHour}:00 and {closeHour}:00 .</p>
      )
    }
  </footer>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


