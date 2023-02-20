import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import { Publish } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2]
    ? location.pathname.split("/")[2]
    : 1;
  console.log(productId);
  const [pStats, setPStats] = useState([]);
  const product = useSelector((state) =>
    state.product.products.find((product) => product.id == productId)
  );

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  // useEffect(() => {
  //   const getStats = async () => {
  //     try {
  //       const res = await userRequest.get("orders/income?pid=" + productId);
  //       const list = res.data.sort((a, b) => {
  //         return a.id - b.id;
  //       });
  //       list.map((item) =>
  //         setPStats((prev) => [
  //           ...prev,
  //           { name: MONTHS[item.id - 1], Sales: item.total },
  //         ])
  //       );
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getStats();
  // }, [productId, MONTHS]);

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={pStats} dataKey="Sales" title="Room Sales" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img
              src={product.image[0].link}
              alt=""
              className="productInfoImg"
            />
            <span className="productName">{product.name}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product.id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">type:</span>
              <span className="productInfoValue">{product.type}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Product Name</label>
            <input type="text" placeholder={product.name} />
            <label>Type</label>
            <input type="text" placeholder={product.type} />
            <label>Price</label>
            <input type="text" placeholder={product.price} />
            <label>Location</label>
            <input type="text" placeholder={product.location} />
            <label>Capacity</label>
            <input type="text" placeholder={product.max_guest} />
            <label>Description</label>
            <input type="textarea" placeholder={product.description} />
            <label>Available</label>
            <select name="inStock" id="idStock">
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img
                src={product.image[0].link}
                alt=""
                className="productUploadImg"
              />
              <label for="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button className="productButton">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
