import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_FACILITY_BY_ID } from "../../../graphql/query/facilities-query";
import CustomDropdown from "../../../modules/common/components/custom-dropdown";
import clsx from "clsx";
import { DELETE_FACILITY_BY_ID, UPDATE_FACILITY_BY_ID } from "../../../graphql/mutation/facility-mutation";
import toast, { Toaster } from "react-hot-toast";
import LoadingButton from "../../../modules/common/icon/loading-icon";
import { GET_ESTABLISHMENT } from "../../../graphql/query/establishment-query";

const FacilityDetail = () => {
  const { facilityId } = useParams();
  const navigate = useNavigate();
  const [isEdit, setisEdit] = useState(false);
  const [establishment, setEstablishment] = useState();
  const [establishmentOptions, setEstablishmentOptions] = useState();
  const { data: getFacilitybyId, loading: fetchFacilitybyId } = useQuery(
    GET_FACILITY_BY_ID,
    {
      variables: { id: facilityId },
    }
  );

  const [facilityData, setFacilityData] = useState({
    id: "",
    name: "",
    phone: "",
    email: "",
    establishment_id: "",
    hotel_group:"",
    establishment:{
        id:"",
        name:"",
      }
  });

  const {
    data: getEstablishment,
    loading: fetchEstablishment,
    error: fetchEstablishmentError,
  } = useQuery(GET_ESTABLISHMENT, {
  });

  useEffect(() => {
    if (getEstablishment && getEstablishment.establishments) {
        setEstablishmentOptions(getEstablishment.establishments);
    }
  }, [getEstablishment]);

  useEffect(() => {
    if (getFacilitybyId) {
      setFacilityData(getFacilitybyId.facilities[0]);
    }
  }, [getFacilitybyId]);

  useEffect(() => {
    console.log(establishment);
    if (establishment) {
      setFacilityData((prevData) => ({
        ...prevData,
        establishment_id: establishment,
      }));
    }
  }, [establishment]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFacilityData({
      ...facilityData,
      [name]: value,
    });
  };

  const handleRadioChange = (status) => {
    setFacilityData((prevData) => ({
      ...prevData,
      disabled: status,
    }));
  };

  const [updateFacilityById, { loading: updateFacilityLoading }] = useMutation(
    UPDATE_FACILITY_BY_ID
  );

  const handleUpdate = async (e) => {
    e.preventDefault();
    //console.log(facilityData.facility_id)
    try {
      await updateFacilityById({
        variables: {
          id: facilityData.id,
          name: facilityData.name,
          phone: facilityData.phone,
          email: facilityData.email,
          establishment_id: facilityData. establishment_id,
          hotel_group:facilityData.hotel_group,
        },
      });
      toast.success("Saved changes");
    } catch (error) {
      console.error("Failed to update facility:", error);
      toast.error("Failed to update facility.");
    }
  };

  const [deleteFacilityById, { loading: deleteFacilityLoading }] = useMutation(
    DELETE_FACILITY_BY_ID,
    {
      variables: { id: facilityId },
      onCompleted: () => {
        toast.success("Deleted successfully");
        navigate("/dashboard/facility",{ state: { refetch: true } });
      },
      onError: (error) => {
        console.error("Failed to delete faclility:", error);
        toast.error("Failed to delete business unit.");
      },
    }
  );

  const handleDelete = async () => {
    try {
      await deleteFacilityById();
    } catch (error) {
      console.error("Failed to delete business unit:", error);
    }
  };

  if (fetchFacilitybyId) return <div className="mt-10">Loading...</div>;

  return (
    <div className="w-full flex flex-col gap-4 pr-5 pl-5 text-primary">
      <Toaster />
      <div className="lg:w-1/2 md:w-full lg:max-h-[80vh] lg:h-[80vh] md:max-h-[80vh] md:h-[45vh] flex flex-col justify-end border border-primarybold rounded p-8 mt-6">
        <div className="w-full h-full overflow-auto rounded grid grid-cols-1">
          <div className="w-full h-full p-6 border bg-gray-100 rounded">
            <div className="w-full h-full flex flex-col gap-4">
              <div className="w-full h-[4rem] flex flex-row items-center p-4 justify-between rounded-t rounded-tr bg-gradient-to-r from-primary to-primarybold">
                <button
                  onClick={() => navigate("/dashboard/facility",{ state: { refetch: true } })}
                  className="bg-transparent"
                >
                  <FaArrowLeft size={20} color="white" />
                </button>
                <button
                  onClick={() => setisEdit(!isEdit)}
                  className="min-h-8 border border-white bg-transparent text-white"
                >
                  {isEdit ? "Close" : "Update Info"}
                </button>
              </div>
              <div className="w-full h-full">
                <form
                  className="w-full h-full overflow-y-auto flex flex-col gap-4"
                  action=""
                  onSubmit={handleUpdate}
                >
                  <div className="w-full h-auto grid grid-cols-2">
                    <div>
                      <p className="text-left mt-2 ml-3 font-semibold">
                      Business Unit:
                      </p>
                    </div>
                    <input
                      className={clsx(
                        "w-full border text-black focus:outline-none rounded p-2",
                        {
                          "border-purple-800": isEdit,
                          "border-transparent": !isEdit,
                        }
                      )}
                      type="text"
                      disabled={!isEdit}
                      name="name"
                      value={facilityData.name || ""}
                      placeholder={facilityData.name || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="w-full h-auto grid grid-cols-2">
                    <div>
                      <p className="text-left mt-2 ml-3 font-semibold">
                        Phone Number:
                      </p>
                    </div>
                    <input
                      className={clsx(
                        "w-full border text-black focus:outline-none rounded p-2",
                        {
                          "border-purple-800": isEdit,
                          "border-transparent": !isEdit,
                        }
                      )}
                      type="text"
                      disabled={!isEdit}
                      name="phone"
                      value={facilityData.phone || ""}
                      placeholder={facilityData.phone || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="w-full h-auto grid grid-cols-2">
                    <div>
                      <p className="text-left mt-2 ml-3 font-semibold">
                        Email:
                      </p>
                    </div>
                    <input
                      className={clsx(
                        "w-full border text-black focus:outline-none rounded p-2",
                        {
                          "border-purple-800": isEdit,
                          "border-transparent": !isEdit,
                        }
                      )}
                      type="email"
                      disabled={!isEdit}
                      name="email"
                      value={facilityData.email || ""}
                      placeholder={facilityData.email|| ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="w-full h-auto grid grid-cols-2">
                    <div>
                      <p className="text-left mt-2 ml-3 font-semibold">
                        Establishment:
                      </p>
                    </div>
                    {isEdit ? (
                      <div className="w-full mt-0 mb-16 relative">
                        <CustomDropdown
                          label=""
                          isLabel={false}
                          options={establishmentOptions}
                          setOption={setEstablishment}
                        />
                      </div>
                    ) : (
                      <input
                        className="w-full border text-black border-transparent focus:outline-none rounded p-2"
                        type="text"
                        name="id"
                        disabled={true}
                        value={facilityData.establishment.name || ""}
                        placeholder={facilityData.establishment.name|| ""}
                        onChange={handleInputChange}
                      />
                    )}
                  </div>

                  {isEdit ? (
                    <div className="w-full h-12 mt-4">
                      <button
                        type="submit"
                        className="w-full h-full flex flex-row items-center justify-center text-white bg-gradient-to-r from-primary to-primarybold"
                      >
                        {updateFacilityLoading ? (
                          <LoadingButton size={20} />
                        ) : (
                          "Save Changes"
                        )}
                      </button>
                    </div>
                  ) : (
                    <div></div>
                  )}
                  {isEdit ? (
                    <div className="w-full h-12">
                      <button
                        type="button"
                        onClick={handleDelete}
                        className="w-full h-full flex flex-row items-center justify-center text-white bg-gradient-to-r from-primary to-primarybold"
                      >
                        {deleteFacilityLoading ? (
                          <LoadingButton size={20} />
                        ) : (
                          "Delete"
                        )}
                      </button>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </form>
              </div>
            </div>
          </div>
          {/* <div></div> */}
        </div>
      </div>
    </div>
  );
};
export default FacilityDetail;
