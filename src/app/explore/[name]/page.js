"use client";
import CustomerHeader from "@/app/_componet/CustmoreHeader";
import { useEffect, useState } from "react";
import styles from "@/app/styles/explorePage.module.css";
import axios from "axios";

const Page = (props) => {
    const name = props.params.name;
    // console.log('name :>> ', name);
    const [restaurantDetails, setRestaurantDetails] = useState();
    const [foodItems, setFoodItems] = useState([]);
    const [cartData, setCartData] = useState();
    const [cartStorage, setCartStorage] = useState(null);
    const [cartIds, setCartIds] = useState([]);
    const [removeCartData, setRemoveCartData] = useState();

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart'));
        setCartStorage(storedCart);
        if (storedCart) {
            setCartIds(storedCart.map((cartItem) => cartItem._id));
        }
    }, []);

    useEffect(() => {
        if (props.cartData) {
            if (cartData && cartData[0].resto_id !== props.cartData.resto_id) {
                localStorage.removeItem('cart');
                setCartData([props.cartData]);
                localStorage.setItem('cart', JSON.stringify([props.cartData]));
            } else {
                const updatedCart = cartData ? [...cartData, props.cartData] : [props.cartData];
                setCartData(updatedCart);
                localStorage.setItem('cart', JSON.stringify(updatedCart));
            }
        }
    }, [props.cartData]);

    useEffect(() => {
        loadRestaurantDetails();
    }, []);

    const loadRestaurantDetails = async () => {
        try {
            const id = props.searchParams.id;
            const response = await axios.get(`/api/customer/${id}`);
            if (response.data.success) {
                setRestaurantDetails(response.data.details);
                setFoodItems(response.data.foodItems);
            }
        } catch (error) {
            console.error("Error fetching restaurant details:", error);
        }
    };

    const addToCart = (item) => {
        const updatedCartIds = [...cartIds, item._id];
        setCartIds(updatedCartIds);
        setCartData(item);
        setRemoveCartData();
    };

    const removeFromCart = (id) => {
        const updatedCartIds = cartIds.filter(itemId => itemId !== id);
        setCartIds(updatedCartIds);
        setRemoveCartData(id);
    };

    return (
        <div className={styles.pageContainer}>
            <CustomerHeader cartData={cartData} removeCartData={removeCartData} />
            <title>{restaurantDetails?.restaurantName}</title>
            <div className={styles.mainpagebanner}>
                {/* Banner content */}
            </div>
            <div className={styles.detailsWrapper}>
                <h3>Name: {restaurantDetails?.restaurantName}</h3>
                <h4>Contact: {restaurantDetails?.restaurantContact}</h4>
                <h4>City: {restaurantDetails?.city}</h4>
                <h4>Address: {restaurantDetails?.address}</h4>
                <h4>Email: {restaurantDetails?.email}</h4>
            </div>
            <div className={styles.foodListWrapper}>
                {foodItems.length > 0 ? foodItems.map((item) => (
                    <div key={item._id} className={styles.listItem}>
                        <div>
                            <img className={styles.foodImage} src={item.img_path} alt={item.name} />
                        </div>
                        <div className={styles.foodDetails}>
                            <div className={styles.foodName}>{item.name}</div>
                            <div className={styles.foodPrice}>{item.price}</div>
                            <div className={styles.description}>{item.description}</div>
                            {cartIds.includes(item._id) ? (
                                <button className={styles.cartButton} onClick={() => removeFromCart(item._id)}>Remove from Cart</button>
                            ) : (
                                <button className={styles.cartButton} onClick={() => addToCart(item)}>Add to Cart</button>
                            )}
                        </div>
                    </div>
                )) : <h1>No Food Items for this Restaurant</h1>}
            </div>
        </div>
    );
};

export default Page;
