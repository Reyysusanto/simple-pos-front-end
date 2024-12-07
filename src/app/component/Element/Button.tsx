import { ReactNode } from "react";

const Button = ({
    buttonName,
    customClass = "",
    click = () => {},
    type = "button",
}: {
    buttonName: ReactNode;
    customClass?: string;
    click?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    type?: "button" | "submit" | "reset";
}) => {
    return (
        <button
            className={`${customClass} font-bold py-2 px-4 rounded-md capitalize`}
            onClick={click}
            type={type}
            aria-label={typeof buttonName === "string" ? buttonName : "Button"}
        >
            {buttonName}
        </button>
    );
};

export default Button;
