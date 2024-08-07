"use client";
import CustmoreHeader from "./_componet/CustmoreHeader";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import axios from "axios";

export default function Home() {
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showLocation, setShowLocation] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    loadLocations();
    loadRestaurants();
  }, []);

  const loadLocations = async () => {
    let response = await fetch("/api/customer/locations");
    const data = await response.json(); // Add this line to parse JSON
    if (data.success) {
      setLocations(data.result); // Fix response key
    }
  };

  const loadRestaurants = async (params) => {
    let url = "/api/customer";
    if (params?.location) {
      url = url + "?location=" + params.location;
    } else if (params?.restaurant) {
      url = url + "?restaurant=" + params.restaurant;
    }
    let response = await fetch(url);
    response = await response.json();
    if (response.success) {
      setRestaurants(response.result);
    } else {
      console.error("Failed to load restaurants:", response.message);
    }
  };

  const handleListItem = (item) => {
    setSelectedLocation(item);
    setShowLocation(false);
    loadRestaurants({ location: item });
  };

  return (
    <main>
      <CustmoreHeader />
      <title>Food Delivery web App</title>
      <div className={styles.mainpagebanner}>
        <h1>Food Delivery App</h1>
        <div className={styles.inputwrapper}>
          <input
            type="text"
            value={selectedLocation}
            onChange={(event) => setSelectedLocation(event.target.value)} // Add onChange handler
            onClick={() => setShowLocation(true)}
            className={styles.selectinput}
            placeholder="Select Place"
          />
          <ul className={styles.locationlist}>
            {showLocation &&
              locations.map((item, index) => (
                <li key={index} onClick={() => handleListItem(item)}>
                  {item}
                </li>
              ))}
          </ul>
          <input
            type="text"
            className={styles.searchinput}
            onChange={(event) => loadRestaurants({ restaurant: event.target.value })} // Add onChange handler
            placeholder="Enter Restaurant name"
          />
        </div>
      </div>

      <div className={styles.restaurantlistcontainer}>
        {restaurants.map((item) => (
          <div
            key={item._id}
            onClick={() => router.push('explore/'+item.restaurantName+"?id="+item._id)}
            className={styles.restaurantwrapper}
          >
            <div className={styles.headingwrapper}>
              <h3>{item.restaurantName}</h3>
              <br />
              <h5>Contact: {item.restaurantContact}</h5>
              <h5>City: {item.city}</h5>
            </div>
            <div className={styles.addresswrapper}>
              <div className="address">Location : {item.address}</div>
              <div className="address">Email: {item.email}</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
