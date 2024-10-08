import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userFallBackImg from "../../assets/user.png";
import { MdModeEdit } from "react-icons/md";
import axios from "axios";
import { setUserData } from "../../feature/userSlice";
import InputField from "../../components/InputField";

const User = () => {
  const userData = useSelector((state) => state.user.userData);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const today = new Date().toISOString().split("T")[0]; // Get today's date in "yyyy-MM-dd" format

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
  });


  useEffect(() => {
    setUser({
      name: userData?.firstName || "N/A",
      email: userData?.email || "N/A",
      phone: userData?.phone || "N/A",
      dateOfBirth: userData?.dateOfBirth
        ? userData.dateOfBirth.split("T")[0]
        : "N/A",
      gender:
        userData?.gender === "Prefer Not To Disclose"
          ? "N/A"
          : userData?.gender,
    });
  }, [userData]);

  const handleEditUserValue = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUserEdit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when request starts

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/customer-profile`,
        {
          firstName: user?.name,
          lastName: "",
          gender: user?.gender,
          anniversaryDate: "",
          customerId: userData?.customerId,
          phone: user?.phone,
          email: user?.email,
        }
      );
      dispatch(setUserData(response?.data?.result)); // Update Redux state with new user data
      setIsEdit(false); // Exit edit mode after successful save
    } catch (error) {
      console.error("Error updating user profile:", error);
    } finally {
      setLoading(false); // Set loading to false when request completes
    }
  };

  const toggleEditMode = () => {
    setIsEdit((prev) => !prev); // Only toggle the edit mode without resetting the user data
  };

  const userInputData = useMemo(() => [
    {
      value: user?.name,
      handleEditUserValue,
      name: "name",
      Labeltext: "Name",
      inputType: "text"
    },
    {
      value: user?.email,
      handleEditUserValue,
      name: "email",
      Labeltext: "Email",
      inputType: "email"
    },
    {
      value: user?.phone,
      handleEditUserValue,
      name: "phone",
      Labeltext: "Mobile No",
      inputType: "number"
    },
    {
      value: user?.dateOfBirth,
      handleEditUserValue,
      name: "dateOfBirth",
      Labeltext: "D.O.B",
      inputType: "date"
    },
  ], [user, handleEditUserValue]); 

  return (
    <div className="space-y-3">
      <div className="flex justify-center flex-col space-y-3">
        <div className="rounded-full items-center mx-auto">
          <img
            className="w-20 mx-auto mb-3"
            src={userData?.customerImageUrl || userFallBackImg}
            alt="User"
          />
          {!isEdit && (
            <>
              <p
                className="flex text-orange-600 gap-2 items-center justify-center mt-3 cursor-pointer"
                onClick={toggleEditMode}
              >
                <MdModeEdit />
                Edit Profile
              </p>
              <h2 className="text-2xl font-bold my-2">{`Hi there ${userData?.firstName}`}</h2>
            </>
          )}
        </div>
      </div>

      <div className="flex justify-center space-y-4">
        {!isEdit ? (
          // Display user data when not in edit mode
          <div className="space-y-5">
            {["name", "email", "phone", "dateOfBirth", "gender"].map(
              (field) => (
                <div key={field} className="gap-3 flex items-center">
                  <label htmlFor={field} className="text-lg w-20 capitalize">
                    {field}
                  </label>
                  <span className="px-5 py-2 rounded-3xl bg-orange-200 w-60">
                    {user?.[field] || "N/A"}
                  </span>
                </div>
              )
            )}
          </div>
        ) : (
          // Display input fields when in edit mode
          <form className="space-y-5" onSubmit={handleUserEdit}>
            {userInputData?.map((item) => {
              return (
                <InputField
                  value={item?.value}
                  handleEditUserValue={handleEditUserValue}
                  name={item?.name}
                  Labeltext={item?.Labeltext}
                  inputType={item?.inputType}
                />
              );
            })}
            <div className="gap-3 flex items-center">
              <label htmlFor="gender" className="text-lg w-20">
                Gender
              </label>
              <select
                className="select select-ghost w-full max-w-xs p-3 bg-orange-200 border-none outline-none py-2 rounded-3xl"
                name="gender"
                value={user?.gender}
                onChange={handleEditUserValue}
              >
                <option value="" className="bg-white text-black">
                  Select Gender
                </option>
                <option value="Male" className="bg-white text-black">
                  Male
                </option>
                <option value="Female" className="bg-white text-black">
                  Female
                </option>
                <option value="Other" className="bg-white text-black">
                  Other
                </option>
              </select>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className={`bg-orange-500 text-white px-20 rounded-3xl py-3 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default User;
