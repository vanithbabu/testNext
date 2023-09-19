"use client";
import { useForm, FormProvider, Controller } from "react-hook-form";
import Bugsnag from '@/lib/bugsnagConfig'
import { useState, useEffect } from "react";
import {
  InputBox,
  AddCard,
  ChangePassword,
  ModalPopup,
  CustomButton,
} from "@/components";
import { dashboardStyle, profileInputLabelStyle } from "@/styles";
import Image from "next/image";
import TrashImg from '@/public/assets/icons/trash.svg';
import AddNewCardImg from '@/public//assets/icons/add-new.svg';
import { ProfileSchema } from "@/validations/dashboard.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { deleteApi, postApi, patchApi } from "@/lib/apiCallMethod";
import { useAppSelector, useAppDispatch } from "@/store";
import { Toast,capitalizeFirstWord} from "@/lib/toast";
import { errorToast } from "@/constants/utis";
import { ProfileFormValues } from "@/types";
import { fetchDashboard } from "@/lib/apiCall";
import { fetchProfile } from "@/store/features/profile/profileSlice";
import { fetchCreditCard } from "@/store/features/creditCard/creditCardSlice";
import { fetchFrequency } from "@/store/features/frequency/frequencySlice";
import { fetchzipcode } from "@/store/features/zipcode/zipcodeSlice";
import {fetchAddress} from '@/store/features/address/addressSlice';
import Link from "next/link";
import { fetchUser } from "@/store/features/createUser/createUserSlice";
import Loading from "./loading";
export default function Profile() {
  const dispatch = useAppDispatch();
  const [btnDisable, setbtnDisable] = useState(false)
  const userID = useAppSelector((state) => state.auth.userID);
  const first_name = useAppSelector((state) => state.profile.first_name);
  const last_name = useAppSelector((state) => state.profile.last_name);
  const email = useAppSelector((state) => state.profile.email);
  const phone = useAppSelector((state) => state.profile.phone);
  const [firstName,setFirstName]=useState('');
  const S_address: any = useAppSelector(
    (state) => state.profile.address_services
  );
  const {cards} = useAppSelector((state) => state.creditCards);
  const [creditData,setCreditData]=useState<any>([]);
  const [modal, setModal] = useState(false);
  const [ModalTemplate, setModalTemplate] = useState("");
  const[loading,setLoading]= useState(true);
  const [address, setAddress] = useState({ formatted_address: "" });
 
  const HandleFormatPhone = (value : any) => {
    const phone = value;
    const cleanedInput = phone.replace(/-/g, '');
    if (cleanedInput.length >= 10) {
    const cleanedAndTrimmed = cleanedInput.slice(0, 10);
    if (cleanedAndTrimmed) {
      const formattedPhoneNumber =
        cleanedAndTrimmed.slice(0, -4).match(/.{1,3}/g).join('-') +
        '-' +
      cleanedAndTrimmed.slice(-4);
      methods.setValue('phone', formattedPhoneNumber);
    }
  }
    
  }
  useEffect(() => {
    setAddress(S_address);
    setFirstName(first_name);
    setCreditData(cards);
    methods.setValue("first_name", first_name);
    methods.setValue("last_name", last_name);
    methods.setValue("email", email);
    HandleFormatPhone(phone);
    setLoading(false);
  }, [first_name,last_name,email,phone,S_address,cards]);

  const methods = useForm<ProfileFormValues>({
    defaultValues: {
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone: phone,
    },
    resolver: yupResolver(ProfileSchema),
    resetOptions: {
      keepDirtyValues: true,
    },
  });

  const handleModalClose = () => {
    setModal(!modal);
  };
  const handleModalOpen = (template: string) => {
    setModalTemplate(template);
    setModal(true);
  };
  const handleModalSubmit = () => {
    setModal(false);
  };

  const DeleteCard = async (id: string) => {
    try {
      const response = await deleteApi(
        `/v4/users/${userID}/credit-cards/${id}`
      );
      if (response.success) {
        await fetchDashboard(
          dispatch,
          fetchProfile,
          fetchCreditCard,
          fetchFrequency,
          fetchzipcode,
          fetchUser,
          fetchAddress
        );
        Toast({ type: "success", message: "Credit card delete successfully" });
      } else {
        if (response.error == "Unauthorized") {
        
          Toast({ type: "error", message: capitalizeFirstWord(response.data) });
        } else {
          if (response.data) {
           
            Toast({ type: "error", message: capitalizeFirstWord(response.data) });
          } else {
            Toast({ type: "error", message: capitalizeFirstWord(response.error) });
          }
        }
      }
    } catch (error: any) {
      Bugsnag.notify(error);
      errorToast();
    }
  };

  const MakePrimaryCard = async (id: string) => {
    try {
      const response = await patchApi(
        `/v4/users/${userID}/credit-cards/${id}`,
        { status: "PRIMARY" }
      );
      if (response.success) {
        await fetchDashboard(
          dispatch,
          fetchProfile,
          fetchCreditCard,
          fetchFrequency,
          fetchzipcode,
          fetchUser,
          fetchAddress
        );
        Toast({ type: "success", message: "Credit card updated successfully" });
      } else {
        if (response.error == "Unauthorized") {
        
          Toast({ type: "error", message: capitalizeFirstWord(response.data) });
        } else {
          if (response.data) {
          
            Toast({ type: "error", message: capitalizeFirstWord(response.data) });
          } else {
            Toast({ type: "error", message: capitalizeFirstWord(response.error) });
          }
        }
      }
    }catch (error: any) {
      Bugsnag.notify(error);
      errorToast();
    }
  };

  const onSubmit = async (values: any) => {
    setbtnDisable(true);
    try {
      const response = await postApi(`/v6/users/${userID}`, values);
      if (response.success) {
        fetchDashboard(dispatch, fetchProfile, fetchCreditCard, fetchFrequency,fetchzipcode,fetchUser,fetchAddress);
        Toast({
          type: "success",
          message: "User details updated successfully",
        });
      } else {
        if (response.error == "Bad Request") {
    
          Toast({ type: "error", message: capitalizeFirstWord(response.data) });
        } else {
          if (response.data && response.data.error) {
       
          } else {
            Toast({ type: "error", message: capitalizeFirstWord(response.error) });
          }
        }
      }
    } catch (error: any) {
      Bugsnag.notify(error);
      console.error("Error fetching data:", error);
      errorToast();
    }
    setbtnDisable(false);
  };
  if(loading)
  {
   return <Loading></Loading>;
  }
  return (
    <div className="p-4 lg:ml-[300px]">
      <div className="px-4 lg:px-12 py-4  mx-auto">
        <h1 className="font-FuturaPTDemi text-3xl"> Welcome {firstName ?? ''}</h1>
        <hr />

        <h2 className="font-FuturaPTDemi text-2xl">Profile</h2>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="grid  grid-cols-1 md:grid-cols-[45%,45%] md:gap-x-8 lg:grid-cols-[45%,45%] lg:gap-x-16 xl:grid-cols-[40%,40%] xl:gap-x-24 mt-4">
              <InputBox
                label="First Name"
                labelStyles={`${profileInputLabelStyle} pl-6`}
                name="first_name"
                placeHolder="Enter Your First Name"
                inputStyles={`${dashboardStyle} w-full`}
                error={methods.formState.errors.first_name?.message}
                errorStyles="pl-6"
              />
              <InputBox
                label="Last Name"
                labelStyles={`${profileInputLabelStyle} pl-6`}
                name="last_name"
                placeHolder="Enter Your Last Name"
                inputStyles={`${dashboardStyle}`}
                error={methods.formState.errors.last_name?.message}
                errorStyles="pl-6"
              />
              <InputBox
                label="Email"
                labelStyles={`${profileInputLabelStyle} pl-6`}
                type="email"
                name="email"
                placeHolder="Enter Your Email"
                inputStyles={`${dashboardStyle}`}
                error={methods.formState.errors.email?.message}
                errorStyles="pl-6"
              />
              <div className="flex flex-col relative ">
              <Controller
                name="phone"
                control={methods.control}
                defaultValue=""
                render={({ field }) => (
                  <>
                    <label className={`italic ${profileInputLabelStyle}  pl-6`}>
                      Phone
                    </label>
                    <input
                      {...field}
                      type="text"
                      className={`py-3 px-4 border-2 bg-[#f9f9f9] border-[#b6b6b6] shadow-sm shadow-[#c5c1bf] font-FuturaPTBook focus:outline-none  focus:border-orange w-full ${dashboardStyle}`}
                      placeholder="___-___-____"
                      value={field.value}
                      onChange={(e) => {
                        const inputValue = e.target.value;
    
    // Use a regular expression to keep only numeric characters
    const numericValue = inputValue.replace(/[^0-9]/g, '');

    // Update the form's state with the numeric value
    field.onChange(numericValue);

    // You can also call your formatting function here if needed
    HandleFormatPhone(numericValue);
                      }}
                     
                    />
                  </>
                )}
              />
              {methods.formState.errors && (
                <span
                  role="alert"
                  className={`text-red mb-2 font-FuturaPTBook text-xl font[450]`}
                >
                  {methods.formState.errors.phone?.message}
                </span>
              )}
              </div>
            </div>

            <div className="">
              <h2 className="font-FuturaPTDemi text-2xl">Payment</h2>
              {creditData.length >0 &&creditData.map((card:any) => {
                return (
                  <div key={card.id} className="mb-4">
                    <p className="italic text-xl mt-4 font-FuturaPTBook text-gray-400">
                      Credit Card
                    </p>
                    <div className="flex flex-wrap mb-4 items-center gap-2 lg:gap-8 font-semibold">
                      <p>xxxx-xxxx-xxxx-{card.last4}</p>
                      <p>
                        {card.exp_month < 10
                          ? `0${card.exp_month}`
                          : card.exp_month.toString().padStart(2, "0")}
                        /{card.exp_year.toString().slice(-2)}
                      </p>
                      {card.status == "PRIMARY" ? (
                        <p className="text-orange">Primary</p>
                      ) : (
                        <p
                          onClick={() => MakePrimaryCard(card.id)}
                          className="text-blue cursor-pointer"
                        >
                          Make Primary
                        </p>
                      )}
                      {card.status != "PRIMARY" && (
                        <Image
                          onClick={() => DeleteCard(card.id)}
                          className="cursor-pointer"
                          src={TrashImg}
                          alt="Delete Icon"
                          width={20}
                          height={20}
                        />
                      )}
                    </div>{" "}
                  </div>
                );
              })}

              <div
                className="flex gap-2 items-center mt-6 cursor-pointer"
                onClick={() => handleModalOpen("Card")}
              >
                <Image
                  src={AddNewCardImg}
                  alt="Add New Card"
                  width={20}
                  height={20}
                />

                <p className="text-lg text-[#048ABF] font-FuturaPTMedium  font-[450] ">
                  Add Card
                </p>
              </div>
              <div className="flex justify-start mb-4 mt-6 ">
                <CustomButton
                 isDisabled={btnDisable}
                 loading={btnDisable}
                  title="Update"
                  btnType="submit"
                  inputStyles="text-md font-[450]  text-white  border px-12 py-[4px] font-FuturaPTMedium"
                  loadingStyle="md:text-md text-md"
                  loadingSize="w-4 h-4 mr-1"
                />
              </div>
            </div>
          </form>
        </FormProvider>
        <div className="grid  grid-cols-1 md:grid-cols-[45%,45%] md:gap-x-8 lg:grid-cols-[45%,45%] lg:gap-x-16 xl:grid-cols-[40%,40%] xl:gap-x-24 mt-6">
          <div>
            <h2 className="font-FuturaPTDemi text-2xl">Password</h2>
            <p className="italic text-xl font-FuturaPTBook  mt-2 text-[#1E1E1E]">
              To update your password, click the link below.
            </p>
            <p
              className="text-[#048ABF] font-FuturaPTMedium font-[450] text-xl mt-2  cursor-pointer"
              onClick={() => handleModalOpen("Change Password")}
            >
              Change Password {">>"}
            </p>
          </div>
          <div>
            <h2 className="font-FuturaPTDemi text-2xl">
              Pickup & Delivery Address
            </h2>
            <div className="flex flex-row  items-center">
              <p className="italic text-xl font-FuturaPTBook  mt-2 text-[#1E1E1E]">
                {address?.formatted_address || ""}{" "}
              </p>
              {address?.formatted_address ? (
                <div className="relative group">
                  <div className="pl-3 mt-1 transition duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                    >
                      <g transform="translate(5.396 5.396)">
                        <circle
                          cx="9"
                          cy="9"
                          r="9"
                          transform="translate(-4.396 -4.396)"
                          fill="none"
                          stroke="#0085c4"
                          strokeMiterlimit="10"
                          strokeWidth="2"
                        ></circle>
                        <path
                          d="M1.8,11.25A1.33,1.33,0,0,1,3.15,9.9a1.35,1.35,0,0,1,0,2.7A1.33,1.33,0,0,1,1.8,11.25ZM2.075,9V5.317a2.682,2.682,0,0,0,.691.076,2.282,2.282,0,0,0,1.668-.639A1.924,1.924,0,0,0,4.9,3.495a1.539,1.539,0,0,0-.373-1.089A1.2,1.2,0,0,0,3.6,2.03a1.215,1.215,0,0,0-.9.338,1.648,1.648,0,0,0-.391,1.221H0A4.077,4.077,0,0,1,.887,1.052,3.565,3.565,0,0,1,3.689,0,3.386,3.386,0,0,1,6.278.959,3.571,3.571,0,0,1,7.2,3.551a3.333,3.333,0,0,1-.9,2.424A3.452,3.452,0,0,1,4.274,7.027V9Z"
                          transform="translate(1.3 -1.5)"
                          fill="#0085c4"
                        ></path>
                      </g>
                    </svg>
                    <div className="bg-orange text-white p-3 rounded-md shadow-md absolute top-[-250px] md:top-[-180px]  -left-24 md:left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                      <div className="w-60 md:w-80 mx-auto">
                        <h3 className="pb-3  text-xl font-FuturaPTBook">
                          To change your Pickup & Delivery address, please
                          contact us by filling out our contact form. For more
                          assistance call support at{" "}
                          <a href="tel:8448548868">844-854-8868.</a>
                        </h3>
                        <Link
                          href="/contactus"
                          className="text-xl font-FuturaPTBook underline"
                        >
                          Contact Us
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      {/* model popup for add card & change password */}
      {modal ? (
        <ModalPopup
          template={
            ModalTemplate == "Card" ? (
              <AddCard
                handleModalClose={handleModalClose}
                handleModalSubmit={handleModalSubmit}
              />
            ) : (
              <ChangePassword
                handleModalClose={handleModalClose}
                handleModalSubmit={handleModalSubmit}
              />
            )
          }
        />
      ) : null}
    </div>
  );
}
