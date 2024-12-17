import React, { useEffect, useState } from "react";
import logo from "/logo.png";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadSingleAddresses, updateSingleAddress } from "../../Actions/Address";
import { loadUser } from "../../Actions/User";
import { AiOutlineHome } from "react-icons/ai";
import { FaCity } from "react-icons/fa";
import { GiPostOffice } from "react-icons/gi";
import { MdPhone, MdPerson, MdPublic } from "react-icons/md";
import toast from "react-hot-toast";
import { LoadAdminImages } from "../../Actions/AdminImg";

const UpdateAddress = () => {
  const { address } = useSelector((state) => state.address);
  const {adminImages}=useSelector((status)=>status.adminImg)

  const [personName, setPersonName] = useState("");
  const [phone, setPhone] = useState("");
  const [addressHome, setAddressHome] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [country, setCountry] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  useEffect(() => {
    // dispatch(loadUser());
    dispatch(loadSingleAddresses(id));
    dispatch(LoadAdminImages())
    // dispatch({ type: "clearErrors" });
  }, [dispatch, id]);

  useEffect(() => {
    if (address) {
      setPersonName(address.name || "");
      setPhone(address.phone || "");
      setAddressHome(address.address || "");
      setCity(address.city || "");
      setState(address.state || "");
      setPincode(address.pincode || "");
      setCountry(address.country || "");
    }
  }, [address]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateSingleAddress(
        id,
        personName,
        phone,
        addressHome,
        city,
        state,
        pincode,
        country
      )
    );
    

    if (location.state && location.state.fromCheckout) {
      navigate("/checkout/shipping");
      toast.success("Address Edited!!")
    } else {
      navigate("/account/addresses");
      toast.success("Address Edited!!")
    }
  };

  const cancelHandler = () => {
    navigate("/account/addresses");
  };

  return (
    <div id="main" className="flex flex-col justify-center h-screen pb-8 md:h-[120vh] bg-blue-50">
      <div id="logo" className="flex justify-center mb-6">
        <Link to="/">
          <img className="w-36 h-20 md:w-48 md:h-28" src={adminImages[0]?.logoImg?.url} alt="Logo" />
        </Link>
      </div>

      <div className="flex justify-center items-center">
        <form
          className="bg-white shadow-xl border-2 rounded-lg p-8 w-80 md:w-96 space-y-6"
          onSubmit={submitHandler}
        >
          <h1 className="text-2xl font-semibold text-center">Update Address</h1>

          <div className="flex flex-col gap-4">
            <div className="relative">
              <MdPerson className="absolute left-3 top-3 text-blue-600" size={24} />
              <input
                className="p-3 pl-10 border rounded-md border-blue-300 focus:outline-none focus:ring-2 bg-blue-50 focus:ring-blue-500 transition-all w-full"
                type="text"
                placeholder="First and Last Name"
                value={personName}
                onChange={(e) => setPersonName(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <MdPhone className="absolute left-3 top-3 text-blue-600" size={24} />
              <input
                className="p-3 pl-10 border rounded-md border-blue-300 focus:outline-none focus:ring-2 bg-blue-50 focus:ring-blue-500 transition-all w-full"
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value) && value.length <= 10) {
                    setPhone(value);
                  }
                }}
                required
              />
            </div>
            <div className="relative">
              <AiOutlineHome className="absolute left-3 top-3 text-blue-600" size={24} />
              <input
                className="p-3 pl-10 border rounded-md border-blue-300 focus:outline-none focus:ring-2 bg-blue-50 focus:ring-blue-500 transition-all w-full"
                type="text"
                placeholder="Address"
                value={addressHome}
                onChange={(e) => setAddressHome(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <FaCity className="absolute left-3 top-3 text-blue-600" size={24} />
              <input
                className="p-3 pl-10 border rounded-md border-blue-300 focus:outline-none focus:ring-2 bg-blue-50 focus:ring-blue-500 transition-all w-full"
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <MdPublic className="absolute left-3 top-3 text-blue-600" size={24} />
              <input
                className="p-3 pl-10 border rounded-md border-blue-300 focus:outline-none focus:ring-2 bg-blue-50 focus:ring-blue-500 transition-all w-full"
                type="text"
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <GiPostOffice className="absolute left-3 top-3 text-blue-600" size={24} />
              <input
                className="p-3 pl-10 border rounded-md border-blue-300 focus:outline-none focus:ring-2 bg-blue-50 focus:ring-blue-500 transition-all w-full"
                type="text"
                placeholder="Pin Code"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <MdPublic className="absolute left-3 top-3 text-blue-600" size={24} />
              <input
                className="p-3 pl-10 border rounded-md border-blue-300 focus:outline-none focus:ring-2 bg-blue-50 focus:ring-blue-500 transition-all w-full"
                type="text"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </div>

            <div className="flex justify-center items-center gap-4">
              <button
                className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-all"
                type="submit"
              >
                Save
              </button>
              <button
                className="w-full py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition-all"
                onClick={cancelHandler}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateAddress;
