'use client'
import CustmoreHeader from './_componet/CustmoreHeader'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';


export default function Home() {
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState('');
  const [showLocation, setShowLocation] = useState(false);
  // const [restaurants, setRestaurants] = useState([]);
  // const [locations, setLocations] = useState([]);

  // Function to handle selecting a location
  const handleListItem = (location) => {
    setSelectedLocation(location);
    setShowLocation(false);
  };
  const loadRestaurants = (searchQuery) => {
    console.log('Searching for:', searchQuery);
  };
  return (
    <main>
      <CustmoreHeader />
    <title>Home</title>
      <div className={styles.mainpagebanner}>
        <h1>Food Delivery App</h1>
        <div className={styles.inputwrapper}>
          <input
            type="text"
            value={selectedLocation}
            onClick={() => setShowLocation(true)}
            className={styles.selectinput}
            placeholder="Select Place"
          />
          {/* <ul className={styles.locationlist}>
            {showLocation &&
              locations.map((item, index) => (
                <li key={index} onClick={() => handleListItem(item)}>
                  {item}
                </li>
              ))}
          </ul> */}
          <input
            type="text"
            className={styles.searchinput}
            onChange={(event) => loadRestaurants(event.target.value)}
            placeholder="Enter food or restaurant name"
          />
        </div>
      </div>
{/* 
      <div className={styles.restaurantlistcontainer}>
        {restaurants.map((item) => (
          <div
            key={item._id}
            onClick={() => router.push(`/explore/${item.name}?id=${item._id}`)}
            className={styles.restaurantwrapper}
          >
            <div className={styles.headingwrapper}>
              <h3>{item.name}</h3>
              <h5>Contact: {item.contact}</h5>
            </div>
            <div className={styles.addresswrapper}>
              <div>{item.city},</div>
              <div className="address">
                {item.address}, Email: {item.email}
              </div>
            </div>
          </div>
        ))}
      </div> */}
      {/* <Footer /> */}
    </main>
  );
};