"use client";
import CustmoreHeader from "@/app/_componet/CustmoreHeader";
import { useEffect, useState } from "react";
import styles from "@/app/styles/explorePage.module.css";  
import axios from "axios";

const Page = (props) => {
    const name = props.params.name;
    const [restaurantDetails, setRestaurantDetails] = useState();
    const [foodItems, setFoodItems] = useState([]);
    // const [cartData, setCartData] = useState();
    // const [cartStorage, setCartStorage] = useState(JSON.parse(localStorage.getItem('cart')));
    // const [cartIds, setCartIds] = useState(cartStorage ? () => cartStorage.map((cartItem) => cartItem._id) : []);
    // const [removeCartData, setRemoveCartData] = useState();
    // console.log('hiiiiiiii :>> ');

    useEffect(() => {
            loadRestaurantDetails();
    }, []);

    const loadRestaurantDetails = async () => {
        const id = props.searchParams.id;
        // console.log('id', id)
        let response = await axios.get("/api/customer/" + id);
        // console.log("new",response)
        // response = await response.json();
        if (response.data.success) {
            setRestaurantDetails(response.data.details);
            setFoodItems(response.data.foodItems);
        }

    };

    // const addToCart = (item) => {
    //     let localCartIds = cartIds;
    //     localCartIds.push(item._id);
    //     setCartIds(localCartIds);
    //     setCartData(item);
    //     setRemoveCartData();
    // };

    // const removeFromCart = (id) => {
    //     setRemoveCartData(id);
    //     var localIds = cartIds.filter(item => item !== id);
    //     setCartData();
    //     setCartIds(localIds);
    // };

    return (
        <div className={styles.pageContainer}>
            {/* <CustomerHeader cartData={cartData} removeCartData={removeCartData} /> */}
            <CustmoreHeader />
            <title>{restaurantDetails?.restaurantName}</title>
            <div className={styles.restaurantPageBanner}>
                {/* <h1>{decodeURI(name)}</h1> */}
            </div>
            <div className={styles.detailsWrapper}>
                <h3>Name : {restaurantDetails?.restaurantName}</h3>
                <h4>Contact : {restaurantDetails?.restaurantContact}</h4>
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
                            {/* {cartIds.includes(item._id) ? (
                                <button className={styles.cartButton} onClick={() => removeFromCart(item._id)}>Remove From Cart</button>
                            ) : (
                                <button className={styles.cartButton} onClick={() => addToCart(item)}>Add to Cart</button>
                            )} */}
                        </div>
                    </div>
                )) : <h1>No Food Items for this Restaurant</h1>}
            </div>
        </div>
    );
};

export default Page;
