'use client'
import React from 'react'
import RestaurantHeader from "../../_componet/Header";
import Footer from "../../_componet/footer";
import { useState } from "react";
import AddFoodItems from '@/app/_componet/AddFoodItem';
import FoodItemList from '@/app/_componet/FoodItemList'
function page() {
  const [addItem, setAddItem] = useState(false)
  return (
    <div>
      <RestaurantHeader />
      <link rel="icon" href="/icon.png"/>
        <title>Restaurant Dashboard</title>
        <button onClick={() => setAddItem(true)} >Add Food </button>
        <button onClick={() => setAddItem(false)}>Dashboard</button>
        {
            addItem ? <AddFoodItems setAddItem={setAddItem} /> : <FoodItemList />
        }
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
          <Footer />
    </div>
  )
}

export default page
