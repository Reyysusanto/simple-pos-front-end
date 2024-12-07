import Image from "next/image";
import Button from "./Button";

const CardMenu = ({
    MenuImage,
    MenuName,
    Price,
    AvailableMenu,
    handleBuy,
    id,
    }: {
    MenuImage: string;
    MenuName: string;
    Price: number;
    AvailableMenu: number;
    handleBuy: (id: number) => void;
    id: number;
    }) => {
        
    return (
        <div className="bg-white shadow-lg w-64 p-4 rounded-xl flex justify-between flex-col">
            <div className="w-full h-40 mb-4">
                <Image
                src={MenuImage}
                alt="Menu Image"
                width={150}
                height={150}
                className="rounded-lg object-contain w-full h-full"
                />
            </div>
            <h3 className="text-lg font-bold text-center text-gray-800 mb-2">
                {MenuName}
            </h3>
            <p className="text-sm text-center text-green-600 font-medium mb-1">
                {Price.toLocaleString("en-US", { style: "currency", currency: "USD" })}
            </p>
            <p className="text-sm text-center text-gray-500">
                {AvailableMenu} bowls available
            </p>
            <Button
                buttonName="Buy"
                customClass="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-md mt-2 w-full"
                click={() => handleBuy(id)}
            />
        </div>
    );
};

export default CardMenu;
