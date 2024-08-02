'use client'
import React from 'react'
import Footer from "../../_componet/footer";
import RestaurantHeader from "../../_componet/Header";
import { useState } from "react";
import AddFoodItems from '@/app/_componet/AddFoodItem';
import FoodItemList from '@/app/_componet/FoodItemList'
import useAuth from '../../_hooks/restaurantAuth';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';



function page() {
  const [addItem, setAddItem] = useState(false)
  const authenticated = useAuth();

  if (!authenticated) {
      return null; 
  }

  return (
    <div>
      {/* <link rel="icon" href="/icon.png"/> */}
      <title>Restaurant Dashboard</title>
      <RestaurantHeader />
      {
        addItem ? <AddFoodItems setAddItem={setAddItem} /> : <FoodItemList />
      }
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
      <Stack spacing={2} direction="row"  justifyContent="center">
        <Button variant="contained" onClick={() => setAddItem(true)}>Add Food </Button>
        <Button variant="outlined" onClick={() => setAddItem(false)}>Dashboard</Button>
      </Stack>
      </div>
      <br />
      <br />
      <br />
      <br />
      <Footer/>
    </div>
  )
}

export default page
