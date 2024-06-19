'use client'
import { useRouter } from "next/router"; // Correct import for Next.js
import { useEffect, useState } from "react";
import '../styles/FooditemList.css'

const FoodItemList = () => {
    const [foodItems, setFoodItems] = useState([]);
    // const router = useRouter();

    // useEffect(() => {
    //     loadFoodItems();
    // }, []);

    // const loadFoodItems = async () => {
    //     const restaurantData = JSON.parse(localStorage.getItem('restaurantUser'));
    //     const resto_id = restaurantData._id;
    //     try {
    //         let response = await fetch(`http://localhost:3000/api/restaurant/foods/${resto_id}`);
    //         response = await response.json();
    //         if (response.success) {
    //             setFoodItems(response.result);
    //         } else {
    //             alert("Food item list failed to load");
    //         }
    //     } catch (error) {
    //         console.error("Error loading food items:", error);
    //         alert("Failed to load food items");
    //     }
    // };

    // const deleteFoodItem = async (id) => {
    //     try {
    //         let response = await fetch(`http://localhost:3000/api/restaurant/foods/${id}`, {
    //             method: 'DELETE'
    //         });
    //         response = await response.json();
    //         if (response.success) {
    //             loadFoodItems();
    //         } else {
    //             alert("Failed to delete food item");
    //         }
    //     } catch (error) {
    //         console.error("Error deleting food item:", error);
    //         alert("Failed to delete food item");
    //     }
    // };

    return (
        <div className="food-item-list">
            <h1>Food Items</h1>
            <table>
                <thead>
                    <tr>
                        <th>S.N</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {foodItems.map((item, index) => (
                        <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.description}</td>
                            <td><img src={item.img_path} alt={item.name} /></td>
                            <td>
                                <button onClick={() => deleteFoodItem(item._id)}>Delete</button>
                                <button onClick={() => router.push(`/dashboard/${item._id}`)}>Edit</button>
                            </td>
                        </tr>
                    ))} */}
                </tbody>
            </table>
        </div>
    );
};

export default FoodItemList;
