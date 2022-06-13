import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Fragment } from "react/cjs/react.production.min";
import NavBar from "./NavBar";

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(true);
  const param = useParams();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `http://localhost:8080/api/users/${param.id}/verify/${param.token}`;
        const { data } = await axios.get(url);
        console.log(data);
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [param]);

  return (
    <div>
      <NavBar></NavBar>
      <Fragment>
        {validUrl ? (
          <div className="emailContainer">
            <img alt="success_img" />
            <h1>Email verified successfully</h1>
            <Link to="/login">
              <button className="green_btn">Login</button>
            </Link>
          </div>
        ) : (
          <h1>404 Not Found</h1>
        )}
      </Fragment>
    </div>
  );
};

export default EmailVerify;
