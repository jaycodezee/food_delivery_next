import CustomerHeader from "../_componet/CustmoreHeader.js"

export default function RestaurantLayout({
    children, // will be a page or nested layout
  }) {
    return (
      <section>
        <CustomerHeader />
        {children}
      </section>
    )
  }