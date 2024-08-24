"use client";
import { Button } from "@mui/joy";
import { TextField } from "@mui/material";
import React, { useState } from "react";
// import Snackbar from "@mui/joy/Snackbar";
// import PlaylistAddCheckCircleRoundedIcon from "@mui/icons-material/PlaylistAddCheckCircleRounded";
const SubmitForm = ({ setSubmitTrue }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);

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
      const res = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ name, phoneNumber: number }),
      });
      console.log("response", res);
      if (res.ok) {
        setSubmitTrue(true);
        console.log("User Created Success");
        setLoading(false);
        setName("");
        setNumber("");
      } else {
        setOpen(true);
        setOpenMessage("Wait..");
        setLoading(false);
        console.log("Something went wrong while creating user");
      }
    } catch (error) {
      setOpen(true);
      setOpenMessage("Wait..");
      setLoading(false);
      console.log("Something went wrong", error);
    }
  };

  return (
    <div className="max-w-sm mx-auto">
      {/* <Snackbar
        variant="soft"
        color="success"
        open={open}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        startDecorator={<PlaylistAddCheckCircleRoundedIcon />}
        endDecorator={
          <Button
            onClick={() => setOpen(false)}
            size="sm"
            variant="soft"
            color="success"
          >
            Dismiss
          </Button>
        }
      >
        Your message was sent successfully.
      </Snackbar> */}
      <div className="flex flex-col gap-5 px-4">
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
          {nameWarning && (
            <span className="text-[12px] text-red-500">Name is required</span>
          )}
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
          {numberWarning && (
            <span className="text-[12px] text-red-500">
              Mobile No is required
            </span>
          )}
          {numberLength && (
            <span className="text-[12px] text-red-500">
              {numberLengthMessage}
            </span>
          )}
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
      <div className="border-2 border-red-400 mt-10 h-[380px] rounded-full"></div>
    </div>
  );
};

export default SubmitForm;
