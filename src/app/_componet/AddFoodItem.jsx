import { useState } from "react";
import "../styles/AddFoodItems.css";

const AddFoodItems = (props) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [path, setPath] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState({});
    const [successMessage, setSuccessMessage] = useState("");

    const handleAddFoodItem = async () => {
        const newError = {};
        if (!name.trim()) newError.name = "Please enter a valid name";
        if (!price || price <= 0) newError.price = "Please enter a valid price";
        if (!isValidURL(path.trim())) newError.path = "Please enter a valid image path (URL)";
        if (!description.trim()) newError.description = "Please enter a valid description";

        setError(newError);
        if (Object.keys(newError).length > 0) {
            return false;
        }

        let resto_id;
        const restaurantData = JSON.parse(localStorage.getItem("restaurantUser"));
        if (restaurantData) {
            resto_id = restaurantData._id;
        }

        try {
            let response = await fetch("http://localhost:3000/api/restaurant/food", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, price: Number(price), img_path: path, description, resto_id })
            });

            response = await response.json();
            if (response.success) {
                alert("Food item added successfully")
                setSuccessMessage("Food item added successfully");
                setTimeout(() => {
                    setSuccessMessage("");
                    props.setAddItem(false);
                }, 1500);
            } else {
                setError(response.errors || { general: "Food item not added" });
            }
        } catch (error) {
            console.error("Error adding food item:", error);
            setError({ general: "An error occurred while adding the food item." });
        }
    };

    // Function to check if a string is a valid URL
    const isValidURL = (url) => {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    };

    return (
        <div className="container">
            <h1>Add New Food Item</h1>
            <div className="input-wrapper">
                <input
                    type="text"
                    className="input-field"
                    placeholder="Enter food name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {error.name && <span className="input-error">{error.name}</span>}
            </div>
            <div className="input-wrapper">
                <input
                    type="number"
                    className="input-field"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                {error.price && <span className="input-error">{error.price}</span>}
            </div>
            <div className="input-wrapper">
                <input
                    type="text"
                    className="input-field"
                    placeholder="Enter image path"
                    value={path}
                    onChange={(e) => setPath(e.target.value)}
                />
                {error.path && <span className="input-error">{error.path}</span>}
            </div>
            <div className="input-wrapper">
                <textarea
                    rows="4"
                    cols="50"
                    className="input-field"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                {error.description && <span className="input-error">{error.description}</span>}
            </div>
            <div className="input-wrapper">
                <button className="button" onClick={handleAddFoodItem}>
                    Add Food Item
                </button>
            </div>
            {error.general && <span className="input-error">{error.general}</span>}
            {successMessage && <h4 className="input-success">{successMessage}</h4>}
        </div>
    );
};

export default AddFoodItems;
