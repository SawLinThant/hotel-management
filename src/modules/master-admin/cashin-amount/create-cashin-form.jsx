import { useNavigate } from "react-router-dom";
import InputField from "../../common/components/input-field";
import { useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import LoadingButton from "../../common/icon/loading-icon";
import toast, { Toaster } from "react-hot-toast";
import { CREATE_CASHIN_AMOUNT } from "../../../graphql/mutation/cashin-mutation";
import { useAccount } from "../../../lib/context/account-context";
import { GET_HOTEL_GROUP } from "../../../graphql/query/hotel-group";
import CustomDropdown from "../../common/components/custom-dropdown";

const CreateCashinAmount = () => {
  const navigate = useNavigate();
  const { userType } = useAccount();
  const [hotelGroup, setHotelGroup] = useState();
  const [hotelGroupOptions, setHotelGroupOptions] = useState();
  const {
    register: cashinAmountRegister,
    handleSubmit: createCashinAmountSubmit,
    reset,
  } = useForm();
  const [createCashinAmount, { loading: createCashinAmountLoading }] =
    useMutation(CREATE_CASHIN_AMOUNT);

  const { data: getHotelGroup, loading: fetchHotelGroup } =
    useQuery(GET_HOTEL_GROUP);
  useEffect(() => {
    if (getHotelGroup && getHotelGroup.hotel_groups) {
      setHotelGroupOptions(getHotelGroup.hotel_groups);
    }
  }, [getHotelGroup]);

  const handleCreateCashinAmount = createCashinAmountSubmit(
    async (credentials) => {
      if (!hotelGroup || hotelGroup.length < 0) {
        toast.error("Please select hotel group");
      } else {
        try {
          await createCashinAmount({
            variables: {
              amount: credentials.amount,
              hotel_group: hotelGroup,
            },
          });
          toast.success("Cash In Amount created");
          reset();
        } catch (err) {
          toast.error("Cannot create cash in amount");
          console.error("Error creating cashinAmount:", err);
        }
      }
    }
  );

  return (
    <div className=" mt-8 w-full h-full relative p-5 flex flex-col items-center justify-center overflow-y-auto">
      <Toaster />
      <div className="min-w-[20rem] border border-primarybold p-8 flex flex-col gap-12 rounded">
        <div>
          <h3 className="text-left text-2xl text-primarybold font-semibold">
            Create CashinAmount
          </h3>
        </div>
        <div className="w-full">
          <form
            onSubmit={handleCreateCashinAmount}
            className="w-full flex flex-col gap-6"
            action=""
          >
            <div className="w-full h-full grid grid-cols-1 gap-4">
              <div className="flex flex-col min-h-[13rem] items-start gap-2 pb-4">
                <InputField
                  label="Amount"
                  name="amount"
                  placeholder="Enter Amount"
                  inputType="number"
                  fullSize={true}
                  require={cashinAmountRegister}
                />
                <div className="w-full mt-2 relative">
                  <CustomDropdown
                    label="Select Hotel Group"
                    options={hotelGroupOptions}
                    setOption={setHotelGroup}
                    isOptionValue={false}
                  />
                </div>
              </div>
            </div>
            <div className="h-12 w-full flex flow-row gap-4 items-center justify-between">
              <button
                type="submit"
                className="transition min-w-28 duration-500 border-primary text-white from-primary to-primarybold rounded font-light bg-gradient-to-l flex flex-row items-center justify-center"
              >
                {createCashinAmountLoading ? (
                  <LoadingButton size={20} />
                ) : (
                  "Create"
                )}
              </button>
              <button
                type="button"
                onClick={() =>
                  navigate("/masteradmindashboard/cashinamount", {
                    state: { refetch: true },
                  })
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
export default CreateCashinAmount;
