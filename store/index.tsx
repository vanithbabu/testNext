import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { authReducer } from "./features/auth/authSlice";
import { profileReducer } from "./features/profile/profileSlice";
import { creditCardReducer } from "./features/creditCard/creditCardSlice";
import { orderReducer } from "./features/orders/orderSlice";
import { preferenceReducer } from "./features/preferences/preferenceSlice";
import {frequencyReducer} from './features/frequency/frequencySlice';
import {createUserReducer} from './features/createUser/createUserSlice';
import {zipcodeReducer}from './features/zipcode/zipcodeSlice';
import { selectedDateReducer } from './features/selectedDate/selectedDateSlice';
import storage from "./customStorage";
import { persistReducer } from "redux-persist";
import { schedulingReducer } from "./features/scheduling/schedulingSlice";
import { addressReducer } from "./features/address/addressSlice";
const authPersistConfig = {
  key: "auth",
  storage: storage,
  whitelist: ["isAuth", "token","userID","userType"],
};
const profilePersistConfig = {
  key: "profile",
  storage: storage,
  whitelist: ["first_name","last_name","email","phone","address_services","user_orders","address_time_slot"],
};
const creditCardPersistConfig = {
  key: "creditCards",
  storage: storage,
  whitelist: ["cards"],
};
const orderPersistConfig = {
  key: "orders",
  storage: storage,
  whitelist: ["orders"],
};
const preferencePersistConfig = {
  key: "preferences",
  storage: storage,
  whitelist: ["delivery_loc","delivery_notes","unit_number"],
};
const frequencyPersistConfig = {
  key: "frequency",
  storage: storage,
  whitelist: ["frequencyId"],
};

const createUserPersistConfig = {
  key: "createUser",
  storage: storage,
  whitelist: ["first_name","last_name","email","phone","id"],
};
const zipcodePersistConfig = {
  key: "zipcode",
  storage: storage,
  whitelist: ["zipcode","available_services"],
};

const schedulingPersistConfig = {
  key: "scheduling",
  storage: storage,
  whitelist: ["storeId","address_id","pickupDate","deliverydDate"],
};

const selectedDatePersistConfig = {
  key: "selectedDate",
  storage: storage,
  whitelist: ["pickupDate","deliveryDate"],
};

const addressPersistConfig = {
  key: "address",
  storage: storage,
  whitelist: ["address","city","state","address2","unitNumber"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  profile: persistReducer(profilePersistConfig,profileReducer),
  creditCards: persistReducer(creditCardPersistConfig,creditCardReducer),
  orders: persistReducer(orderPersistConfig,orderReducer),
  preference:persistReducer(preferencePersistConfig,preferenceReducer),
  frequency:  persistReducer(frequencyPersistConfig,frequencyReducer),
  createUser:  persistReducer(createUserPersistConfig,createUserReducer),
  zipcode:persistReducer(zipcodePersistConfig,zipcodeReducer),
  scheduling:persistReducer(schedulingPersistConfig,schedulingReducer),
  selectedDate:persistReducer(selectedDatePersistConfig,selectedDateReducer),
  address:persistReducer(addressPersistConfig,addressReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({ serializableCheck: false }).concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;