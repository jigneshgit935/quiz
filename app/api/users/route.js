import connectMongoDB from "@/libs/mongodb";
import User from "@/models/users";
import { NextResponse } from "next/server";

function generateAlphaNumericCode() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }

  return code;
}

export async function POST(request) {
  try {
    const { name, phoneNumber, countryCode = 91 } = await request.json();

    // Connect to MongoDB
    await connectMongoDB();

    const existingUser = await User.findOne({ phoneNumber });

    if (existingUser) {
      return NextResponse.json(
        { message: "Phone number already exists" },
        { status: 409 } // Conflict status
      );
    }

    // Generate a 6-digit OTP
    const otp = generateAlphaNumericCode();

    // Create the new user
    await User.create({ name, phoneNumber, otp });

    return NextResponse.json({ message: "User Created" }, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Failed to create user" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  const phoneNumber = request.nextUrl.searchParams.get("phoneNumber");

  await connectMongoDB();

  let users;

  if (phoneNumber) {
    users = await User.find({ phoneNumber });
  } else {
    users = await User.find();
  }

  return NextResponse.json({ users });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");

  await connectMongoDB();
  await User.findByIdAndDelete(id);
  return NextResponse.json({ message: "User Deleted" }, { status: 200 });
}

export async function PATCH(request) {
  const id = request.nextUrl.searchParams.get("id");
  console.log("INSIDE PATCH", id);

  // Check if id is provided
  if (!id) {
    return NextResponse.json(
      { message: "User ID is required" },
      { status: 400 }
    );
  }

  try {
    await connectMongoDB();

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { status: "done" },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User status updated", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating user status", error: error.message },
      { status: 500 }
    );
  }
}
