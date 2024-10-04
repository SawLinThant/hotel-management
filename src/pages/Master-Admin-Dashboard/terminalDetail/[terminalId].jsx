import { useNavigate, useParams } from "react-router-dom";
import InputField from "../../../modules/common/components/input-field";
import { useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa";
import { useQuery, useMutation } from "@apollo/client";
import { GET_TERMINAL_BY_ID } from "../../../graphql/query/terminal-query";
import { useEffect, useState } from "react";
import { GET_FACILITIES } from "../../../graphql/query/facilities-query";
import CustomDropdown from "../../../modules/common/components/custom-dropdown";
import clsx from "clsx";
import { UPDATE_TERMINAL_BY_ID } from "../../../graphql/mutation/terminal-mutation";
import toast, { Toaster } from "react-hot-toast";
import LoadingButton from "../../../modules/common/icon/loading-icon";

const TerminalDetail = () => {
  const { terminalId } = useParams();
  const navigate = useNavigate();
  const [isEdit, setisEdit] = useState(false);
  const [facility, setFacility] = useState();
  const [facilityOptions, setFacilityOptions] = useState();
  const { register: terminalRegister, handleSubmit: updateTerminal } =
    useForm();
  const { data: getTerminalbyId, loading: fetchTerminalbyId } = useQuery(
    GET_TERMINAL_BY_ID,
    {
      variables: { id: terminalId },
    }
  );

  const [terminalData, setTerminalData] = useState({
    id: "",
    terminal_number: "",
    password: "",
    facility_id: "",
    disabled: "",
    created_at: "",
    updated_at: "",
    hotel_group:"",
    facility: {
      id: "",
      name: "",
    },
  });

  const {
    data: getFacility,
    loading: fetchFacility,
    error: fetchFacilityError,
  } = useQuery(GET_FACILITIES, {
  });

  useEffect(() => {
    if (getFacility && getFacility.facilities) {
      setFacilityOptions(getFacility.facilities);
    }
  }, [getFacility]);

  useEffect(() => {
    if (getTerminalbyId) {
      setTerminalData(getTerminalbyId.terminals[0]);
    }
  }, [getTerminalbyId]);

  useEffect(() => {
    console.log(facility);
    if (facility) {
      setTerminalData((prevData) => ({
        ...prevData,
        facility_id: facility,
      }));
    }
  }, [facility]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTerminalData({
      ...terminalData,
      [name]: value,
    });
  };

  const handleRadioChange = (status) => {
    setTerminalData((prevData) => ({
      ...prevData,
      disabled: status,
    }));
  };

  const [updateTerminalById, { loading: updateTerminalLoading }] = useMutation(
    UPDATE_TERMINAL_BY_ID
  );

  const handleUpdate = async (e) => {
    e.preventDefault();
    //console.log(terminalData.facility_id)
    try {
      await updateTerminalById({
        variables: {
          id: terminalData.id,
          terminal_number: terminalData.terminal_number,
          password: terminalData.password,
          facility_id: terminalData.facility_id,
          disabled: terminalData.disabled,
          hotel_group: terminalData.hotel_group
        },
      });
      toast.success("Saved changes");
    } catch (error) {
      console.error("Failed to update terminal:", error);
      toast.error("Failed to update terminal.");
    }
  };

  if (fetchTerminalbyId) return <div className="mt-10">Loading...</div>;

  return (
    <div className="w-full flex flex-col gap-4 pr-5 pl-5 text-primary">
      <Toaster />
      <div className="lg:w-1/2 md:w-full lg:max-h-[80vh] lg:h-[80vh] md:max-h-[80vh] md:h-[40vh] flex flex-col justify-end border border-primarybold rounded p-8 mt-6">
        <div className="w-full h-full overflow-auto rounded grid grid-cols-1">
          <div className="w-full h-full p-6 border bg-gray-100 rounded">
            <div className="w-full h-full flex flex-col gap-4">
              <div className="w-full h-[4rem] flex flex-row items-center p-4 justify-between rounded-t rounded-tr bg-gradient-to-r from-primary to-primarybold">
                <button
                  onClick={() => navigate("/dashboard/terminal",{ state: { refetch: true } })}
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
                        Terminal Number:
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
                      name="terminal_number"
                      value={terminalData.terminal_number || ""}
                      placeholder={terminalData.terminal_number || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="w-full h-auto grid grid-cols-2">
                    <div>
                      <p className="text-left mt-2 ml-3 font-semibold">Business Unit:</p>
                    </div>
                    {isEdit ? (
                      <div className="w-full mt-0 mb-16 relative">
                        <CustomDropdown
                          label=""
                          isLabel={false}
                          options={facilityOptions}
                          setOption={setFacility}
                        />
                      </div>
                    ) : (
                      <input
                        className="w-full border text-black border-transparent focus:outline-none rounded p-2"
                        type="text"
                        name="id"
                        disabled={true}
                        value={terminalData.facility.name || ""}
                        placeholder={terminalData.facility.name || ""}
                        onChange={handleInputChange}
                      />
                    )}
                  </div>
                  {isEdit ? (
                    <div className="w-full grid grid-cols-2">
                      <div className="flex flex-row items-center gap-2">
                        <input
                        className="ml-3"
                          type="radio"
                          disabled={!isEdit}
                          name="customerStatus"
                          value="enabled"
                          checked={!terminalData.disabled}
                          onChange={() => handleRadioChange(false)}
                        />
                        <p>Enabled</p>
                      </div>
                      <div className="flex flex-row items-center gap-2">
                        <input
                          type="radio"
                          isabled={!isEdit}
                          name="customerStatus"
                          value="disabled"
                          checked={terminalData.disabled}
                          onChange={() => handleRadioChange(true)}
                        />
                        <p>Disable</p>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full grid grid-cols-2">
                      <div>
                        <p className="text-left mt-2 ml-3 font-semibold">Status</p>
                      </div>
                      <div>
                        <p className="text-left mt-2 ml-[0.6rem]">
                          {terminalData.disabled ? "Disabled" : "Active"}
                        </p>
                      </div>
                    </div>
                  )}

                  {isEdit ? (
                    <div className="w-full h-12 mt-4">
                      <button
                        type="submit"
                        className="w-full h-full flex flex-row items-center justify-center text-white bg-gradient-to-r from-primary to-primarybold"
                      >
                        {updateTerminalLoading ? (
                          <LoadingButton size={20} />
                        ) : (
                          "Save Changes"
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
export default TerminalDetail;
