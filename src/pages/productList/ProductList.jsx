import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../redux/apiCalls";

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) =>
    state.product.products
      ? state.product.products
      : {
          id: 1,
          name: "Kepingski",
          type: "Luxury",
          price: 5000000,
          location: "Jakarta",
          max_guest: 50,
          description: "deskripsi meeting room",
          image: [
            {
              id: 1,
              id_room: 1,
              fileName:
                "1676560996619_QIPjjtJyOi0muydAdY3n2CjPljgHjTpi.dDYyoGW.jpeg",
              type_data: "image/jpeg",
              link: "https://capstone-project-reservation-room.s3.ap-northeast-1.amazonaws.com/1676560996619_QIPjjtJyOi0muydAdY3n2CjPljgHjTpi.dDYyoGW.jpeg",
            },
            {
              id: 2,
              id_room: 1,
              fileName: "1676560998350_IKON-.png",
              type_data: "image/png",
              link: "https://capstone-project-reservation-room.s3.ap-northeast-1.amazonaws.com/1676560998350_IKON-.png",
            },
          ],
        }
  );

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteProduct(id, dispatch);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "name",
      headerName: "name",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img
              className="productListImg"
              src={params.row.image[0].link}
              alt=""
            />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "type", headerName: "type", width: 150 },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "location",
      headerName: "location",
      width: 150,
    },
    {
      field: "max_guest",
      headerName: "max_guest",
      width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row.id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <DataGrid
        rows={products}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row.id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
