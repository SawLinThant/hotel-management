import { useForm } from "react-hook-form";
import InputField from "../modules/common/components/input-field";
import { useMutation, useQuery } from "@apollo/client";
import { GET_STAFF_ROLE } from "../graphql/query/staff-role-query";
import { useEffect, useState } from "react";
import CustomDropdown from "../modules/common/components/custom-dropdown";
import { CREATE_STAFF } from "../graphql/mutation/staff-role-mutation";
import toast, { Toaster } from "react-hot-toast";
import bcrypt from "bcryptjs";
import LoadingButton from "../modules/common/icon/loading-icon";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [staffRole, setStaffRole] = useState();
  const [staffRoleOptions, setStaffRoleOptions] = useState();
  const {
    register: signupRegister,
    handleSubmit: createStaffSubmit,
    reset,
  } = useForm();
  const { data: getStaffRole, loading: fetchStaffRole } =
    useQuery(GET_STAFF_ROLE);
  const [
    createStaff,
    { loading: createStaffLoading, error: createStaffError },
  ] = useMutation(CREATE_STAFF, {
    onCompleted: () => {
      navigate("/");
    },
  });

  useEffect(() => {
    if (getStaffRole && getStaffRole.staff_roles) {
      setStaffRoleOptions(getStaffRole.staff_roles);
    }
  }, [getStaffRole]);

  const formReset = () => {
    reset();
    setStaffRole("");
  };

  const handleCreateStaff = createStaffSubmit(async (credentials) => {
    if (credentials.password !== credentials.confirm_password) {
      toast.error("Please confirm password");
    } else if (!staffRole || staffRole.length < 0) {
      toast.error("Please select role");
    } else {
      try {
        const hashedPassword = await bcrypt.hash(credentials.password, 10);
        await createStaff({
          variables: {
            name: credentials.name,
            username: credentials.username,
            password: hashedPassword,
            role: staffRole,
          },
        });
        toast.success("Staff Created");
        formReset();
      } catch (err) {
        console.log("error creating staff", err);
        toast.error("Fail to create staff");
      }
    }
  });

  if (createStaffError) return <div>createStaffError</div>;

  return (
    <div
      id="login-container"
      className="w-screen min-h-screen flex justify-center items-center"
    >
      <Toaster />
      <div className="relative lg:w-[45vw] lg:min-h-[55vh] md:w-[80vw] md:min-h-[45vh] border-2 rounded border-gray-700 flex flex-col justify-around ">
        <div className="absolute inset-0 lg:bg-opacity-5 md:bg-opacity-10 justify-around md:backdrop-blur-[12px] lg:backdrop-blur-md"></div>
        <div className="z-10">
          <div className="w-full h-8 mt-4 flex items-center justify-center">
            <h2 className="text-center text-black text-2xl font-bold">
              Register
            </h2>
          </div>
          <div className="w-full h-full p-8  flex flex-col">
            <form
              onSubmit={handleCreateStaff}
              action=""
              className="w-full h-full flex flex-col text-black"
            >
              <div className="w-full lg:h-[40vh] md:h-[30vh] grid grid-cols-2 gap-6">
                <div className="w-full h-full">
                  <InputField
                    label="Nmae"
                    name="name"
                    placeholder="Enter Name"
                    inputType="text"
                    fullSize={true}
                    require={signupRegister}
                  />
                  <InputField
                    label="Username"
                    name="username"
                    placeholder="Enter Username"
                    inputType="text"
                    fullSize={true}
                    require={signupRegister}
                  />
                  <div className="w-full mt-2 relative">
                    <CustomDropdown
                      label="Select Role"
                      options={staffRoleOptions}
                      setOption={setStaffRole}
                      isOptionValue={false}
                    />
                  </div>
                </div>
                <div className="w-full h-full">
                  <InputField
                    label="Password"
                    name="password"
                    placeholder="Enter Password"
                    inputType="password"
                    fullSize={true}
                    require={signupRegister}
                  />
                  <InputField
                    label="Confirm Password"
                    name="confirm_password"
                    placeholder="Confirm Password"
                    inputType="password"
                    fullSize={true}
                    require={signupRegister}
                  />
                </div>
              </div>
              <div className="w-full h-12 mt-4">
                <button
                  type="submit"
                  className="w-full h-full flex flex-row items-center justify-center text-white bg-gradient-to-r from-blue-900 to-gray-600"
                >
                  {createStaffLoading ? (
                    <LoadingButton size={20} />
                  ) : (
                    "Register"
                  )}
                </button>
              </div>
            </form>
            <div className="w-full h-auto mt-4">
              <Link to="/" className="text-white">
                Already have an account?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;