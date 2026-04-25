import { useState, useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import { loginSchema } from "../schema/authSchema";
import { Link, useNavigate } from "@tanstack/react-router";

type ErrorType = {
  email?: string[];
  password?: string[];
};

type UserType = {
  name: string;
  email: string;
  password: string;
};

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<ErrorType>({});
  const [user, setUser] = useState<UserType | null>(null);

  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      console.log("Login Data:", value);

        localStorage.setItem("currentUser", JSON.stringify(user));

      alert(`Login Successful 🎉 Welcome ${user?.name || "User"}`);

      localStorage.removeItem("registeredUser");

      
      navigate({ to: "/users" });
    },
  });

  
  useEffect(() => {
    const storedUser = localStorage.getItem("registeredUser");

    if (storedUser) {
      const parsed: UserType = JSON.parse(storedUser);
      setUser(parsed);

      
      form.setFieldValue("email", parsed.email);
    }
  }, []);

  const validate = (values: { email: string; password: string }) => {
    const result = loginSchema.safeParse(values);

    if (!result.success) {
      const f = result.error.format();

      setErrors({
        email: f.email?._errors || [],
        password: f.password?._errors || [],
      });

      return false;
    }

    setErrors({});
    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate(form.state.values)) return;

    form.handleSubmit();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-md w-full max-w-md p-8 rounded-2xl shadow-2xl flex flex-col gap-5"
      >
        
        {user && (
          <div className="bg-green-100 text-green-700 p-3 rounded text-center text-sm">
            Welcome <strong>{user.name}</strong> 👋 <br />
            Please login with your credentials
          </div>
        )}

        <h1 className="text-3xl font-bold text-center text-gray-800">
          Welcome Back 👋
        </h1>

        
        <form.Field name="email">
          {(field) => (
            <div>
              <input
                type="email"
                placeholder="Enter email"
                value={field.state.value}
                onChange={(e) => {
                  field.handleChange(e.target.value);
                  setErrors((prev) => ({ ...prev, email: [] }));
                }}
                className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              {errors.email?.length ? (
                <ul className="text-red-500 text-sm mt-1 list-disc ml-5">
                  {errors.email.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          )}
        </form.Field>

        
        <form.Field name="password">
          {(field) => (
            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={field.state.value}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                    setErrors((prev) => ({ ...prev, password: [] }));
                  }}
                  className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-3 text-sm text-indigo-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {errors.password?.length ? (
                <ul className="text-red-500 text-sm mt-1 list-disc ml-5">
                  {errors.password.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          )}
        </form.Field>

        
        <button
          type="submit"
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:scale-105 transition"
        >
          Login
        </button>

      
        <p className="text-sm text-center text-gray-600">
          New user?{" "}
          <Link to="/register" className="text-indigo-600 font-semibold">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}