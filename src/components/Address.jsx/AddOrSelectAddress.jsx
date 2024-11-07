import React, { useState, } from "react";
import { useForm } from "react-hook-form";
import useMutateUser from "../../hooks/useMutateUser";
import ReadonlyAddress from "./ReadonlyAddress";
import AddressForm from "./AddressForm";

const AddOrSelectAddress = () => {
  const [page, setPage] = useState("selectAddress");
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({
    defaultValues: {
      houseNo: "",
      floor: "",
      building: "",
      landmark: "",
      addressType: "",
      areaLocality: "",
    },
    mode: "onBlur", // Validation will trigger on blur

  });
  const { handleUser, isLoading, isError, error } = useMutateUser();
  const handleAddNewAddress = async (data = {}, successFunctionHandler = false) => {
    handleUser({
      data: {
        ...data,
        isDefault: true,
      }, successFunction: () => {
        if (typeof successFunctionHandler === "function") {
          successFunctionHandler()
        }
        else
          setPage("selectAddress");
      }
    })
};
 const handleFormState = (address) => {
    reset({ ...address });
  }

  return (
    <>

      {page === "selectAddress" ? (
        <ReadonlyAddress {...{ setPage, handleFormState, isLoading, handleAddNewAddress,reset }} />

      ) : (
        <AddressForm {...{ handleAddNewAddress, useFormProps: { register, handleSubmit, watch, errors, reset }, setPage, isLoading }} />

      )}
    </>

  );
};

export default AddOrSelectAddress;
