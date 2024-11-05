import { useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import storage from "../../utils/storage";

export default function AuthForm(props: { action: "login" | "signup" }) {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await api[props.action](userData);
      storage.setToken(res.token);
      storage.setUsername(res.username);
      navigate("/");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Username</span>
        </label>
        <input
          type="text"
          placeholder="Enter username"
          className="input input-bordered"
          minLength={3}
          value={userData.username}
          onChange={(e) =>
            setUserData({ ...userData, username: e.target.value })
          }
        />
      </div>

      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          type="password"
          placeholder="Enter password"
          className="input input-bordered"
          minLength={4}
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        />
      </div>

      <button className="btn btn-primary w-full capitalize" type="submit">
        {props.action}
      </button>
    </form>
  );
}
