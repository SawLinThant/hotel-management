import { useNavigate, useParams } from "react-router-dom";
import InputField from "../../../modules/common/components/input-field";
import { useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa";
import { useQuery, useMutation } from "@apollo/client";
import { GET_CUSTOMERS_BY_ID } from "../../../graphql/query/customer-query";
import { useEffect, useState } from "react";
import CustomDropdown from "../../../modules/common/components/custom-dropdown";
import clsx from "clsx";
import toast, { Toaster } from "react-hot-toast";
import LoadingButton from "../../../modules/common/icon/loading-icon";
import { UPDATE_CUSTOMER_BY_ID } from "../../../graphql/mutation/customer-mutation";
import { CARD_REGISTER } from "../../../graphql/mutation/card-mutation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const CustomerDetail = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const [isEdit, setisEdit] = useState(false);
  const [isRegister, setIsregister] = useState(false);
  const [isAmountVisible, setIsAmountVisible] = useState({});
  const [
    cardRegisters,
    { loading: cardRegisterLoading, error: cardRegisterError },
  ] = useMutation(CARD_REGISTER);
  const {
    register: cardRegister,
    reset: cardRegisterReset,
    handleSubmit: cardRegisterSubmit,
  } = useForm();
  const { data: getCustomerbyId, loading: fetchCustomerbyId } = useQuery(
    GET_CUSTOMERS_BY_ID,
    {
      variables: { id: customerId },
    }
  );

  const toggleVisibility = (cardId) => {
    setIsAmountVisible((prevState) => ({
      ...prevState,
      [cardId]: !prevState[cardId],
    }));
  };

  const cards =
    getCustomerbyId && getCustomerbyId.customers.length > 0
      ? getCustomerbyId.customers[0].cards
      : [];

  console.log(cards);

  const [customerData, setCustomerData] = useState({
    id: "",
    name: "",
    phone: "",
    email: "",
    card_id: "",
    created_at: "",
    updated_at: "",
    disabled: "",
    hotel_group:"",
    unique_password: "",
    cards: {
      id: "",
      card_number: "",
      balance: "",
    },
  });

  const date = new Date(customerData.created_at);
  const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString(
    [],
    { hour: "2-digit", minute: "2-digit" }
  )}`;

  useEffect(() => {
    if (getCustomerbyId) {
      setCustomerData(getCustomerbyId.customers[0]);
    }
  }, [getCustomerbyId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({
      ...customerData,
      [name]: value,
    });
  };

  const handleRadioChange = (status) => {
    setCustomerData((prevData) => ({
      ...prevData,
      disabled: status,
    }));
  };

  const [updateCustomerById, { loading: updateCustomerLoading }] = useMutation(
    UPDATE_CUSTOMER_BY_ID
  );

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log(customerData);
    try {
      await updateCustomerById({
        variables: {
          id: customerData.id,
          name: customerData.name,
          phone: customerData.phone,
          email: customerData.email,
          disabled: customerData.disabled,
          hotel_group: customerData.hotel_group
        },
      });
      toast.success("Saved changes");
    } catch (error) {
      console.error("Failed to update customer:", error);
      toast.error("Failed to update customer.");
    }
  };

  const handleCardRegister = cardRegisterSubmit(async (credentials) => {
    if (credentials.card_password !== credentials.confirm_password) {
      toast.error("Please Confirm Password");
    } else if (credentials.card_number.length > 6) {
      toast.error("Invalid Card");
    } else if (
      credentials.card_password.length > 4 ||
      isNaN(credentials.card_password) ||
      credentials.card_password.length < 4
    ) {
      toast.error("Password should contain 4 numbers");
    } else {
      try {
        await cardRegisters({
          variables: {
            card_number: credentials.card_number.toString(),
            card_password: credentials.card_password,
            customer_id: customerId,
          },
        });
        toast.success("Card added");
        cardRegisterReset();
      } catch (error) {
        console.log("error registering card");
        toast.error("Enable to register");
      }
    }
  });

  if (fetchCustomerbyId) return <div className="w-full h-[50vh] flex items-center justify-center">Loading</div>;

  return (
    <div className="w-full flex flex-col gap-4 pr-5 pl-5 text-primary">
      <Toaster />
      <div className="w-full lg:min-h-[80vh] lg:h-[80vh] flex flex-col justify-end border border-primarybold rounded p-8 mt-6">
        <div className="w-full h-full overflow-hidden rounded lg:grid lg:grid-cols-2 md:grid md:grid-cols-1 lg:gap-3 md:gap-4">
          <div className="w-full lg:max-h-[70vh] md:min-h-[40vh] p-6 border bg-gray-100 rounded">
            <div className="w-full h-full flex flex-col gap-4">
              <div className="w-full h-[4rem] flex flex-row items-center p-4 justify-between rounded-t rounded-tr bg-gradient-to-r from-primary to-primarybold">
                <button
                  onClick={() => navigate("/masteradmindashboard",{ state: { refetch: true } })}
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
                        Customer Name:
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
                      value={customerData.name || ""}
                      placeholder={customerData.name || ""}
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
                      value={customerData.phone || ""}
                      placeholder={customerData.phone || ""}
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
                      value={customerData.email || ""}
                      placeholder={customerData.email || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="w-full h-auto grid grid-cols-2">
                      <div>
                        <p className="text-left mt-2 ml-3 font-semibold">
                          Created Time:
                        </p>
                      </div>
                      <input
                        className={clsx(
                          "w-full border-none text-black focus:outline-none rounded p-2",
                          // {
                          //   "border-transparent": isEdit,
                          //   "border-transparent": !isEdit,
                          // }
                        )}
                        type="text"
                        disabled={true}
                        name="created_at"
                        value={formattedDate || ""}
                        placeholder={formattedDate || ""}
                        onChange={handleInputChange}
                      />
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
                          checked={!customerData.disabled}
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
                          checked={customerData.disabled}
                          onChange={() => handleRadioChange(true)}
                        />
                        <p>Disable</p>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full grid grid-cols-2">
                      <div>
                        <p className="text-left mt-2 ml-3 font-semibold">
                          Status
                        </p>
                      </div>
                      <div>
                        <p className="text-left mt-2 ml-[0.6rem]">
                          {customerData.disabled ? "Disabled" : "Active"}
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
                        {updateCustomerLoading ? (
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
          <div className="w-full lg:max-h-[70vh] md:min-h-[40vh] p-6 border bg-gray-100 rounded">
            <div className="w-full h-full flex flex-col gap-4 px-4 overflow-hidden">
              <div className="w-full h-[4rem] flex flex-row items-center p-4 justify-between rounded-t rounded-tr bg-gradient-to-r from-primary to-primarybold">
                {/* <button
                  onClick={() => navigate("/dashboard/customer")}
                  className="bg-transparent"
                >
                  <FaArrowLeft size={20} color="white" />
                </button> */}
                <button
                  onClick={() => setIsregister(!isRegister)}
                  className="min-h-8 border border-white bg-transparent text-white"
                >
                  {isRegister ? "Cards" : "Add Card"}
                </button>
              </div>
              <div
                id="customer-cardlist"
                className="w-full h-4/5 overflow-auto"
              >
                {isRegister ? (
                  <form
                    className="w-full h-full overflow-y-auto flex flex-col gap-4"
                    action=""
                    onSubmit={handleCardRegister}
                  >
                    <div className="w-full h-12 grid grid-cols-2">
                      <div>
                        <p className="text-left mt-2 ml-3 font-semibold">
                          Card No
                        </p>
                      </div>
                      <div>
                        <InputField
                          label=""
                          isLabel={false}
                          name="card_number"
                          placeholder="Enter CardNumber"
                          inputType="number"
                          fullSize={true}
                          require={cardRegister}
                        />
                      </div>
                    </div>
                    <div className="w-full h-12 grid grid-cols-2">
                      <div>
                        <p className="text-left mt-2 ml-3 font-semibold">
                          Password
                        </p>
                      </div>
                      <div>
                        <InputField
                          label=""
                          isLabel={false}
                          name="card_password"
                          placeholder="Enter Password"
                          inputType="password"
                          fullSize={true}
                          require={cardRegister}
                        />
                      </div>
                    </div>
                    <div className="w-full h-12 grid grid-cols-2">
                      <div>
                        <p className="text-left mt-2 ml-3 font-semibold">
                          Confirm Password
                        </p>
                      </div>
                      <div>
                        <InputField
                          label=""
                          isLabel={false}
                          name="confirm_password"
                          placeholder="Confirm Password"
                          inputType="password"
                          fullSize={true}
                          require={cardRegister}
                        />
                      </div>
                    </div>
                    <div className="w-full h-12 mt-4">
                      <button
                        type="submit"
                        className="w-full h-full flex flex-row items-center justify-center text-white bg-gradient-to-r from-primary to-primarybold"
                      >
                        {cardRegisterLoading ? (
                          <LoadingButton size={20} />
                        ) : (
                          "Register"
                        )}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="w-full h-full flex flex-col gap-4">
                    {cards && cards.length > 0 ? (
                      <div className="w-full h-full  flex flex-col gap-4">
                        {cards.map((card) => (
                          <div
                            key={card.id}
                            className="grid grid-cols-2 w-full min-h-20 p-2 border border-purple-800 rounded"
                          >
                            <div>
                              <p className="text-left font-semibold mt-1">
                                Card No - {card.card_number}
                              </p>
                            </div>
                            <div className="w-full h-full grid grid-cols-1">
                              <div className="w-full h-full flex flex-row justify-between gap-8 items-center">
                                <button
                                  className="ml-4 bg-transparent border-none outline-none focus:outline-none"
                                  onClick={() => toggleVisibility(card.id)}
                                >
                                  {isAmountVisible[card.id] ? (
                                    <FaEyeSlash color="purple" />
                                  ) : (
                                    <FaEye color="purple" />
                                  )}
                                </button>
                                {isAmountVisible[card.id] ? (
                                  <p className="text-right font-semibold">
                                    {card.balance.toLocaleString()} KS
                                  </p>
                                ) : (
                                  "*********"
                                )}
                              </div>

                              <p className="text-right text-gray-600 font-normal">
                                {card.disabled ? "Disabled" : "Active"}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <p className="text-primary font-bold">
                          No Available Card Yet!
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CustomerDetail;
