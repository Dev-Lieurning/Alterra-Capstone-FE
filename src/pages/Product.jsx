import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest, userRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname ? location.pathname.split("/")[2] : 7;
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const dispatch = useDispatch();
  let user = useSelector((state) => state.user.currentUser);

  const user2 = JSON.parse(localStorage.getItem("persist:root"))?.user;
  // const currentUser = user2 && JSON.parse(user).data;
  const TOKEN = JSON.parse(user2).currentUser;

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/room/getRoom/" + id);
        setProduct(res.data.data);
        console.log(TOKEN);
      } catch (err) {
        // alert(err);
      }
    };
    getProduct();
  }, [id, startDate, quantity, user]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const dateOnChange = (date) => {
    const startDate = date[0];
    console.log("Start Date:", startDate);
    setStartDate(startDate);
    const endDate = date[1];
    console.log("End Date:", endDate);
    setEndDate(endDate);
  };

  const handleReserve = async () => {
    try {
      const res = await userRequest.post("/reservation/addReservation", {
        id_room: product.id,
        id_user: user.id_user,
        number_of_persons: quantity,
        total_price: quantity * product.price,
        check_in: startDate,
        check_out: endDate,
        status: "status belum dibayar",
      });
      console.log("Sukses buat reservasi" + res);
    } catch (err) {
      console.log(JSON.stringify(err));
    }
  };

  const handleClick = () => {
    dispatch(addProduct({ ...product, quantity, startDate, endDate }));
    handleReserve();
  };
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image
            src={
              "https://capstone-project-reservation-room.s3.ap-northeast-1.amazonaws.com/1676976301207_kempinski-hotel-guiyang.jpg"
            }
          />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.name}</Title>
          <Desc>{product.description}</Desc>
          <Price>IDR {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Capacity:{product.max_guest}</FilterTitle>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <FilterTitle>Attendant :</FilterTitle>
              <Remove onClick={() => handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantity("inc")} />
            </AmountContainer>
          </AddContainer>
          <div
            style={{
              display: "block",
              width: 600,
              paddingTop: 10,
            }}
          >
            <DateRangePicker
              format="yyyy-MM-dd HH:mm:ss"
              defaultCalendarValue={[
                new Date("2022-02-01 00:00:00"),
                new Date("2022-05-01 23:59:59"),
              ]}
              onOk={dateOnChange}
              style={{ width: 250, paddingBottom: 10 }}
              placeholder="Select Date Range"
            />
          </div>
          <Button onClick={handleClick}>ADD TO BOOK</Button>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
