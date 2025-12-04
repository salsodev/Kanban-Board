import { useState } from "react";
import { Link } from "react-router-dom";
import { useRegister } from "../../api/hook/auth";
import { toast } from "sonner";

export default function Register() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const { isLoading, mutate } = useRegister();

  const handleFormChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.password || !formData.username) {
      toast.error("Username and password must not be emptied");
      return;
    }

    mutate(formData);

    setFormData({ username: "", password: "" });
  };

  return (
    <div className="authContainer">
      <section className="register">
        <header className="sectionHeader">
          <h2 className="header_title">Create an account</h2>
          <p className="para">Enter your username to get started</p>
        </header>
        <div>
          <form
            method="post"
            className="formWrapper"
            onSubmit={handleSubmit}
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
              {isLoading ? "Signing up..." : "Sign Up"}
            </button>
          </form>
          <p className="formFooter">
            Already registered? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
