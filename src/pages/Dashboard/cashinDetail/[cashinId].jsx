import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import clsx from "clsx";
import toast, { Toaster } from "react-hot-toast";
import LoadingButton from "../../../modules/common/icon/loading-icon";
import {
  DELETE_CASHIN_AMOUNT_BY_ID,
  UPDATE_CASHIN_AMOUNT_BY_ID,
} from "../../../graphql/mutation/cashin-mutation";
import { GET_CASHIN_AMOUNT_BY_ID } from "../../../graphql/query/cash-in-query";

const CashinDetail = () => {
  const { cashinId } = useParams();
  console.log(cashinId);
  const navigate = useNavigate();
  const [isEdit, setisEdit] = useState(false);
  const { data: getCashinbyId, loading: fetchCashinbyId } = useQuery(
    GET_CASHIN_AMOUNT_BY_ID,
    {
      variables: { id: cashinId },
    }
  );

  const [cashinData, setCashinData] = useState({
    id: "",
    amount: "",
    created_at: "",
    updated_at: "",
  });

  useEffect(() => {
    if (getCashinbyId) {
      setCashinData(getCashinbyId.cashin_amounts[0]);
    }
  }, [getCashinbyId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCashinData({
      ...cashinData,
      [name]: value,
    });
  };

  const [updateCashinById, { loading: updateCashinLoading }] = useMutation(
    UPDATE_CASHIN_AMOUNT_BY_ID
  );

  const [deleteCashinById, { loading: deleteCashinLoading }] = useMutation(
    DELETE_CASHIN_AMOUNT_BY_ID,
    {
      variables: { id: cashinId },
      onCompleted: () => {
        toast.success("Deleted successfully");
        navigate("/dashboard/cashinamount");
      },
      onError: (error) => {
        console.error("Failed to delete cash-in amount:", error);
        toast.error("Failed to delete cash-in amount.");
      },
    }
  );

  const handleDelete = async () => {
    try {
      await deleteCashinById();
    } catch (error) {
      console.error("Failed to delete cash-in amount:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log(cashinData);
    try {
      await updateCashinById({
        variables: {
          id: cashinData.id,
          amount: cashinData.amount,
          updated_at: Date.now()
        },
      });
      toast.success("Saved changes");
    } catch (error) {
      console.error("Failed to update cashin:", error);
      toast.error("Failed to update cashin.");
    }
  };

  if (fetchCashinbyId) return <div></div>;

  return (
    <div className="w-full flex flex-col gap-4 pr-5 pl-5 text-primary">
      <Toaster />
      <div className="lg:w-1/2 md:w-full lg:max-h-[80vh] lg:h-[80vh] md:max-h-[80vh] md:h-[40vh] flex flex-col justify-end border border-primarybold rounded p-8 mt-6">
        <div className="w-full h-full overflow-auto rounded grid grid-cols-1">
          <div className="w-full h-full p-6 border bg-gray-100 rounded">
            <div className="w-full h-full flex flex-col gap-4">
              <div className="w-full h-[4rem] flex flex-row items-center p-4 justify-between rounded-t rounded-tr bg-gradient-to-r from-primary to-primarybold">
                <button
                  onClick={() => navigate("/dashboard/cashinamount",{ state: { refetch: true } })}
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
                        Amount:
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
                      type={`${isEdit?"number":"text"}`}
                      disabled={!isEdit}
                      name="amount"
                      value={isEdit?cashinData.amount:cashinData.amount.toLocaleString()}
                      placeholder={isEdit?cashinData.amount:cashinData.amount.toLocaleString()}
                      onChange={handleInputChange}
                    />
                  </div>

                  {isEdit ? (
                    <div className="w-full h-12 mt-6">
                      <button
                        type="submit"
                        className="w-full h-full flex flex-row items-center justify-center text-white bg-gradient-to-r from-primary to-primarybold"
                      >
                        {updateCashinLoading ? (
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
                        {deleteCashinLoading ? (
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
export default CashinDetail;
