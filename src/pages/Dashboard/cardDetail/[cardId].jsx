import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useQuery, useMutation } from "@apollo/client";
import { GET_CARDS_BY_ID } from "../../../graphql/query/card-query";
import { useEffect, useState } from "react";
import clsx from "clsx";
import toast, { Toaster } from "react-hot-toast";
import nProgress from "nprogress";
import LoadingButton from "../../../modules/common/icon/loading-icon";
import { UPDATE_CARD_BY_ID } from "../../../graphql/mutation/card-mutation";

const CardDetail = () => {
  const { cardId } = useParams();
  const navigate = useNavigate();
  const [isEdit, setisEdit] = useState(false);
  const { data: getCardbyId, loading: fetchCardbyId } = useQuery(
    GET_CARDS_BY_ID,
    {
      variables: { id: cardId },
      onCompleted: () => nProgress.done(),
    }
  );

  const [cardData, setCardData] = useState({
    id:"",
    card_number:"",
    card_password:"",
    balance:"",
    disabled:"",
    updated_at:"",
    hotel_group:"",
    customer:{
      id: "",
      name: ""
    }
  });

  console.log(cardData.customer)

  useEffect(() => {
    if (fetchCardbyId) {
      nProgress.start();
    } else {
      nProgress.done();
    }
    return () => nProgress.done(); // Clean up to stop progress bar
  }, [fetchCardbyId]);

  useEffect(() => {
    if (getCardbyId) {
      setCardData(getCardbyId.cards[0]);
    }
  }, [getCardbyId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardData({
      ...cardData,
      [name]: value,
    });
  };

  const handleRadioChange = (status) => {
    setCardData((prevData) => ({
      ...prevData,
      disabled: status,
    }));
  };

  const [updateCardById, { loading: updateCardLoading }] = useMutation(
    UPDATE_CARD_BY_ID
  );

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateCardById({
        variables: {
          id: cardData.id,
          card_number: cardData.card_number,
          card_password:cardData.card_password,
          balance: cardData.balance,
          disabled: cardData.disabled,
          hotel_group:cardData.hotel_group,
        },
      });
      toast.success("Saved changes");
    } catch (error) {
      console.error("Failed to update card:", error);
      toast.error("Failed to update card.");
    }
  };

  if (fetchCardbyId) return <div></div>;

  return (
    <div className="w-full flex flex-col gap-4 pr-5 pl-5 text-primary">
      <Toaster />
      <div className="lg:w-1/2 md:w-full lg:max-h-[80vh] lg:h-[80vh] md:max-h-[80vh] md:h-[45vh] flex flex-col justify-end border border-primarybold rounded p-8 mt-6">
        <div className="w-full h-full overflow-auto rounded grid grid-cols-1">
          <div className="w-full h-full p-6 border bg-gray-100 rounded">
            <div className="w-full h-full flex flex-col gap-4">
              <div className="w-full h-[4rem] flex flex-row items-center p-4 justify-between rounded-t rounded-tr bg-gradient-to-r from-primary to-primarybold">
                <button
                  onClick={() => navigate("/dashboard/card",{ state: { refetch: true } })}
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
                        Card Number:
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
                      name="card_number"
                      value={cardData.card_number|| ""}
                      placeholder={cardData.card_number || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="w-full h-auto grid grid-cols-2">
                    <div>
                      <p className="text-left mt-2 ml-3 font-semibold">
                        Balance:
                      </p>
                    </div>
                    <input
                      className={clsx(
                        "w-full border text-black focus:outline-none rounded border-transparent p-2",
                        // {
                        //   "border-purple-800": isEdit,
                        //   "border-transparent": !isEdit,
                        // }
                      )}
                      type="text"
                      disabled={true}
                      name="balance"
                      value={!cardData.customer?"Unregistered": cardData.balance.toLocaleString()}
                      placeholder={!cardData.customer?"Unregistered": cardData.balance.toLocaleString()}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="w-full h-auto grid grid-cols-2">
                    <div>
                      <p className="text-left mt-2 ml-3 font-semibold">
                        Customer:
                      </p>
                    </div>
                    <input
                      className={clsx(
                        "w-full border text-black focus:outline-none rounded border-transparent p-2",
                        // {
                        //   "border-purple-800": isEdit,
                        //   "border-transparent": !isEdit,
                        // }
                      )}
                      type="text"
                      disabled={true}
                      name="balance"
                      value={!cardData.customer?"Unregistered": cardData.customer.name}
                      placeholder={!cardData.customer?"Unregistered": cardData.customer.name}
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
                          name="cardStatus"
                          value="enabled"
                          checked={!cardData.disabled}
                          onChange={() => handleRadioChange(false)}
                        />
                        <p>Enabled</p>
                      </div>
                      <div className="flex flex-row items-center gap-2">
                        <input
                          type="radio"
                          isabled={!isEdit}
                          name="cardStatus"
                          value="disabled"
                          checked={cardData.disabled}
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
                          {cardData.disabled ? "Disabled" : "Active"}
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
                        {updateCardLoading ? (
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
export default CardDetail;
