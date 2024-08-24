"use client";

import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

import dateFormat from "dateformat";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { Input, Modal, ModalClose } from "@mui/joy";
import { FaThumbsUp } from "react-icons/fa";
import { FaRegThumbsUp } from "react-icons/fa6";


const UserList = () => {
  const [open, setOpen] = useState(false);
  const [openRedeem, setOpenReedem] = useState(false);
  const [allUsers, setAllUsers] = useState();
  const [searchNo, setSearchNo] = useState("");
  const [idDelete, setIdDelete] = useState("");
  console.log(idDelete);

  const getUsers = async () => {
    const res = await fetch(
      `/api/users?phoneNumber=${searchNo}`,
      {
        cache: "no-store",
      }
    );

    const userRes = await res.json();

    if (!res?.ok) {
      console.log("Faild to fetch Users");
    }
    setAllUsers(userRes?.users);
  };

  const confirmDelete = async () => {
    const res = await fetch(`/api/users?id=${idDelete}`, {
      method: "DELETE",
    });

    console.log("res", res);
    if (res.ok) {
      setOpen(false);
      setIdDelete("");
      getUsers();
    } else {
      setOpen(false);
      console.log("something went wrong");
    }
  };

  const UPDATEDONE = async () => {
    const res = await fetch(`/api/users?id=${idDelete}`, {
      method: "PATCH",
    });

    console.log("res", res);
    if (res.ok) {
      setOpenReedem(false);
      setIdDelete("");
      getUsers();
    } else {
      setOpenReedem(false);
      console.log("something went wrong");
    }
  };

  useEffect(() => {
    getUsers();
  }, [searchNo]);
  return (
    <div className="mx-auto max-w-md border-2 h-screen">
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => {
          setOpen(false);
          setIdDelete("");
        }}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
          marginTop: "20px",
          marginLeft: "10px",
          marginRight: "10px",
        }}
      >
        <Sheet
          className="modal-confirm-product-request"
          variant="outlined"
          sx={{
            maxWidth: "400px",
            width: "100%",
            height: "120px",
            borderRadius: "md",
            p: 2,
            boxShadow: "lg",
          }}
        >
          <ModalClose variant="plain" sx={{ marginTop: "6px" }} />
          <div className="flex h-[100%] flex-col justify-between ">
            <h1 className="text-[18px]">Are you sure want to delete</h1>
            <div className="flex flex-row items-center justify-end gap-2">
              <button
                onClick={() => {
                  setOpen(false);
                  setIdDelete("");
                }}
                className="w-[120px] rounded-md bg-[#6c757d] py-1 text-white hover:bg-[#51585e]"
              >
                Cancel
              </button>
              <button
                onClick={() => confirmDelete()}
                className="w-[120px] rounded-md bg-[#0d6efd] py-1 text-white hover:bg-[#0a58ca]"
              >
                Confirm
              </button>
            </div>
          </div>
        </Sheet>
      </Modal>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={openRedeem}
        onClose={() => {
          setOpenReedem(false);
          setIdDelete("");
        }}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
          marginTop: "20px",
          marginLeft: "10px",
          marginRight: "10px",
        }}
      >
        <Sheet
          className="modal-confirm-product-request"
          variant="outlined"
          sx={{
            maxWidth: "400px",
            width: "100%",
            height: "120px",
            borderRadius: "md",
            p: 2,
            boxShadow: "lg",
          }}
        >
          <ModalClose variant="plain" sx={{ marginTop: "6px" }} />
          <div className="flex h-[100%] flex-col justify-between ">
            <h1 className="text-[18px]">Are you sure want to redeem</h1>
            <div className="flex flex-row items-center justify-end gap-2">
              <button
                onClick={() => {
                  setOpenReedem(false);
                  setIdDelete("");
                }}
                className="w-[120px] rounded-md bg-[#6c757d] py-1 text-white hover:bg-[#51585e]"
              >
                Cancel
              </button>
              <button
                onClick={() => UPDATEDONE()}
                className="w-[120px] rounded-md bg-[#0d6efd] py-1 text-white hover:bg-[#0a58ca]"
              >
                Reedem
              </button>
            </div>
          </div>
        </Sheet>
      </Modal>

      <div className="border-b-2  h-[10%] flex justify-between items-center px-5">
        <h1 className="text-xl font-semibold">Customer</h1>
        <div className="w-[150px]">
          <Input
            placeholder="Search…"
            type="number"
            sx={{ width: "100%" }}
            onChange={(e, value) => {
              setSearchNo(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="h-[90%]">
        <Box sx={{ width: "100%" }}>
          <Sheet
            variant="outlined"
            sx={{
              "--TableCell-height": "40px",
              // the number is the amount of the header rows.
              "--TableHeader-height": "calc(1 * var(--TableCell-height))",
              "--Table-firstColumnWidth": "100px",
              "--Table-lastColumnWidth": "100px",
              // background needs to have transparency to show the scrolling shadows
              "--TableRow-stripeBackground": "rgba(0 0 0 / 0.04)",
              "--TableRow-hoverBackground": "rgba(0 0 0 / 0.08)",
              overflow: "auto",
              background: (theme) =>
                `linear-gradient(to right, ${theme.vars.palette.background.surface} 30%, rgba(255, 255, 255, 0)),
            linear-gradient(to right, rgba(255, 255, 255, 0), ${theme.vars.palette.background.surface} 70%) 0 100%,
            radial-gradient(
              farthest-side at 0 50%,
              rgba(0, 0, 0, 0.12),
              rgba(0, 0, 0, 0)
            ),
            radial-gradient(
                farthest-side at 100% 50%,
                rgba(0, 0, 0, 0.12),
                rgba(0, 0, 0, 0)
              )
              0 100%`,
              backgroundSize:
                "40px calc(100% - var(--TableCell-height)), 40px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height))",
              backgroundRepeat: "no-repeat",
              backgroundAttachment: "local, local, scroll, scroll",
              backgroundPosition:
                "var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height), var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height)",
              backgroundColor: "background.surface",
            }}
          >
            <Table
              borderAxis="bothBetween"
              stripe="odd"
              hoverRow
              sx={{
                "& tr > *:first-child": {
                  position: "sticky",
                  left: 0,
                  boxShadow: "1px 0 var(--TableCell-borderColor)",
                  bgcolor: "background.surface",
                },
                "& tr > *:last-child": {
                  position: "sticky",
                  right: 0,
                  bgcolor: "var(--TableCell-headBackground)",
                },
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      width: "var(--Table-firstColumnWidth)",
                      fontSize: "0.8rem",
                      textAlign: "center",
                    }}
                  >
                    Mobile No...
                  </th>
                  <th
                    style={{
                      fontSize: "0.8rem",
                      width: 120,
                      textAlign: "center",
                    }}
                  >
                    Status
                  </th>
                  {/* <th style={{fontSize:"0.8rem",width:120 }}>Coupon</th> */}
                  <th
                    style={{
                      fontSize: "0.8rem",
                      width: 120,
                      textAlign: "center",
                    }}
                  >
                    Name
                  </th>
                  <th
                    aria-label="last"
                    style={{
                      width: "var(--Table-lastColumnWidth)",
                      fontSize: "0.8rem",
                      textAlign: "center",
                    }}
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {allUsers?.map((user) => (
                  <tr key={user._id}>
                    <td style={{ fontSize: "0.8rem", textAlign: "center" }}>
                      <div className="py-[1px] bg-slate-500 text-white font-[400]">
                        <a href={`sms:${user?.phoneNumber}?body=${encodeURIComponent(`Your Coupon Code = ${user?.otp}`)}`}>{user.phoneNumber}</a>
                      </div>
                      <div className="py-[2px] mt-1 bg-teal-500 font-semibold">{user?.otp}</div>
                    </td>
                    <td className="capitalize" style={{ fontSize: "0.8rem" }}>
                      <span
                        className={`border-2 block w-[80px] text-center py-[2px] text-[0.8rem] font-[400] ${
                          user?.status == "done"
                            ? "text-black bg-green-500 rounded-full"
                            : "text-black bg-red-500 rounded-full"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    {/* <td>{user.otp}</td> */}
                    <td
                      className="capitalize"
                      style={{ fontSize: "0.8rem", textAlign: "center" }}
                    >
                      {user.name}
                    </td>
                    <td className="" style={{ fontSize: "0.8rem" }}>
                      <Box
                        className=""
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <div className="border-[#c6c6c6] p-[6px] bg-[#ececec] rounded-[50%]">
                          {user?.status == "done" ? (
                            <FaThumbsUp
                              className=" text-blue-500 rounded"
                              size={22}
                            />
                          ) : (
                            <FaRegThumbsUp
                              className=""
                              size={22}
                              onClick={() => {
                                setIdDelete(user?._id);
                                setOpenReedem(true);
                              }}
                            />
                          )}
                        </div>

                        <div className="border-[#c6c6c6] p-[6px] rounded-[50%] bg-[#ececec]">
                          <MdDelete
                            size={22}
                            className="text-red-500 hover:text-red-600 cursor-pointer"
                            onClick={() => {
                              setIdDelete(user?._id);
                              setOpen(true);
                            }}
                          />
                        </div>
                      </Box>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Sheet>
        </Box>
      </div>
    </div>
  );
};

export default UserList;
