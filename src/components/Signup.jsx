
    // import React, { useContext } from "react";
    // import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
    // import { Link, useLocation, useNavigate } from "react-router-dom";
    // import { useForm } from "react-hook-form"
    // import Modal from "./Modal";
    // import { AuthContext } from "../contexts/AuthProvider";

    // const Signup = () => {
    //     const {
    //         register,
    //         handleSubmit,
    //         formState: { errors },
    //     } = useForm();

    //     const {createUser, login} = useContext(AuthContext);
    //         // redirecting to home page or specifig page
    //     const location = useLocation();
    //     const navigate = useNavigate();
    //     const from = location.state?.from?.pathname || "/";

    //     const onSubmit = (data) => {
    //         const email = data.email;
    //         const password = data.password;

    //         console.log("Email:", email);  // Debugging
    //         console.log("Password:", password); // Debugging

    //         createUser(email, password).then((result) => {
    //         // Signed up 
    //         const user = result.user;
    //         alert("Account creation successfully done!")
    //         document.getElementById("my_modal_5").close()
    //         navigate(from, {replace: true})
    //         // ...
    //         })
    //         .catch((error) => {
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         // ..
    //         })
    //     }
    // return (
    //     <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
    //         <div className="modal-action flex flex-col justify-center mt-0">
    //         <form onSubmit={handleSubmit(onSubmit)} className="card-body" method="dialog">
    //             <h3 className="font-bold text-lg">Create A Account!</h3>

    //             {/* email */}
    //             <div className="form-control">
    //             <label className="label">
    //                 <span className="label-text">Email</span>
    //             </label>
    //             <input
    //                 type="email"
    //                 placeholder="email"
    //                 className="input input-bordered"
    //                 {...register("email")}
    //             />
    //             </div>

    //             {/* password */}
    //             <div className="form-control">
    //             <label className="label">
    //                 <span className="label-text">Password</span>
    //             </label>
    //             <input
    //                 type="password"
    //                 placeholder="password"
    //                 className="input input-bordered"
    //                 {...register("password")}
    //             />
    //             <label className="label mt-1">
    //                 <a href="#" className="label-text-alt link link-hover">
    //                 Forgot password?
    //                 </a>
    //             </label>
    //             </div>

    //             {/* error */}

    //             {/* login btn */}
    //             <div className="form-control mt-6">
    //             <input
    //                 type="submit"
    //                 value="Signup"
    //                 className="btn bg-green text-white"
    //             />
    //             </div>

    //             <p className="text-center my-2">
    //             Have an account?{" "}
    //             <button className="underline text-red ml-1"
    //             onClick={() => document.getElementById("my_modal_5").showModal()}
    //             >
    //                 Login
    //             </button>{" "}
    //             </p>

    //             <Link
    //             to="/"
    //             className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
    //             >✕</Link>
    //         </form>

    //         {/* social sign in */}
    //         <div className="text-center space-x-3 mb-5">
    //             <button className="btn btn-circle hover:bg-green hover:text-white">
    //             <FaGoogle />
    //             </button>
    //             <button className="btn btn-circle hover:bg-green hover:text-white">
    //             <FaFacebookF />
    //             </button>
    //             <button className="btn btn-circle hover:bg-green hover:text-white">
    //             <FaGithub />
    //             </button>
    //         </div>
    //         </div>
    //         <Modal/>
    //     </div>
    // )
    // }

    // export default Signup







    import React, { useContext } from "react";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser } = useContext(AuthContext);

  // Redirecting after signup
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = async (data) => {
    const email = data.email;
    const password = data.password;

    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const result = await createUser(email, password);
      console.log("User Created:", result.user);
      alert("Account creation successful!");

      // Redirect after successful signup
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Signup Error:", error);
      alert(error.message); // Show error message in alert
    }
  };

  return (
    <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
      <div className="modal-action flex flex-col justify-center mt-0">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-body"
          method="dialog"
        >
          <h3 className="font-bold text-lg">Create An Account!</h3>

          {/* Email Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>

          {/* Password Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>

          {/* Signup Button */}
          <div className="form-control mt-6">
            <input
              type="submit"
              value="Signup"
              className="btn bg-green text-white"
            />
          </div>

          <p className="text-center my-2">
            Already have an account?{" "}
            <Link to="/login" className="underline text-red ml-1">
              Login
            </Link>
          </p>
        </form>

        {/* Social Sign-in */}
        <div className="text-center space-x-3 mb-5">
          <button className="btn btn-circle hover:bg-green hover:text-white">
            <FaGoogle />
          </button>
          <button className="btn btn-circle hover:bg-green hover:text-white">
            <FaFacebookF />
          </button>
          <button className="btn btn-circle hover:bg-green hover:text-white">
            <FaGithub />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
