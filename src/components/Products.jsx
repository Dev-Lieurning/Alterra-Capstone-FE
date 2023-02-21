import { useEffect, useState } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ location, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          location
            ? `https://api.capstone-meeting.online/room/getAllRooms`
            : "https://api.capstone-meeting.online/room/getAllRooms"
        );
        setProducts(res.data.data);
      } catch (err) {}
    };
    getProducts();
  }, [location]);

  // useEffect(() => {
  //   setFilteredProducts(
  //     products.filter((item) =>
  //       Object.entries(filters).every(([key, value]) =>
  //         item[key].includes(value)
  //       )
  //     )
  //   );
  // }, [location, filters]);

  useEffect(() => {
    if (sort === "capacity") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.max_guest - b.max_guest)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
      {location
        ? products.map((item) => <Product item={item} key={item.id} />)
        : products
            .slice(0, 8)
            .map((item) => <Product item={item} key={item.id} />)}
    </Container>
  );
};

export default Products;
