"use client";

import { useEffect, useState } from "react";
import Button from "@/app/component/Element/Button";
import CardMenu from "@/app/component/Element/CardMenu";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const Menu = [
  {
    id: 1,
    name: "Spicy Seasoned Seafood Noodles",
    price: 2.29,
    image: "/Images/seafood_noodle.png",
    available: 20,
  },
  {
    id: 2,
    name: "Salted Pasta with mushroom sauce",
    price: 2.69,
    image: "/Images/salted_pasta_mushroom_sauce.png",
    available: 11,
  },
  {
    id: 3,
    name: "Beef dumpling in hot and sour soup",
    price: 2.99,
    image: "/Images/dumpling_sour_soup.png",
    available: 16,
  },
  {
    id: 4,
    name: "Heathy noodle with spinach leaf",
    price: 3.29,
    image: "/Images/healthy_noodle_spinach_leaf.png",
    available: 22,
  },
  {
    id: 5,
    name: "Hot spicy fried rice with omelette",
    price: 3.49,
    image: "/Images/hot_spicy_fried_rice_omelette.png",
    available: 13,
  },
  {
    id: 6,
    name: "Spinach instant noodle with special omelette",
    price: 3.59,
    image: "/Images/spicy_instant_noodle_omelette.png",
    available: 20,
  },
  {
    id: 7,
    name: "Shoyu noodle",
    price: 3.29,
    image: "/Images/healthy_noodle.png",
    available: 22,
  },
  {
    id: 8,
    name: "Spicy instant noodle with special shrimp",
    price: 3.59,
    image: "/Images/instant_noodle_omellete.png",
    available: 16,
  },
  {
    id: 9,
    name: "Special de Authentic noodle",
    price: 3.49,
    image: "/Images/special_authentic.png",
    available: 16,
  },
];

const Order = () => {
  const [Cart, setCart] = useState<
    { id: number; name: string; price: number; qty: number }[]
  >([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [userName, setUserName] = useState("");
  const [notes, setNotes] = useState<Record<number, string>>({});


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/users");
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        if (data.length > 0) {
          setUserName(data[0].username);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const filteredMenu = Menu.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const sum = Cart.reduce((acc, item) => {
      const product = Menu.find((product) => product.id === item.id);
      return product ? acc + product.price * item.qty : acc;
    }, 0);
    setTotalPrice(sum);
  }, [Cart]);

  const handleNoteChange = (id: number, note: string) => {
    setNotes((prev) => ({ ...prev, [id]: note }));
  };

  const handleCancel = () => {
    setCart([]);
    setNotes({});
    setTotalPrice(0);
  };

  const handleBuy = (id: number) => {
    if (Cart.find((item) => item.id === id)) {
      setCart(
        Cart.map((item) =>
          item.id === id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCart([
        ...Cart,
        { id, name: Menu[id - 1].name, price: Menu[id - 1].price, qty: 1 },
      ]);
    }
  };

  return (
    <div className="flex">
      <div className="w-full md:w-2/3 p-6">
        <div className="flex justify-between items-center">
          <div className="w-1/2 relative md:w-1/3">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for food..."
              className="pl-9 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-x-4 mt-6">
          <Link href={""} className="font-semibold text-gray-500 text-base">
            Hot Dishes
          </Link>
          <Link href={""} className="font-semibold text-gray-500 text-base">
            Cold Dishes
          </Link>
          <Link href={""} className="font-semibold text-gray-500 text-base">
            Soup
          </Link>
          <Link href={""} className="font-semibold text-gray-500 text-base">
            Grill
          </Link>
          <Link href={""} className="font-semibold text-gray-500 text-base">
            Appetizer
          </Link>
          <Link href={""} className="font-semibold text-gray-500 text-base">
            Dessert
          </Link>
        </div>

        <h3 className="text-lg font-semibold text-gray-600 mt-8">
          Choose Dishes
        </h3>
        <div className="flex flex-wrap gap-6 mt-4 justify-center">
          {filteredMenu.map((menu) => (
            <CardMenu
              key={menu.id}
              MenuImage={menu.image}
              MenuName={menu.name}
              Price={menu.price}
              AvailableMenu={menu.available}
              id={menu.id}
              handleBuy={() => handleBuy(menu.id)}
            />
          ))}
        </div>
      </div>

      <div className="hidden md:block p-4 w-1/3 bg-gray-50">
        <h4 className="text-lg font-semibold">
          Order <span className="text-green-500">{userName}</span>
        </h4>
        <div className="flex gap-x-3 mt-4">
          <Button
            buttonName="Dine in"
            customClass="bg-white hover:bg-green-600 text-green-600 text-sm px-2 py-1 rounded-md border border-green-500 hover:text-white"
            type="button"
          />
          <Button
            buttonName="Take away"
            customClass="bg-white hover:bg-green-600 text-green-600 text-sm px-2 py-1 rounded-md border border-green-500 hover:text-white"
            type="button"
          />
        </div>
        <div className="flex flex-col mt-6 gap-y-6">
          <ul className="divide-y divide-gray-200">
            {Cart.map((item) => {
              const product = Menu.find((product) => product.id === item.id);
              return (
                <div key={item.id} className="flex flex-col p-3">
                  {product && (
                    <div className="flex items-center py-2 gap-x-4 justify-between">
                      <div className="flex items-center py-2 gap-x-4">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={50}
                          height={50}
                        />
                        <div>
                          <h5 className="font-semibold text-base text-green-600">
                            {product.name}
                          </h5>
                          <p className="text-gray-600 font-lightm text-sm">
                            {product.price.toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center py-2 gap-x-2">
                        <div className="p-2 bg-gray-200 rounded-md">
                          <p className="text-base">{item.qty}</p>
                        </div>
                        <div className="p-2 border-gray-400">
                          <p className="text-base">
                            {(item.price * item.qty).toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  <div>
                    <Input
                      className="w-full mt-2 p-1"
                      placeholder="Order note..."
                      value={notes[item.id] || ""}
                      onChange={(e) =>
                        handleNoteChange(item.id, e.target.value)
                      }
                    />
                  </div>
                </div>
              );
            })}
          </ul>
          {Cart.length > 0 && (
            <>
              <div className="flex justify-between px-4">
                <h4 className="font-semibold text-gray-600">Total Price</h4>
                <p className="font-semibold">
                  {totalPrice.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
              </div>
              <div className="flex gap-x-3 justify-between">
                <Button
                  buttonName="Cancel"
                  customClass="bg-white border-2 hover:border-red-600 text-black text-sm px-2 py-1 rounded-md w-full"
                  type="submit"
                  click={handleCancel}
                />
                <Button
                  buttonName="Buy"
                  customClass="bg-green-600 border hover:bg-green-700 text-white text-sm px-2 py-1 rounded-md w-full"
                  type="submit"
                  click={() => console.log(Cart)}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
