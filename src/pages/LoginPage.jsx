// src/pages/LoginPage.jsx
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../store/actions/thunkActions";

/* VALIDATION: basic email check */
function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  /* REDIRECT: go back to previous page (fallback: home) */
  const from = location.state?.from?.pathname || "/";

  /* FORM: react-hook-form setup */
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  /* SUBMIT: login + redirect */
  const onSubmit = async (values) => {
    const result = await dispatch(
      loginUser({
        email: values.email,
        password: values.password,
        rememberMe: values.rememberMe,
        redirectTo: from,
      })
    );

    if (result?.ok) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="w-full flex flex-col bg-white">
      <section className="w-full">
        <div className="w-full max-w-2xl mx-auto px-4 py-12 flex flex-col gap-8">
          {/* PAGE TITLE */}
          <div className="flex flex-col gap-2">
            <div className="font-bold text-[24px] leading-[32px] tracking-[0.1px] text-[#252B42]">
              Login
            </div>
            <div className="text-[14px] leading-[20px] tracking-[0.2px] text-[#737373]">
              Welcome back.
            </div>
          </div>

          {/* LOGIN FORM */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-5"
          >
            {/* EMAIL */}
            <div className="w-full flex flex-col gap-2">
              <label className="text-[14px] text-[#252B42] font-bold">
                Email
              </label>
              <input
                className="w-full border border-[#E6E6E6] px-4 py-3 text-[14px]"
                placeholder="you@example.com"
                {...register("email", {
                  required: "Email is required",
                  validate: (v) => isValidEmail(v) || "Email is not valid",
                })}
              />
              {errors.email && (
                <div className="text-[12px] text-[#E74040]">
                  {errors.email.message}
                </div>
              )}
            </div>

            {/* PASSWORD */}
            <div className="w-full flex flex-col gap-2">
              <label className="text-[14px] text-[#252B42] font-bold">
                Password
              </label>
              <input
                type="password"
                className="w-full border border-[#E6E6E6] px-4 py-3 text-[14px]"
                placeholder="********"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <div className="text-[12px] text-[#E74040]">
                  {errors.password.message}
                </div>
              )}
            </div>

            {/* REMEMBER ME */}
            <label className="flex items-center gap-2 text-[14px] text-[#252B42]">
              <input type="checkbox" {...register("rememberMe")} />
              Remember me
            </label>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full h-12 rounded-[5px] font-bold text-[14px] leading-[22px] tracking-[0.2px] text-white flex items-center justify-center gap-2 ${
                isSubmitting ? "bg-[#BDBDBD]" : "bg-[#23A6F0]"
              }`}
            >
              {isSubmitting && (
                <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              )}
              {isSubmitting ? "Logging in..." : "Login"}
            </button>

            {/* SIGNUP LINK */}
            <div className="text-[14px] text-[#737373]">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-[#23A6F0] font-bold">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
