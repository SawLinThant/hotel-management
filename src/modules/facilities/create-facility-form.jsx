import { useNavigate } from "react-router-dom";
import InputField from "../common/components/input-field";
import { useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import LoadingButton from "../common/icon/loading-icon";
import toast, { Toaster } from "react-hot-toast";
import { CREATE_FACILITY } from "../../graphql/mutation/facility-mutation";
import { GET_ESTABLISHMENT } from "../../graphql/query/establishment-query";
import CustomDropdown from "../common/components/custom-dropdown";

const CreateFacility = () => {
  const navigate = useNavigate();
  const [establishment, setEstablishment] = useState();
  const [establishmentOptions, setEstablishmentOptions] = useState();
  const {
    register: facilityRegister,
    handleSubmit: createFacilitySubmit,
    reset,
  } = useForm();
  const [createFacility, { loading: createFacilityLoading }] =
    useMutation(CREATE_FACILITY);

  const {
    data: getEstablishments,
    loading: fetchEstablishment,
    error: fetchEstablishmentError,
  } = useQuery(GET_ESTABLISHMENT);

  useEffect(() => {
    if (getEstablishments && getEstablishments.establishments) {
      setEstablishmentOptions(getEstablishments.establishments);
    }
  }, [getEstablishments]);

  const handleCreateFacility = createFacilitySubmit(async (credentials) => {
    if(!establishment || establishment.length<0){
      toast.error("Please select establishment")
    }else{
      try {
        await createFacility({
          variables: {
            name: credentials.name,
            phone: credentials.phone,
            email: credentials.email,
            establishment_id: establishment,
          },
        });
        toast.success("Facility created successfully");
        reset();
      } catch (err) {
        toast.error("Fail to create facility");
        console.error("Error creating facility:", err);
      }
    }
   
  });

  return (
    <div className=" mt-8 w-full h-full relative p-5 flex flex-col items-center justify-center overflow-y-auto">
      <Toaster />
      <div className="min-w-[40rem] border border-primarybold p-8 flex flex-col gap-12 rounded">
        <div>
          <h3 className="text-left text-2xl text-primarybold font-semibold">
            Create Facility
          </h3>
        </div>
        <div className="w-full">
          <form
            onSubmit={handleCreateFacility}
            className="w-full flex flex-col gap-6"
            action=""
          >
            <div className="w-full h-full grid grid-cols-2 gap-4">
              <div className="flex flex-col items-start gap-2 pb-4">
                <InputField
                  label="Name"
                  name="name"
                  placeholder="Enter Name"
                  inputType="text"
                  fullSize={false}
                  require={facilityRegister}
                />
                <InputField
                  label="Phone"
                  name="phone"
                  placeholder="Enter phone number"
                  inputType="text"
                  require={facilityRegister}
                />
              </div>
              <div className="flex flex-col items-start gap-2 pb-4">
                <InputField
                  label="Email"
                  name="email"
                  placeholder="Enter email"
                  inputType="email"
                  require={facilityRegister}
                />
                <div className="w-3/4 mt-2 relative">
                  <CustomDropdown
                    label="Select Establishment"
                    options={establishmentOptions}
                    setOption={setEstablishment}
                  />
                </div>
              </div>
            </div>
            <div className="h-12 w-full flex flow-row gap-4 items-center justify-start">
              <button
                type="submit"
                className="transition min-w-28 duration-500 border-primary text-white from-primary to-primarybold rounded font-light bg-gradient-to-l"
              >
                {createFacilityLoading ? <LoadingButton size={20} /> : "Create"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/dashboard/facility",{ state: { refetch: true } })}
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
export default CreateFacility;
