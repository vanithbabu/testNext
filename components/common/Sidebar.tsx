"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";
import useOutsideAlerter from "@/hooks/outsideClick";
import { DashboardSidebarLinks } from "@/constants";
import { ModalPopup, LogoutConfirmation } from "@/components";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch } from "@/store";
import { setLogin } from "@/store/features/auth/authSlice";
import { fetchCreditCard } from "@/store/features/creditCard/creditCardSlice";
import { fetchOrder } from "@/store/features/orders/orderSlice";
import { fetchProfile } from "@/store/features/profile/profileSlice";
import Cookies from "js-cookie";
import { fetchFrequency } from "@/store/features/frequency/frequencySlice";
import { fetchPreference } from "@/store/features/preferences/preferenceSlice";
import { fetchUser } from "@/store/features/createUser/createUserSlice";
import { fetchAddress } from "@/store/features/address/addressSlice";
import { fetchzipcode } from "@/store/features/zipcode/zipcodeSlice";
import { fetchscheduling } from "@/store/features/scheduling/schedulingSlice";
import { fetchselectedDate } from "@/store/features/selectedDate/selectedDateSlice";
import DashboardMargoLogo from '@/public/assets/images/dashboard_margo_logo.svg';

const SideBar = () => {
  const [isMobile, setMobileOpen] = useState<boolean>(false);
  const [logoutModal, setlogoutModal] = useState(false);
  const currentPathname = usePathname();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleModalClose = () => {
    setlogoutModal(false);
  };
  const handleLogout = () => {
    setMobileOpen(false);
    setlogoutModal(true);
  };

  const handleModalSubmit = () => {
    dispatch(
      setLogin({
        isAuth: false,
        token: "",
        userID: 0,
        userType: 1,
      })
    );
    dispatch(fetchCreditCard([]));
    dispatch(
      fetchProfile({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address_services: {},
        user_orders: {},
        address_time_slot: {},
      })
    );
    dispatch(fetchOrder([]));
    dispatch(fetchFrequency({ frequencyId: 3 }));
    dispatch(fetchselectedDate({ pickupDate: "", deliveryDate: "" }));
    dispatch(fetchzipcode({ zipcode: 0, available_services: [] }));
    dispatch(
      fetchscheduling({
        storeId: 0,
        address_id: 0,
        pickupDate: [],
        deliverydDate: [],
      })
    );
    dispatch(
      fetchPreference({
        delivery_loc: "",
        delivery_notes: ""
      })
    );
    dispatch(
      fetchUser({
        id: 0,
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
      })
    );
    dispatch(
      fetchAddress({
        address: "",
        city: "",
        state: "",
        address2:"",
        unitNumber:false
      })
    );
    Cookies.remove("cdone_oauth_token");
    Cookies.remove("cdone_token");
    setlogoutModal(false);
    router.push("/login");
  };
  const closeSideBar = () => {
    setMobileOpen(false);
  };

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, closeSideBar);

  return (
    <div ref={wrapperRef}>
      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-30  w-72 h-screen transition-transform -translate-x-full lg:translate-x-0 ${
          isMobile ? "translate-x-0" : ""
        }`}
        aria-label="Sidebar"
      >
        <div className="h-full  py-12  bg-blue ">
          <Link href="/dashboard" className="flex justify-center items-center">
            <Image
              src={DashboardMargoLogo}
              alt="Dashboard Margo Logo"
              width="180"
              height={92}
              priority
              placeholder="blur"
            />
          </Link>

          <ul className="hidden lg:block space-y-4 font-FuturaPTBook py-8 text-white  text-3xl">
            {DashboardSidebarLinks.map((item) => (
              <Link
                href={item.url}
                key={item.title}
                className={`py-2 px-12 block lg:-me-8  cursor-pointer ${
                  currentPathname == item.url
                    ? "bg-orange  rounded-full rounded-l-none"
                    : ""
                }  hover:bg-orange hover:lg:-me-8 hover:rounded-full hover:ease-in-out  hover:duration-300  hover:rounded-l-none `}
              >
                <li>
                  <p>{item.title}</p>
                </li>
              </Link>
            ))}

            <li
              onClick={handleLogout}
              className={`py-2 px-12 block cursor-pointer  hover:bg-orange hover:-me-8 hover:rounded-full hover:ease-in-out  hover:duration-300  hover:rounded-l-none  `}
            >
              Logout
            </li>
          </ul>

          <ul className="block lg:hidden space-y-6  font-FuturaPTBook py-8 text-white  text-3xl">
            {DashboardSidebarLinks.map((item) => (
              <Link
                key={item.title}
                href={item.url}
                onClick={() => setMobileOpen(false)}
                className={`py-2   px-12 block ${isMobile ? "-me-8" : ""} ${
                  currentPathname == item.url
                    ? "bg-orange  rounded-full rounded-l-none"
                    : ""
                }  hover:bg-orange hover:lg:-me-8 hover:rounded-full  hover:ease-in-out  hover:duration-300  hover:rounded-l-none `}
              >
                <p>{item.title}</p>
              </Link>
            ))}

            <li
              onClick={handleLogout}
              className={`py-2 px-12 block   hover:bg-orange hover:-me-8 hover:rounded-full hover:ease-in-out  hover:duration-300  hover:rounded-l-none `}
            >
              Logout
            </li>
          </ul>
        </div>
      </aside>
      <div className="px-4 pt-4">
        <button
          onClick={() => setMobileOpen(true)}
          data-drawer-target="default-sidebar"
          data-drawer-toggle="default-sidebar"
          aria-controls="default-sidebar"
          type="button"
          className="inline-flex items-center p-2  ml-3 text-sm text-blue border border-blue rounded-lg lg:hidden hover:bg-blue hover:text-white focus:outline-none focus:ring-2 focus:ring-blue"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      {logoutModal && (
        <ModalPopup
          template={
            <LogoutConfirmation
              handleModalClose={handleModalClose}
              handleModalSubmit={handleModalSubmit}
            />
          }
        />
      )}
    </div>
  );
};
export default SideBar;
