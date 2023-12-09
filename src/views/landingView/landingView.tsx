import { FC, useState, useEffect } from "react";
import IconFile from "../../shared/components/iconFile";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { ILandingModel } from "./models/landing.model";
import { IUserDataModel } from "../models/userData.model";

const LandingView: FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<ILandingModel>();

  useEffect(() => {
    const isValid = async (): Promise<void> => {
      if (user && user.access_token) {
        const { data } = await getUserDetailsFromAccessToken();
        if (data) {
          setUserDetailsInLocalStorage(data);
          navigate("/group-chat");
        }
      }
    };
    isValid();
  }, [user]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse: ILandingModel) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  const getUserDetailsFromAccessToken = (): Promise<IUserDataModel> => {
    return axios.get(
      `${
        import.meta.env.VITE_GOOGLE_AUTH_URL
      }/oauth2/v1/userinfo?access_token=${user?.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
          Accept: "application/json",
        },
      }
    );
  };

  const setUserDetailsInLocalStorage = (
    userDetails: IUserDataModel["data"]
  ): void => localStorage.setItem("userData", JSON.stringify(userDetails));

  return (
    <div className="h-100 d-inline-block w-100 d-flex justify-content-center align-items-center">
      {/* google button  */}
      <a className="btn btn-lg btn-google btn-outline">
        <button
          onClick={() => login()}
          className="bg-transparent border border-white"
        >
          <IconFile iconSrc={"google-logo"} />
          <span className="ps-2">Signup Using Google</span>
        </button>
      </a>
    </div>
  );
};

export default LandingView;
