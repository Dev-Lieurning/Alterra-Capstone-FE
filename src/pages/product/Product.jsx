import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { DeleteOutline } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { updateProduct } from "../../redux/apiCalls";

export default function Product() {
  const location = useLocation();
  const dispatch = useDispatch();
  const productId = location.pathname.split("/")[2]
    ? location.pathname.split("/")[2]
    : 1;

  const [pStats, setPStats] = useState([]);
  const [images, setImage] = useState([]);
  const [deleteImages, setDeleteImage] = useState([]);
  const [file, setFile] = useState([]);
  const [inputs, setInputs] = useState({});

  const product = useSelector((state) =>
    state.product.products.find((product) => product.id === Number(productId))
  );

  const columns = [ 
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "name",
      headerName: "Name",
      width: 600,
      
      renderCell: (params) => {
        return (
          <div className="productImg">
            <img
              className="productImg"
              src={params.row.link || ''}
              alt=""
            />
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDeleteImage(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  useEffect(() => {
    setImage(product.image);
  }, [])

  const handleDeleteImage = (id) => {
    const updImage = images.filter(image => image.id !== id);
    setDeleteImage([...deleteImages, id]);
    setImage(updImage);
  }

  const handleFiles = (e) => {
    let files = [];
    let valueFiles = e.target.files;
    for(let i = 0; i < valueFiles.length; i++) {
      files.push({
        files: e.target.files[i]
      });
    }
    setFile(files);
  }

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('id', product.id);
      formData.append('name', inputs.name || product.name);
      formData.append('type', inputs.type || product.type);
      formData.append('price', inputs.price || product.price);
      formData.append('location', inputs.location || product.location);
      formData.append('max_guest', inputs.max_guest || product.max_guest);
      formData.append('description', inputs.description || product.description);
      for(let i in file) {
        formData.append('files', file[i].files);
      }
      for(let i in deleteImages) {
        formData.append('deleteFiles', deleteImages[i]);
      }
      updateProduct(product.id, formData, dispatch)

    } catch (error) {
      console.log(error)
    }
  };

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
              src={product.image[0]?.link || ''}
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
            <input name="name" type="text" placeholder={product.name} onChange={handleChange} />
            <label>Type</label>
            <input name="type" type="text" placeholder={product.type} onChange={handleChange} />
            <label>Price</label>
            <input name="price" type="text" placeholder={product.price} onChange={handleChange} />
            <label>Location</label>
            <input name="location" type="text" placeholder={product.location} onChange={handleChange} />
            <label>Capacity</label>
            <input name="max_guest" type="text" placeholder={product.max_guest} onChange={handleChange} />
            <label>Description</label>
            <input name="description" type="textarea" placeholder={product.description} onChange={handleChange} />
            <label>Available</label>
            <select name="inStock" id="idStock">
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            <div className="addProductItem">
              <label>Image</label>
            <input type="file" name="filesImage" onChange={handleFiles} multiple />
        </div>
          </div>
          <div className="productFormRight">
            <DataGrid
              rows={images}
              rowHeight={200}
              disableSelectionOnClick
              columns={columns}
              getRowId={(row) => row.id}
              pageSize={8}
            />
            <button className="productButton" onClick = {handleUpdate}>Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
