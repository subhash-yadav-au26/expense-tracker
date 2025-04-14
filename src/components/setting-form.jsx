import React, { Fragment, useEffect, useState } from "react";
import useStore from "../store/index";
import { useForm } from "react-hook-form";
import Input from "./ui/input";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  Transition
} from "@headlessui/react";
import { fetchCountries } from "../utils/index";
import { BsChevronExpand } from "react-icons/bs";
import {Button} from "./ui/button.jsx";
import { BiLoader } from "react-icons/bi";
import api from "../utils/apiCall.js";
import { toast } from "sonner";

const SettingsForm = () => {
  const { user, theme, setTheme } = useStore((state) => state);
  const {
    register,
    handleSubmit,
    formState: { ...errors },
  } = useForm({
    defaultValues: { ...user },
  });

  const [selectedCountry, setSelectedCountry] = useState(
    { country: user?.country, currency: user?.currency } || ""
  );

  const [query, setQuery] = useState("");
  const [countriesData, setCountriesData] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values) => {
    try {
        setLoading(true);
        const newData = {
            ...values,
            country: selectedCountry.country,
            currency: selectedCountry.currency
        }
        const { data: res} = await api.put(`/user`,newData)
        if(res?.user){
            const newUser = {...res.user, token: user.token}
            localStorage.setItem("user", JSON.stringify(newUser))
            toast.success(res?.message)
        }
    } catch (error) {
        toast.error(error?.response?.data?.message || error.message)

    }finally{
        setLoading(false)
    }

  };

  const toggleTheme = (val) => {
    setTheme(val);
    localStorage.setItem("theme", val);
  };

  const filteredCountries =
    query === ""
      ? countriesData
      : countriesData.filter((country) =>
          country.country
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  const getCountries = async () => {
    const data = await fetchCountries();
    setCountriesData(data);
  };

  const Countries = () => {
    return (
      <div className="w-full">
        <Combobox value={selectedCountry} onChange={setSelectedCountry}>
          <div className="relative mt-1">
            <div className="">
              <ComboboxInput
                className="inputStyles"
                displayValue={(country) => country?.country}
                onChange={(e) => setQuery(e.target.value)}
              />
                <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <BsChevronExpand className="text-gray-400" />
                </ComboboxButton>
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-0"
              afterLeave={() => setQuery("")}
            >
              <ComboboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-slate-900 py-1">
                {filteredCountries.length === 0 && query !== "" ? (
                  <div className="relative cursor-default select-none px-4 py2 text-gray-700 dark:text-gray-500">
                    Nothing found
                  </div>
                ) : (
                  filteredCountries?.map((country, index) => (
                    <ComboboxOption
                      key={country.country + index}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? "bg-violet-600/20 text white"
                            : "text-gray-900"
                        }`
                      }
                      value={country}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center gap-2">
                            <img
                              src={country?.flag}
                              alt={country?.country}
                              className="w-8 h-5 rounded-sm object-cover"
                            />
                            <span
                              className={`block truncate text-gray-700 darak:text-gray-500 ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {country?.country}
                            </span>
                          </div>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? "text-white" : "text-teal-600"
                              }`}
                            >
                              <BiCheck className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </ComboboxOption>
                  ))
                )}
              </ComboboxOptions>
            </Transition>
          </div>
        </Combobox>
      </div>
    );
  };

  useEffect(()=>{
    getCountries()
  },[])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="w-full">
            <Input
            disabled={loading}
            id="firstname"
            label="First Name"
            name="firstname"
            type="text"
            placeholder="John"
            {...register("firstname", {
                required: "First name is required",
            })}
            error={errors.firstname ? errors?.firstname?.message : ""}
            className="inputStyle"
            />
        </div>

        <div className="w-full">
            <Input
            disabled={loading}
            id="lastname"
            label="Last Name"
            name="lastname"
            type="text"
            placeholder="Smith"
            error={errors.lastname ? errors?.lastname?.message : ""}
            {...register("lastname", {
                required: "Last name is required",
                })}
            className="inputStyle"
            />
        </div>

      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="w-full">
            <Input
            disabled={loading}
            id="email"
            label="email"
            name="email"
            type="email"
            placeholder="John@example.com"
            {...register("email", {
                required: "Email is required",
            })}
            error={errors.email ? errors?.email?.message : ""}
            className="inputStyle"
            />
        </div>

        <div className="w-full">
            <Input
            disabled={loading}
            id="contact"
            label="Contact"
            name="contact"
            type="text"
            placeholder="+1 00000000"
            error={errors.contact ? errors?.contact?.message : ""}
            {...register("contact", {
                required: "contact  is required",
            })}
            className="inputStyle"
            />
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="w-full">
                <span className="labelStyles">Country</span>
                <Countries/>
            </div>
            <div className="w-full">
            <span className="labelStyles">Currency</span>
                <select className="inputStyles" >
                    <option >{selectedCountry?.currency || user?.country}</option>
                </select>
            </div>
      </div>

    <div className="w-full flex items-center justify-between pt-10">
        <div className="">
            <p className="text-lg text-black dark:text-gray-400 font-semibold">
                Appearance
            </p>
            <span className="labelStyles">
                Customize how your theme looks on your device
            </span>
        </div>

        <div className="w-28 md:w-40">
        <select
            className="inputStyles"
            defaultValue={theme}
            onChange={(e) => toggleTheme(e.target.value)}
        >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
        </select>

        </div>
    </div>

    <div className="flex items-center gap-6 justify-end pb-10 border-b-2 border-gray-200 dark:border-gray-800">
        <Button
            variant="outline"
            loading={loading}
            type="reset"
            className="px-6 bg-transparent text-black dark:text-white border border-gray-200 dark:border-gray-700"
        >
            Reset
        </Button>

        <Button
            loading={loading}
            type="submit"
            className="px-8 bg-violet-800 text-white"
        >
            {loading ? <BiLoader/> : "Save"}
        </Button>
    </div>
    </form>
  );
};

export default SettingsForm;
