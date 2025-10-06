// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form.module.css";
import Button from "./Button";
import Spinner from "./Spinner";
import Message from "./Message";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [isLoadingGeoLocation, setIsLoadingGeoLocation] = useState(false);
  const [cityName, setCityName] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [lat, lng] = useUrlPosition();
  const [emoji, setEmoji] = useState("");
  const { emojiToCountryCode, createCity, isLoading } = useCities();
  const [errorMessage, setErrorMessage] = useState("");
  const [country, setCountry] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !country || !emoji || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat,
        lng,
      },
    };
    // return promise
    await createCity(newCity);
    navigate("/app/cities");
  }
  
  useEffect(
    function () {
      if (!lat || !lng) return;
      async function fetchGeoLocation() {
        try {
          setIsLoadingGeoLocation(true);
          setErrorMessage("");
          const response = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await response.json();
          console.log(data);
          if (!data.countryCode) {
            throw new Error("No country found for the provided coordinates");
          }
          setCityName(data.city || data.locality || "");
          setCountry(data.countryName || "");
          setEmoji(data.countryCode);
        } catch (error) {
          setErrorMessage(error.message || "Failed to fetch geolocation data");
        } finally {
          setIsLoadingGeoLocation(false);
        }
      }

      fetchGeoLocation();
    },
    [lat, lng]
  );

  if (isLoadingGeoLocation) return <Spinner />;
  if (!lat || !lng)
    return <Message message="Click on the map to select a location" />;
  if (errorMessage) return <Message message={errorMessage} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>
          <img
            className={styles.emoji}
            src={`https://flagcdn.com/w40/${emojiToCountryCode(emoji)}.png`}
          />
        </span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
