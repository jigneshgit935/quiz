"use client";


import { Poppins } from "next/font/google";


const poppins = Poppins({
  subsets: ['latin'],
  weight: ["100","200","300","400","500","600","700","800","900"], // Specify weights if needed
});
import { Button } from "@mui/joy";
import { TextField } from "@mui/material";
import React, { useState } from "react";
import Snackbar from "@mui/joy/Snackbar";
import PlaylistAddCheckCircleRoundedIcon from "@mui/icons-material/PlaylistAddCheckCircleRounded";
import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";
const SubmitForm = ({ setSubmitTrue }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);
  const [responeFalse, setResponeFalse] = useState(null);
  console.log(openMessage, responeFalse);

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const [nameWarning, setNameWarning] = useState(false);
  const [numberWarning, setNumberWarning] = useState(false);

  const [numberLength, setNumberLength] = useState(false);
  const [numberLengthMessage, setNumberLengthMessage] = useState("");

  const SubmitForm = async () => {
    if (!name || !number) {
      !name && setNameWarning(true);
      !number && setNumberWarning(true);

      return;
    }

    if (number.length < 10) {
      setNumberLength(true);
      setNumberLengthMessage("Number should be at least 10 digits");
      return;
    } else if (number.length > 10) {
      setNumberLength(true);
      setNumberLengthMessage("Number should not exceed 10 digits");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ name, phoneNumber: number }),
      });
      const resst = await res.json();
      console.log(res);

      if (res.ok) {
        setSubmitTrue(true);
        console.log("User Created Success");
        setLoading(false);
        setName("");
        setNumber("");
      } else {
        setOpen(true);
        setOpenMessage(resst.message);
        setLoading(false);
        console.log("Something went wrong while creating user");
      }
    } catch (error) {
      setOpen(true);
      setResponeFalse(res.ok ? true : false);
      setOpenMessage(resst.message);
      setLoading(false);
      console.log("Something went wrong", error);
    }
  };

  return (
    <div className={`max-w-sm mx-auto border-2 ${poppins.className}`}>
      <Snackbar
        sx={{ fontSize: "14px", width: "80%",fontWeight:"400"  }}
        variant="soft"
        color={responeFalse ? "success" : "danger"}
        open={open}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        startDecorator={
          responeFalse ? (
            <PlaylistAddCheckCircleRoundedIcon />
          ) : (
            <PhoneDisabledIcon />
          )
        }
        autoHideDuration={3000}
        endDecorator={
          <Button
            onClick={() => setOpen(false)}
            size="sm"
            variant="soft"
            color={responeFalse ? "success" : "danger"}
          >
            Dismiss
          </Button>
        }
      >
        {openMessage}
      </Snackbar>
      <div className="flex flex-col gap-5 px-4 border-2 mt-10">
        <div className="flex flex-col gap-1">
          <TextField
            onChange={(e, value) => {
              setName(e.target.value);
              setNameWarning(false);
            }}
            type="text"
            label="Name"
            variant="outlined"
            size="small"
            value={name || ""}
            sx={{ width: "100%" }}
          />
          <div
            className={`transition-opacity duration-300 ease-in-out ${
              nameWarning ? "opacity-100" : "opacity-0"
            } text-[12px] text-red-500 mt-[-2px] font-[400]`}
          >
            Name is required
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <TextField
            onChange={(e, value) => {
              setNumber(e.target.value);
              setNumberWarning(false);
              setNumberLength(false);
            }}
            type="number"
            label="Mobile No"
            variant="outlined"
            size="small"
            value={number || ""}
            sx={{ width: "100%" }}
          />
          <div
            className={`transition-opacity duration-300 ease-in-out ${
              numberWarning ? "opacity-100 " : "opacity-0"
            } text-[12px] text-red-500 mt-[-2px]  font-[400]`}
          >
            Phone number is required
          </div>

          <div
            className={`transition-opacity duration-300 ease-in-out ${
              numberLength ? "opacity-100" : "opacity-0"
            } text-[12px] text-red-500  mt-[-22px] font-[400]`}
          >
            {numberLengthMessage}
          </div>
        </div>

        <Button
          onClick={() => {
            SubmitForm();
          }}
          className="mt-2"
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </div>
      <div className="border-2 border-red-400 mt-16 h-[380px] rounded-md"></div>
    </div>
  );
};

export default SubmitForm;
