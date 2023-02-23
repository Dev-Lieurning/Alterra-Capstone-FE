import { Add, DeleteOutline, Remove } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { addProductOrder, substractProductOrder } from "../redux/cartRedux";
import ccyFormat from "../utils/RupiahFormater";

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div`
  padding: 10px;
`;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  const [status, setStatus] = useState("");
  const cart = useSelector((state) => state.cart);
  const history = useHistory();
  const dispatch = useDispatch();
  let reservation = useSelector(
    (state) => state.reservation.currentReservation
  );
  const handlaPay = async () => {
    try {
      const res = await userRequest.post("/payment/checkout", {
        id_reservation: reservation.id,
        amount: reservation.total_price,
      });
      console.log(res);
      window.open(res.data.data.invoiceUrl);
      setStatus(res.data.data.status);
    } catch (err) {
      alert(err);
    }
  };

  const handleStatus = async () => {
    try {
      const res = await userRequest.get("/payment/getAllPayments");
      let paymentstatus = res.data.data;
      let test = paymentstatus.find(
        (item) => (item.id_reservation = reservation.id)
      );
      setStatus(test.status);
    } catch (error) {
      alert(error);
    }
  };
  // const handlaPay = async () => {
  //   try {
  //     const res = await axios.post(
  //       "https://api.capstone-meeting.online/auth/login",
  //       {
  //         email: "admin@gmail.com",
  //         password: "admin123",
  //       }
  //     );
  //     console.log(reservation);
  //     // window.open(res.data.data.invoiceUrl);
  //     console.log("ANJING SAMPE SUBUH" + JSON.stringify(res));
  //   } catch (err) {
  //     alert(err);
  //   }
  // };

  let price = cart.price;
  let quantity = cart.quantity;

  const handleSubstractQty = () => {
    dispatch(substractProductOrder({ price, quantity }));
  };
  const handleAddQty = () => {
    dispatch(addProductOrder({ price, quantity }));
  };

  useEffect(() => {
    handleStatus();
  }, [cart.total, history]);
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BOOK</Title>

        <Top>
          <Link to={`/`}>
            <TopButton>CONTINUE BOOKING</TopButton>
          </Link>
          {/* <TopTexts>
            <TopText>Booking list(2)</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts> */}
          {/* <TopButton type="filled">CHECKOUT NOW</TopButton> */}
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product) => (
              <Product>
                <ProductDetail>
                  <Image src={product.image ? product.image[0].link : ""} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.name}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product.id}
                    </ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize>
                      <b>Type:</b> {product.type}
                    </ProductSize>
                    <ProductSize>
                      <b>Date:</b>{" "}
                      {product.startDate + " until " + product.endDate}
                    </ProductSize>
                    <ProductSize>
                      <b>Status:</b> {status}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    {/* <Add onClick={handleAddQty} /> */}
                    <ProductAmount>
                      {reservation.number_of_persons} pax
                    </ProductAmount>
                    {/* <Remove onClick={handleSubstractQty} /> */}
                  </ProductAmountContainer>
                  <ProductPrice>
                    IDR {ccyFormat(reservation.total_price)}
                  </ProductPrice>
                </PriceDetail>
                {/* <DeleteOutline
                  className="productListDelete"
                  // onClick={() => handleDelete(params.row.id)}
                /> */}
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>
                IDR {ccyFormat(reservation.total_price)}
              </SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Cleaning Service</SummaryItemText>
              <SummaryItemPrice>IDR 250.000,00.</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Discount</SummaryItemText>
              <SummaryItemPrice>
                IDR {ccyFormat(reservation.total_price / 10)}
              </SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>
                IDR{" "}
                {ccyFormat(cart.total - reservation.total_price / 10 + 250000)}
              </SummaryItemPrice>
            </SummaryItem>
            <Button
              onClick={handlaPay}
              disabled={status === "PAID" ? true : false}
            >
              PAY NOW
            </Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
