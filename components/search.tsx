import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../styles/Search.module.css';

interface SearchProps {
  categories: string[];
}

export const Search: React.FC<SearchProps> = ({
  categories = [],
}) =>
  <>
    <div className={styles.search}>
      <FontAwesomeIcon icon={faMagnifyingGlass} width={14} height={14} />
      <input className={styles.searchInput} type="text" placeholder="search" />
    </div>
    {categories.length > 0 && (
      <div className={styles.categories}>
        {categories.map(category => (
          <button type="button" className={styles.category}>
            {category}
          </button>
        ))}
      </div>
    )}
  </>;

export default Search;
