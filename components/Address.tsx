"use client";
import axios from "axios";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export default function Address({
  addresses,
  userId,
}: {
  addresses: {
    id: number;
    userId: number;
    houseNo: string;
    street: string;
    area: string;
    city: string;
    state: string;
    pincode: number;
  }[];
  userId: number | undefined;
}) {
  const [loading, setLoading] = useState(false);
  const [houseNo, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState<number | null>(null);

  useEffect(() => {
    localStorage.removeItem("addressId");
  })

  return (
    <div>
      {addresses.length > 0 ? (
        <Select onValueChange={(value) => {
                  localStorage.setItem("addressId", value);
                }}>
          <SelectTrigger className="w-full bg-white dark:bg-gray-700 border-amber-200 dark:border-gray-600 focus:border-amber-400 focus:ring-amber-400">
            <SelectValue placeholder="Choose delivery address" />
          </SelectTrigger>
          <SelectContent>
            {addresses.map((addr) => (
              <SelectItem
                key={addr.id}
                value={String(addr.id)}
              >
                {addr.houseNo}, {addr.street}, {addr.area}, {addr.city}, {addr.pincode}, {addr.state}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <p className="text-sm text-gray-500 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
          No saved addresses
        </p>
      )}
      <Dialog>
        <DialogTrigger className="w-full"><Button className="mt-4 w-full border-2 border-amber-500 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 font-semibold px-3 py-2 md:px-6 md:py-3 rounded-xl transition duration-200">Add address</Button></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add address</DialogTitle>
            <DialogDescription>Add address to your account.</DialogDescription>
          </DialogHeader>
          <Label>House number</Label>
          <Input
            placeholder="House number"
            onChange={(e) => {
              setHouseNo(e.target.value);
            }}
          />
          <Label>Street</Label>
          <Input
            placeholder="Street"
            onChange={(e) => {
              setStreet(e.target.value);
            }}
          />
          <Label>Area</Label>
          <Input
            placeholder="Area"
            onChange={(e) => {
              setArea(e.target.value);
            }}
          />
          <Label>City</Label>
          <Input
            placeholder="City"
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
          <Label>State</Label>
          <Input
            placeholder="State"
            onChange={(e) => {
              setState(e.target.value);
            }}
          />
          <Label>Pincode</Label>
          <Input placeholder="Pincode" type="number" onChange={(e) => {
            setPincode(parseInt(e.target.value));
          }}/>
          <Button
            disabled={loading}
            className={`w-full ${
              loading ? "opacity-50 cursor-not-allowed" : " "
            }`}
            onClick={async () => {
              setLoading(true);
              console.log(userId);
              if (userId === undefined) {
                toast.error("Please sign in to use this feature");
                return;
              }
              try {
                const res = await axios.post("/api/user/address", {
                  houseNo,
                  street,
                  area,
                  city,
                  state,
                  pincode,
                  userId,
                });

                if (res.status === 200) {
                  toast.success("Address added successfully");
                }
              } catch (error) {
                toast.error("Something went wrong");
                console.error(error);
              } finally {
                setLoading(false);
              }
            }}
          >
            Add address
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
