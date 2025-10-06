import React from "react";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

export default function CityItem({ city }) {
  const { date, cityName, emoji, id, position } = city;

  const { emojiToCountryCode , currentCity ,deleteCity } = useCities();

  function handleClick(e) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${currentCity.id === id ? styles['cityItem--active'] : ""} `}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        {/* <span className={styles.emoji}>{toFlagEmoji(emoji)}</span> */}
        <img
          className={styles.emoji}
          src={`https://flagcdn.com/w40/${emojiToCountryCode(emoji)}.png`}
        />
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleClick} >&times;</button>
      </Link>
    </li>
  );
}
