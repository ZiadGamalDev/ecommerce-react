import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const baseUrl = "https://e-commerce-api-tau-five.vercel.app/";

const useProfileData = () => {
  const { token } = useContext(AuthContext);

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${baseUrl}profile/`, {
          headers: { accesstoken: `accesstoken_${token}` },
        });
        setProfile(response.data.user);
      } catch (err) {
        setError(err.message || "Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { profile, loading, error, token };
};

export default useProfileData;
