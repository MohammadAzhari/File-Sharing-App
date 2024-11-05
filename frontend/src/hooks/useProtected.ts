import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import storage from "../utils/storage";

export default function useProtected() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = storage.getToken();

    if (!token) {
      navigate("/auth");
    }
  }, []);
}
