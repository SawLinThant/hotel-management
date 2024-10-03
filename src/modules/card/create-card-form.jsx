import { useNavigate } from "react-router-dom";
import InputField from "../common/components/input-field";
import { useMutation } from "@apollo/client";
import { CREATE_CARD } from "../../graphql/mutation/card-mutation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import LoadingButton from "../common/icon/loading-icon";
import toast, { Toaster } from "react-hot-toast";
import bcrypt from 'bcryptjs';
import { useAccount } from "../../lib/context/account-context";

const CreateCard = () => {
  const navigate = useNavigate();
  const {userType} = useAccount();
  const {
    register: cardRegister,
    handleSubmit: createCardSubmit,
    reset,
  } = useForm();
  const [createCard, { loading: createCardLoading }] =
    useMutation(CREATE_CARD);

  const handleCreateCard = createCardSubmit(async (credentials) => {
      try {
        await createCard({
          variables: {
            card_number: credentials.card_number,
            card_password: "",
            hotel_group: userType,
          },
        });
        toast.success("Card created successfully");
        reset();
      } catch (err) {
        toast.error("Cannot Create Card");
        console.error("Error creating card:", err);
      }
    
  });

  return (
    <div className=" mt-8 w-full h-full relative p-5 flex flex-col items-center justify-center overflow-y-auto">
      <Toaster />
      <div className="min-w-[20rem] border border-primarybold p-8 flex flex-col gap-12 rounded">
        <div>
          <h3 className="text-left text-2xl text-primarybold font-semibold">
            Create Card
          </h3>
        </div>
        <div className="w-full">
          <form
            onSubmit={handleCreateCard}
            className="w-full flex flex-col gap-6"
            action=""
          >
            <div className="w-full h-full grid grid-cols-1 gap-4">
              <div className="flex flex-col items-start gap-2 pb-4">
                <InputField
                  label="CardNumber"
                  name="card_number"
                  placeholder="Enter CardNumber"
                  inputType="number"
                  fullSize={true}
                  require={cardRegister}
                />
              </div>
            </div>
            <div className="h-12 w-full flex flow-row gap-4 items-center justify-between">
              <button
                type="submit"
                className="flex flex-row items-center justify-center transition min-w-28 duration-500 border-primary text-white from-primary to-primarybold rounded font-light bg-gradient-to-l"
              >
                {createCardLoading ? <LoadingButton size={20} /> : "Create"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/dashboard/card",{ state: { refetch: true } })}
                className="transition min-w-28 duration-500 border-primary text-white from-primary to-primarybold rounded font-light bg-gradient-to-l"
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
export default CreateCard;
