'use client';
import { useRouter } from "next/navigation"; // Correct import for Next.js
import { useEffect, useState } from "react";
import '../styles/FooditemList.css';

const FoodItemList = () => {
    const [foodItems, setFoodItems] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const restaurantData = JSON.parse(localStorage.getItem('restaurantUser'));
        if (!restaurantData) {
            router.push("/Restaurant");
        } else {
            loadFoodItems(restaurantData._id);
        }
    }, [router]);

    const loadFoodItems = async (resto_id) => {
        try {
            let response = await fetch("http://localhost:3000/api/restaurant/food/" + resto_id);
            response = await response.json();
            if (response.success) {
                setFoodItems(response.result);
            } else {
                alert("Food item list failed to load");
            }
        } catch (error) {
            console.error("Error loading food items:", error);
            alert("Failed to load food items");
        }
    };

    const deleteFoodItem = async (id) => {
        try {
            let response = await fetch(`http://localhost:3000/api/restaurant/food/${id}`, {
                method: 'DELETE'
            });
            response = await response.json();
            if (response.success) {
                const restaurantData = JSON.parse(localStorage.getItem('restaurantUser'));
                if (restaurantData) {
                    loadFoodItems(restaurantData._id);
                }
            } else {
                alert("Failed to delete food item");
            }
        } catch (error) {
            console.error("Error deleting food item:", error);
            alert("Failed to delete food item");
        }
    };

    return (
        <div>
            <h1>Food Items List</h1>
            <table>
                <thead>
                    <tr>
                        <td>S.N</td>
                        <td>Name</td>
                        <td>Price</td>
                        <td>Description</td>
                        <td>Image</td>
                        <td>Operations</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        foodItems && foodItems.map((item, key) => (
                            <tr key={key}>
                                <td>{key + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.description}</td>
                                <td><img src={item.img_path} alt={item.name} /> </td>
                                <td>
                                    <button onClick={() => deleteFoodItem(item._id)}>Delete</button>
                                    <button onClick={() => router.push('dashboard/' + item._id)}>Edit</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default FoodItemList;
