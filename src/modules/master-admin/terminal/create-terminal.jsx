import { useNavigate } from "react-router-dom";
import InputField from "../../common/components/input-field";
import { useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import LoadingButton from "../../common/icon/loading-icon";
import toast, { Toaster } from "react-hot-toast";
import CustomDropdown from "../../common/components/custom-dropdown";
import { GET_FACILITIES, GET_FACILITIES_BY_HOTEL_GROUP } from "../../../graphql/query/facilities-query";
import { CREATE_TERMINAL } from "../../../graphql/mutation/terminal-mutation";
import bcrypt from "bcryptjs";
import { useAccount } from "../../../lib/context/account-context";
import { GET_HOTEL_GROUP } from "../../../graphql/query/hotel-group";

const CreateTerminal = () => {
  const navigate = useNavigate();
  const {userType} = useAccount();
  const [hotelGroup, setHotelGroup] = useState();
  const [hotelGroupOptions, setHotelGroupOptions] = useState();
  const [facility, setFacility] = useState();
  const [facilityOptions, setFacilityOptions] = useState();
  const {
    register: terminalRegister,
    handleSubmit: createTerminalSubmit,
    reset,
  } = useForm();
  const [createTerminal, { loading: createTerminalLoading }] =
    useMutation(CREATE_TERMINAL);

  const {
    data: getFacility,
    loading: fetchFacility,
    error: fetchFacilityError,
  } = useQuery(GET_FACILITIES,{
    variables: {
      hotelGroup:userType
    }
  });

  useEffect(() => {
    if (getFacility && getFacility.facilities) {
      setFacilityOptions(getFacility.facilities);
    }
  }, [getFacility]);

  const {data:getHotelGroup,loading:fetchHotelGroup} = useQuery(GET_HOTEL_GROUP);
  useEffect(() => {
    if (getHotelGroup && getHotelGroup.hotel_groups) {
      setHotelGroupOptions(getHotelGroup.hotel_groups);
    }
  }, [getHotelGroup]);

  const handleCreateFacility = createTerminalSubmit(async (credentials) => {
    if (credentials.password !== credentials.confirm_password) {
      toast.error("Please confirm password");
    }
    else if(!facility || facility.length<0){
       toast.error("Please choose facility")
    }else if(!hotelGroup || hotelGroup.length < 0){
      toast.error("Please select hotel group")
    } 
    else {
      try {
        const hashedPassword = await bcrypt.hash(credentials.password, 10);
        await createTerminal({
          variables: {
            terminal_number: credentials.terminal_number,
            password: hashedPassword,
            facility_id: facility,
            hotel_group: hotelGroup
          },
        });
        toast.success("Terminal created successfully");
        reset();
      } catch (err) {
        toast.error("Cannot create terminal");
        console.error("Error creating terminal:", err);
      }
    }
  });

  return (
    <div className=" mt-8 w-full h-full relative p-5 flex flex-col items-center justify-center overflow-y-auto">
      <Toaster />
      <div className="min-w-[40rem] border border-primarybold p-8 flex flex-col gap-12 rounded">
        <div>
          <h3 className="text-left text-2xl text-primarybold font-semibold">
            Create Terminal
          </h3>
        </div>
        <div className="w-full">
          <form
            onSubmit={handleCreateFacility}
            className="w-full flex flex-col gap-6"
            action=""
          >
            <div className="w-full h-full grid grid-cols-2 gap-4">
              <div className="flex flex-col min-h-[20rem] items-start gap-2 pb-4">
                <InputField
                  label="Terminal Number"
                  name="terminal_number"
                  placeholder="Enter terminal number"
                  inputType="text"
                  fullSize={false}
                  require={terminalRegister}
                />
                <InputField
                  label="Password"
                  name="password"
                  placeholder="Enter password"
                  inputType="password"
                  require={terminalRegister}
                />
                <div className="w-3/4 mt-2 relative">
                  <CustomDropdown
                    label="Select Hotel Group"
                    options={hotelGroupOptions}
                    setOption={setHotelGroup}
                    isOptionValue={false}
                  />
                </div>
              </div>
              <div className="flex flex-col items-start gap-2 pb-4">
                <InputField
                  label="Confirm password"
                  name="confirm_password"
                  placeholder="Confirm password"
                  inputType="password"
                  fullSize={false}
                  require={terminalRegister}
                />
                <div className="w-3/4 mt-2 relative">
                  <CustomDropdown
                    label="Select an option"
                    options={facilityOptions}
                    setOption={setFacility}
                  />
                </div>
              </div>
            </div>
            <div className="h-12 w-full flex flow-row gap-4 items-center justify-start">
              <button
                type="submit"
                className="transition min-w-28 duration-500 border-primary text-white from-primary to-primarybold rounded font-light bg-gradient-to-l flex flex-row items-center justify-center"
              >
                {createTerminalLoading ? <LoadingButton size={20} /> : "Create"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/masteradmindashboard/terminal",{ state: { refetch: true } })}
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
export default CreateTerminal;
