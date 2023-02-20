import { useState } from "react";
import "./newProduct.css";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };

  const handleClick = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("data", { ...inputs });
    // const files = e.currentTarget.files;
    // for (let i = 0; i < files.length; i++) {
    //   formData.append("files", files[i]);
    // }
    // const product = formData;
    const product = { ...inputs };
    addProduct(product, dispatch);
    alert(JSON.stringify(formData));
    console.log(formData);
  };

  //  "id": 1,
  //         "name": "Kepingski",
  //         "type": "Luxury",
  //         "price": 5000000,
  //         "location": "Jakarta",
  //         "max_guest": 50,
  //         "description": "deskripsi meeting room",

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Meeting Room</h1>
      <form className="addProductForm" encType="multipart/form-data">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" name="files" onChange={handleChange} multiple />
        </div>
        <div className="addProductItem">
          <label>Name</label>
          <input
            name="name"
            type="text"
            placeholder="Insert Vendor Name"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Type</label>
          <input
            name="type"
            type="text"
            placeholder="Insert room type."
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            name="price"
            type="number"
            placeholder="100"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Location</label>
          <input
            name="location"
            type="text"
            placeholder="Hotel Location"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Capacity</label>
          <input
            name="max_guest"
            type="number"
            placeholder="100"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            name="max_guest"
            type="textarea"
            placeholder="100"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select name="inStock" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button onClick={handleClick} className="addProductButton">
          Create
        </button>
      </form>
    </div>
  );
}
