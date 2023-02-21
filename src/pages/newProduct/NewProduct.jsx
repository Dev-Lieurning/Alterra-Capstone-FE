import { useState } from "react";
import "./newProduct.css";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState([]);
  // const [cat, setCat] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleFiles = (e) => {
    let files = [];
    for(let i = 0; i < e.target.files.length; i++) {
      files.push({
        files: e.target.files[i]
      });
    }
    setFile(files);
  }
  
  // const handleCat = (e) => {
  //   setCat(e.target.value.split(","));
  // };

  const handleClick = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('name', inputs.name || '');
    formData.append('type', inputs.type || '');
    formData.append('price', inputs.price || 0);
    formData.append('location', inputs.location || '');
    formData.append('max_guest', inputs.max_guest || 0);
    formData.append('description', inputs.description || '');
    for(let i in file) {
      formData.append('files', file[i].files);
    }

    addProduct(formData, dispatch);
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Meeting Room</h1>
      <form className="addProductForm" encType="multipart/form-data">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" name="files" onChange={handleFiles} multiple />
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
            name="description"
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
