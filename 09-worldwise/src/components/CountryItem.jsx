import { useCities } from "../contexts/CitiesContext";
import styles from "./CountryItem.module.css";

function CountryItem({ country }) {
  const { emojiToCountryCode } = useCities();

  return (
    <li className={styles.countryItem}>
      {/* <span>{emojiToCountryCode(country.emoji)}</span> */}
        <img className={styles.emoji} src={`https://flagcdn.com/w40/${emojiToCountryCode(country.emoji)}.png`} />
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
