import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useNavigate, Link } from "@tanstack/react-router";
import { registerSchema } from "../schema/authSchema";
const countries = [
  { name: "Australia", code: "+61" },
  { name: "Brazil", code: "+55" },
  { name: "Canada", code: "+1" },
  { name: "China", code: "+86" },
  { name: "Denmark", code: "+45" },
  { name: "Egypt", code: "+20" },
  { name: "Finland", code: "+358" },
  { name: "France", code: "+33" },
  { name: "Germany", code: "+49" },
  { name: "Greece", code: "+30" },
  { name: "India", code: "+91" },
  { name: "Indonesia", code: "+62" },
  { name: "Ireland", code: "+353" },
  { name: "Italy", code: "+39" },
  { name: "Japan", code: "+81" },
  { name: "Kenya", code: "+254" },
  { name: "Malaysia", code: "+60" },
  { name: "Mexico", code: "+52" },
  { name: "Netherlands", code: "+31" },
  { name: "New Zealand", code: "+64" },
  { name: "Nigeria", code: "+234" },
  { name: "Norway", code: "+47" },
  { name: "Philippines", code: "+63" },
  { name: "Poland", code: "+48" },
  { name: "Russia", code: "+7" },
  { name: "Saudi Arabia", code: "+966" },
  { name: "Singapore", code: "+65" },
  { name: "South Africa", code: "+27" },
  { name: "Spain", code: "+34" },
  { name: "Sweden", code: "+46" },
  { name: "Switzerland", code: "+41" },
  { name: "Thailand", code: "+66" },
  { name: "UAE", code: "+971" },
  { name: "UK", code: "+44" },
  { name: "USA", code: "+1" },
];

type ErrorType = {
  name?: string[];
  email?: string[];
  password?: string[];
  country?: string[];
  mobile?: string[];
};

export default function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [selectedCode, setSelectedCode] = useState("");
  const [errors, setErrors] = useState<ErrorType>({});

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      country: "",
      mobile: "",
    },
    onSubmit: async ({ value }) => {
      alert("Registered Successfully ✅");

      
const existingUsers = JSON.parse(localStorage.getItem("localUsers") || "[]");


localStorage.setItem(
  "localUsers",
  JSON.stringify([...existingUsers, value])
);


localStorage.setItem("registeredUser", JSON.stringify(value));
      navigate({ to: "/login" });
    },
  });

  const validate = (values: any) => {
    const result = registerSchema.safeParse(values);

    if (!result.success) {
      const f = result.error.format();
      setErrors({
        name: f.name?._errors || [],
        email: f.email?._errors || [],
        password: f.password?._errors || [],
        country: f.country?._errors || [],
        mobile: f.mobile?._errors || [],
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
        className="bg-white/90 backdrop-blur-md w-full max-w-md p-8 rounded-2xl shadow-2xl flex flex-col gap-5 border border-white/20"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Create Account 🚀
        </h1>

        
        <form.Field name="name">
          {(field) => (
            <div>
              <input
                placeholder="Name"
                value={field.state.value}
                onChange={(e) => {
                  field.handleChange(e.target.value);
                  setErrors((p) => ({ ...p, name: [] }));
                }}
                className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
              {errors.name?.length ? (
                <ul className="text-red-500 text-sm ml-5 list-disc mt-1">
                  {errors.name.map((e, i) => (
                    <li key={i}>{e}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          )}
        </form.Field>

        
        <form.Field name="email">
          {(field) => (
            <div>
              <input
                placeholder="Email"
                value={field.state.value}
                onChange={(e) => {
                  field.handleChange(e.target.value);
                  setErrors((p) => ({ ...p, email: [] }));
                }}
                className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
              {errors.email?.length ? (
                <ul className="text-red-500 text-sm ml-5 list-disc mt-1">
                  {errors.email.map((e, i) => (
                    <li key={i}>{e}</li>
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
                  placeholder="Password"
                  value={field.state.value}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                    setErrors((p) => ({ ...p, password: [] }));
                  }}
                  className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-indigo-600 text-sm"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {errors.password?.length ? (
                <ul className="text-red-500 text-sm ml-5 list-disc mt-1">
                  {errors.password.map((e, i) => (
                    <li key={i}>{e}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          )}
        </form.Field>

        
        <form.Field name="country">
          {(field) => (
            <div>
              <select
                value={field.state.value}
                onChange={(e) => {
                  const c = countries.find(
                    (x) => x.name === e.target.value
                  );
                  field.handleChange(e.target.value);
                  setSelectedCode(c?.code || "");
                  setErrors((p) => ({ ...p, country: [] }));
                }}
                className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              >
                <option value="">Select Country</option>
                {countries.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name} ({c.code})
                  </option>
                ))}
              </select>

              {errors.country?.length ? (
                <ul className="text-red-500 text-sm ml-5 list-disc mt-1">
                  {errors.country.map((e, i) => (
                    <li key={i}>{e}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          )}
        </form.Field>

        
        <form.Field name="mobile">
          {(field) => (
            <div>
              <div className="flex">
                <span className="bg-gray-200 px-3 py-3 border rounded-l-lg">
                  {selectedCode || "+--"}
                </span>
                <input
                  placeholder="Mobile"
                  value={field.state.value}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                    setErrors((p) => ({ ...p, mobile: [] }));
                  }}
                  className="border border-gray-300 p-3 rounded-r-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
              </div>

              {errors.mobile?.length ? (
                <ul className="text-red-500 text-sm ml-5 list-disc mt-1">
                  {errors.mobile.map((e, i) => (
                    <li key={i}>{e}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          )}
        </form.Field>

        
        <button
          type="submit"
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300"
        >
          Create Account
        </button>

        
        <p className="text-sm text-center text-gray-600">
          Already have account?{" "}
          <Link to="/login" className="text-indigo-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}