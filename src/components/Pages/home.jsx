import React, { useState, useEffect } from 'react';
import styles from './home.module.css';
import { RingLoader } from 'react-spinners';
import axios from 'axios';

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedJoke, setSelectedJoke] = useState('');

  useEffect(() => {
    async function getData() {
      const response = await axios.get("https://api.chucknorris.io/jokes/categories");
      setData(response.data);
    }
    getData();
  }, []);

  
    const fetchJoke = async (category) => {
      const response = await axios.get(`https://api.chucknorris.io/jokes/random?category=${category}`);
      setSelectedJoke(response.data.value);
    };

    
 

  
  const handleClick = (category) => {
    setSelectedCategory(category);
    fetchJoke(category);
    setPopup(true);
  };

 
  const handleNextJoke = () => {
    setLoading(true); // Show loading screen
    fetchJoke(selectedCategory)
      .then(() => setLoading(false)) // Fetch next joke and hide loading screen when done
      .catch(() => setLoading(false));
  };

 
  const closePopup = () => {
    setPopup(false);
  };

  return (
    <div className={styles.container}>
      <span>Chuck Norris</span>
      <ul>
        {data.map((category) => (
          <li key={category} onClick={() => handleClick(category)}>
            {category}
          </li>
        ))}
      </ul>

    
      {popup && (
        <div className={styles.popup}>
          <span className={styles.category}>{selectedCategory}</span>
          <span className={styles.closeButton} onClick={closePopup}>
            &times;
          </span>
          <div>
          {loading ? (
           
            <div className={styles.loadingSpinner}>
              <RingLoader color="#36D7B7" loading={loading} size={80} />
            </div>
          ) : (
           
            <p>{selectedJoke}</p>
          )}
          <button onClick={handleNextJoke} disabled={loading}>Next joke</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
