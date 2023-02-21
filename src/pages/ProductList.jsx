import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useLocation } from "react-router";
import { useState } from "react";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductList = () => {
  const location = useLocation();
  const locations = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("capacity");

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters(
      {
        ...filters,
        [e.target.name]: value,
      },
      console.log(filters)
    );
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>{locations ? locations : ""}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Room:</FilterText>
          <Select name="location" onChange={handleFilters}>
            <Option disabled>location</Option>
            <Option value="jakarta">Jakarta</Option>
            <Option value="bandung">Bandung</Option>
            <Option value="bali">Bali</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="capacity">Capacity</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products location={locations} filters={filters.location} sort={sort} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
