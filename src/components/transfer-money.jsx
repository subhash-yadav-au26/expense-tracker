import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DialogWrapper from "./wrappers/dialog-wrapper.jsx";
import { DialogPanel, DialogTitle } from "@headlessui/react";
import { MdOutlineWarning } from "react-icons/md";
import { BiLoader } from "react-icons/bi";
import Input from "./ui/input.jsx";
import { Button } from "./ui/button.jsx";
import { toast } from "sonner";
import api from "../utils/apiCall.js";
import { formatCurrency } from "../utils/index.js";
import Loading from "./loading.jsx"

const TransferMoney = ({ isOpen, setIsOpen, refresh }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [accountData, setAccountData] = useState([]);
  const [fromAccountInfo, setFromAccountInfo] = useState({});
  const [toAccountInfo, setToAccountInfo] = useState({});

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const newData = {
        ...data,
        from_account: fromAccountInfo.id,
        to_account: toAccountInfo.id,
      };

      const { data: res } = await api.put(
        `/transaction/transfer-money`,
        newData
      );
      if (res?.status === "success") {
        toast.success(res?.message);
        setIsOpen(false);
        refresh();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  function closeModal() {
    setIsOpen(false);
  }

  const getAccountBalance = (setAccount, val) => {
    const filterAccount = accountData?.find(
      (account) => account.account_name === val
    );
    setAccount(filterAccount);
  };

  const fetchAccounts = async () => {
    try {
      const { data: res } = await api.get("/account");
      setAccountData(res?.data);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchAccounts();
  }, []);

  return (
    <DialogWrapper isOpen={isOpen} closeModal={closeModal}>
      <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-slate-900 p-6 align-middle shadow-xl transition-all">
        <DialogTitle
          as="h3"
          className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-300 mb-4 uppercase"
        >
          Transfer Money
        </DialogTitle>
        {isLoading ? (
          <Loading />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-1 mb-2">
              <p className="text-gray-700 dark:text-gray-400 text-sm mb-2">
                From Account
              </p>
              <select
                onChange={(e) =>
                  getAccountBalance(setFromAccountInfo, e.target.value)
                }
                className="inputStyle"
              >
                <option
                  disabled
                  selected
                  className="w-full flex items-center justify-center dark:bg-slate-900"
                >
                  Select Account
                </option>
                {accountData.map((acc, index) => (
                  <option
                    key={index}
                    value={acc?.account_name}
                    className="w-full flex items-center justify-center dark:bg-slate-900"
                  >
                    {acc?.account_name} {" - "}{" "}
                    {formatCurrency(acc?.account_balance)}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1 mb-2">
              <p className="text-gray-700 dark:text-gray-400 text-sm mb-2">
                To Account
              </p>
              <select
                onChange={(e) =>
                  getAccountBalance(setToAccountInfo, e.target.value)
                }
                className="inputStyle"
              >
                <option
                  disabled
                  selected
                  className="w-full flex items-center justify-center dark:bg-slate-900"
                >
                  Select Account
                </option>
                {accountData.map((acc, index) => (
                  <option
                    key={index}
                    value={acc?.account_name}
                    className="w-full flex items-center justify-center dark:bg-slate-900"
                  >
                    {acc?.account_name} {" - "}{" "}
                    {formatCurrency(acc?.account_balance)}
                  </option>
                ))}
              </select>
            </div>

            {fromAccountInfo?.account_balance <= 0 && (
              <div className="flex items-center gap-2 bg-yellow-400 text-black p-2 mt-6 rounded">
                <MdOutlineWarning size={30} />
                <span className="text-sm">
                  you can not transfer money from this account. Insufficient
                  account balance.
                </span>
              </div>
            )}

            {fromAccountInfo.account_balance > 0 && toAccountInfo.id && (
              <>
                <div></div>
                <Input
                  type="number"
                  name="amount"
                  label="Amount"
                  placeholder="10.56"
                  {...register("amount", {
                    required: "Transaction amount is required",
                  })}
                  error={errors.amount ? errors.amount.message : ""}
                />
                <div className="w-full mt-8">
                  <Button
                    disabled={loading}
                    type="submit"
                    className="bg-violet-700 text-white w-full mt-4"
                  >
                    {loading ? (
                      <BiLoader className="text-xl animate-spin text-white" />
                    ) : (
                      `Transfer ${
                        watch("amount") ? formatCurrency(watch("amount")) : ""
                      }`
                    )}
                  </Button>
                </div>
              </>
            )}
          </form>
        )}
      </DialogPanel>
    </DialogWrapper>
  );
};

export default TransferMoney;
