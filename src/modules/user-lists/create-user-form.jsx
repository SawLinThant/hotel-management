import { useNavigate } from "react-router-dom";
import InputField from "../common/components/input-field";
import { useMutation } from "@apollo/client";
import { CREATE_CUSTOMER } from "../../graphql/mutation/customer-mutation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import LoadingButton from "../common/icon/loading-icon";
import toast, { Toaster } from "react-hot-toast";

const CreateUser = () => {
  const navigate = useNavigate();
  const [uniquePassword, setUniquePassword] = useState();
  const {
    register: customerRegister,
    handleSubmit: createCustomerSubmit,
    reset,
  } = useForm();
  const [createCustomer, { loading: createCustomerLoading }] =
    useMutation(CREATE_CUSTOMER);

  const handleCreateUser = createCustomerSubmit(async (credentials) => {
    if (credentials.password !== credentials.confirm_password) {
      toast.error("Please confirm password");
    } else {
      try {
        await createCustomer({
          variables: {
            name: credentials.name,
            phone: credentials.phone,
            email: credentials.email,
            disabled: false,
            unique_password: "",
          },
        });
        toast.success("Customer created successfully");
        reset();
      } catch (err) {
        toast.error("Fail to create customer");
        console.error("Error creating customer:", err); // Log the error for debugging
      }
    }
  });

  const [formValues, setFormValues] = useState({
    name: "",
    phone: "",
    email: "",
    unique_password: "",
    password: "",
    confirm_password: "",
    card_id: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <div className=" mt-8 w-full h-full relative p-5 flex flex-col items-center justify-center overflow-y-auto">
      <Toaster />
      <div className="min-w-[40rem] border border-primarybold p-8 flex flex-col gap-12 rounded">
        <div>
          <h3 className="text-left text-2xl text-primarybold font-semibold">
            Onboard User
          </h3>
        </div>
        <div className="w-full">
          <form
            onSubmit={handleCreateUser}
            className="w-full flex flex-col gap-6"
            action=""
          >
            <div className="w-full h-full grid grid-cols-2 gap-4">
              <div className="flex flex-col items-start gap-2 pb-4">
                <InputField
                  label="Username"
                  name="name"
                  placeholder="Enter Username"
                  inputType="text"
                  fullSize={false}
                  require={customerRegister}
                />
                <InputField
                  label="Phone"
                  name="phone"
                  placeholder="Enter phone number"
                  inputType="text"
                  require={customerRegister}
                />
              </div>
              <div className="flex flex-col items-start gap-2 pb-4">
                {/* <InputField
                  label="Unique Password"
                  name="unique_password"
                  placeholder="Unique password"
                  inputType="password"
                  autoGenerate={true}
                  fullSize={false}
                  require={customerRegister}
                  value={formValues.unique_password}
                  onChange={handleInputChange}
                  setUniquePassword={setUniquePassword}
                /> */}
                <InputField
                  label="Email"
                  name="email"
                  placeholder="Enter email"
                  inputType="email"
                  require={customerRegister}
                />
              </div>
            </div>
            <div className="h-12 w-full flex flow-row gap-4 items-center justify-start">
              <button
                type="submit"
                className="transition min-w-28 duration-500 border-primary text-white from-primary to-primarybold rounded font-light bg-gradient-to-l flex flex-row items-center justify-center"
              >
                {createCustomerLoading ? <LoadingButton size={20} /> : "Create"}
              </button>
              <button
                type="button"
                onClick={() =>
                  navigate("/dashboard/user", { state: { refetch: true } })
                }
                className=" transition min-w-28 duration-500 border-primary text-white from-primary to-primarybold rounded font-light bg-gradient-to-l"
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CreateUser;
