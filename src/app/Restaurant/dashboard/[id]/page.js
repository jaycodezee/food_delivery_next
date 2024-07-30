'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import RestaurantHeader from "../../../_componet/Header";
import '../../../styles/AddFoodItems.css';
const EditFoodItems = (props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [path, setPath] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false)
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    handleLoadFoodItem();
}, [])

  const handleLoadFoodItem = async () => {
    let response = await fetch("/api/restaurant/food/edit/" + props.params.id);
    response = await response.json();
    if (response.success) {
        // console.log(response.result);
        setName(response.result.name)
        setPrice(response.result.price)
        setPath(response.result.img_path)
        setDescription(response.result.description)
    }
}
    const handleEditFoodItem = async () => {
        const newError = {};
        if (!name.trim()) newError.name = 'Please enter a valid name';
        if (!price || price <= 0) newError.price = 'Please enter a valid price';
        if (!isValidURL(path.trim())) newError.path = 'Please enter a valid image path (URL)';
        if (!description.trim()) newError.description = 'Please enter a valid description';

        setError(newError);
        if (Object.keys(newError).length > 0) {
            return false;
        }

        try {
            let response = await fetch("/api/restaurant/food/edit/" + props.params.id,{
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, price: Number(price), img_path: path, description }),
            });

            response = await response.json();
            if (response.success) {
                setSuccessMessage('Food item updated successfully');
                setTimeout(() => {
                  setSuccessMessage('')
                    router.push('/Restaurant/dashboard'); 
                }, 800);
            } else {
                setError(response.errors || { general: 'Food item not updated' });
            }
        } catch (error) {
            console.error('Error updating food item:', error);
            setError({ general: 'An error occurred while updating the food item.' });
        }
    };

    const isValidURL = (url) => {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    };

    return (
        <div className='container'>
            <RestaurantHeader />
            <h1>Edit Food Item</h1>
            <div className='input-wrapper'>
                <input
                    type='text'
                    className='input-field'
                    placeholder='Enter food name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {error.name && <span className='input-error'>{error.name}</span>}
            </div>
            <div className='input-wrapper'>
                <input
                    type='number'
                    className='input-field'
                    placeholder='Enter price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                {error.price && <span className='input-error'>{error.price}</span>}
            </div>
            <div className='input-wrapper'>
                <input
                    type='text'
                    className='input-field'
                    placeholder='Enter image path'
                    value={path}
                    onChange={(e) => setPath(e.target.value)}
                />
                {error.path && <span className='input-error'>{error.path}</span>}
            </div>
            <div className='input-wrapper'>
                <textarea
                    rows='4'
                    cols='50'
                    className='input-field'
                    placeholder='Enter description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                {error.description && <span className='input-error'>{error.description}</span>}
                {successMessage && <h4 className='input-success'>{successMessage}</h4>}
            </div>
            <div className='input-wrapper'>
                <button className='button' onClick={handleEditFoodItem}>
                    Update Food Item
                </button>
            </div>
            <div className="input-wrapper">
            <button className="button" onClick={() => router.push('../dashboard')}>Back To Food Item </button>
        </div>
        </div>
    );
};

export default EditFoodItems;
