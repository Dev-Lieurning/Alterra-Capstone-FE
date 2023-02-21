import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addUser } from "../../redux/apiCalls";
import "./newUser.css";

export default function NewUser() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [file, setFile] = useState({});
  const [inputs, setInputs] = useState([]);

  const handleFiles = (e) => {
    let files = [];
    let valueFiles = e.target.files;
    for (let i = 0; i < valueFiles.length; i++) {
      files.push({
        files: e.target.files[i],
      });
    }
    setFile(files);
  };

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", inputs.name || "");
      formData.append("email", inputs.email || "");
      formData.append("phone", inputs.phone || "");
      formData.append("address", inputs.address || "");
      formData.append("password", inputs.password || "");
      for (let i in file) {
        formData.append("files", file[i].files);
      }

      addUser(formData, dispatch);
      history.push(`/users`)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        {/* <div className="newUserItem">
          <label>Username</label>
          <input type="text" placeholder="john" />
        </div> */}
        <div className="newUserItem">
          <label>Full Name</label>
          <input
            type="text"
            placeholder=""
            name="name"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input
            type="email"
            placeholder=""
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input
            type="password"
            placeholder=""
            name="password"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input
            type="text"
            placeholder=""
            name="phone"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Address</label>
          <input
            type="text"
            placeholder=""
            name="address"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Image</label>
          <input type="file" id="file" onChange={handleFiles} />
        </div>
        <div className="newUserItem">
          <label>Gender</label>
          <div className="newUserGender">
            <input type="radio" name="gender" id="male" value="male" />
            <label for="male">Male</label>
            <input type="radio" name="gender" id="female" value="female" />
            <label for="female">Female</label>
            <input type="radio" name="gender" id="other" value="other" />
            <label for="other">Other</label>
          </div>
        </div>
        <div className="newUserItem">
          <label>Active</label>
          <select className="newUserSelect" name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <button className="newUserButton" onClick={handleSave}>
          Create
        </button>
      </form>
    </div>
  );
}
