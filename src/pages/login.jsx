import { useForm } from "react-hook-form";
import InputField from "../modules/common/components/input-field";
import { useMutation } from "@apollo/client";
import { SIGN_IN_MUTATION } from "../graphql/mutation/sign-in-mutation";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import LoadingButton from "../modules/common/icon/loading-icon";

const Login = () => {
  const navigate = useNavigate();
  const { register: loginRegister, handleSubmit: handleLoginSubmit } =
    useForm();
  const [staffLogin, { loading: loginLoading, error: loginError }] =
    useMutation(SIGN_IN_MUTATION, {
      onCompleted: (data) => {
        const token = data.staffLogin.token;
        if (token) {
          localStorage.setItem("token", token);
          navigate("/dashboard");
        }
        localStorage.setItem(data);
      },
      onError: (error) => {
        console.log("login error", error);
        toast.error("Fail to login");
      },
    });

  const handleLogin = handleLoginSubmit(async (credentials, e) => {
    e.preventDefault();
    try {
      await staffLogin({
        variables: {
          username: credentials.username,
          password: credentials.password,
        },
      });
    } catch (error) {
      console.log("error login");
    }
  });
  return (
    <div
      id="login-container"
      className="w-screen min-h-screen flex justify-center items-center"
    >
      <Toaster />
      <div className="relative lg:w-[35vw] lg:min-h-[55vh] md:w-[80vw] md:min-h-[40vh] border-2 rounded border-gray-700 flex flex-col  ">
        <div className="absolute inset-0 lg:bg-opacity-5 md:bg-opacity-10 justify-around md:backdrop-blur-[12px] lg:backdrop-blur-md"></div>
        <div className="z-10 md:mt-8 lg:mt-0">
          <div className="w-full   h-8 mt-4 flex items-center justify-center">
            <h2 className="text-center text-black text-2xl  font-bold">
              Login
            </h2>
          </div>
          <div className="w-full h-full p-8  flex flex-col">
            <form
              onSubmit={handleLogin}
              action=""
              className="w-full h-full flex flex-col text-black"
            >
              <InputField
                label="Username"
                name="username"
                placeholder="Enter Username"
                inputType="text"
                fullSize={true}
                require={loginRegister}
              />
              <InputField
                label="Password"
                name="password"
                placeholder="Enter Password"
                inputType="password"
                fullSize={true}
                require={loginRegister}
              />
              <div className="w-full h-12 mt-4">
                <button
                  type="submit"
                  className="w-full h-full flex flex-row items-center justify-center text-white bg-gradient-to-r from-blue-900 to-gray-600"
                >
                  {loginLoading ? <LoadingButton size={20} /> : "Login"}
                </button>
              </div>
            </form>
            <div className="w-full h-auto mt-4">
              <Link to="/register" className="text-white">
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
