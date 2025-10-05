import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../api/hook/auth";

export default function Login() {
  const { mutate, isSuccess, isLoading } = useLogin();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleFormChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    mutate(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/", { replace: true });
    }
  }, [isSuccess, navigate]);

  return (
    <div className="authContainer">
      <section className="register">
        <header className="sectionHeader">
          <h2 className="header_title">Login to your account</h2>
          <p className="para">Enter your username to get started</p>
        </header>
        <div>
          <form
            method="post"
            onSubmit={handleLogin}
            className="formWrapper"
            noValidate
          >
            <div className="inputWrapper">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleFormChange}
                placeholder="Big T"
                required
              />
            </div>
            <div className="inputWrapper">
              <label htmlFor="username">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleFormChange}
                placeholder="**************"
                required
              />
            </div>

            <button type="submit" className="submitBtn">
              {isLoading ? "Processing..." : "Login"}
            </button>
          </form>
          <p className="formFooter">
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
