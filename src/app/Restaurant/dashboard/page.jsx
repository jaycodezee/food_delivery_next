'use client'
import React from 'react'
import RestaurantHeader from "../../_componet/Header";
import Footer from "../../_componet/footer";
import { useState } from "react";
import AddFoodItems from '@/app/_componet/AddFoodItem';
import FoodItemList from '@/app/_componet/FoodItemList'
import useAuth from '../../_hooks/useAuth';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';



function page() {
  const [addItem, setAddItem] = useState(false)
  // const authenticated = useAuth();

  // if (!authenticated) {
  //     return null; 
  // }

  return (
    <div>
      <RestaurantHeader />
      {/* <link rel="icon" href="/icon.png"/> */}
      <title>Restaurant Dashboard</title>
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
      <Footer />
    </div>
  )
}

export default page
