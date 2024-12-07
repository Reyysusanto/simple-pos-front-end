import Link from "next/link";
import Button from "../Element/Button";
import FormInput from "../Element/FormInput";
import { useRouter, usePathname } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export const AuthHeader = ({
    titleCard,
    description,
    }: {
    titleCard: string;
    description: string;
    }) => {

    return (
        <div className="gap-y-4">
        <h1 className="text-2xl font-bold text-green-500">{titleCard}</h1>
        <p className="text-gray-600 font-normal text-base">{description}</p>
        </div>
    );
};

export const AuthBody = () => {
    const pathname = usePathname();

    return (
        <div className="flex flex-col gap-y-3">
            <FormInput
                NameInput="Email"
                placeHolder="Masukkan Email"
                typeInput="email"
            />
            <FormInput
                NameInput="Password"
                placeHolder="Masukkan Password"
                typeInput="password"
            />
            {pathname === "/signup" && (
                <FormInput
                    NameInput="Confirm Password"
                    placeHolder="Masukkan Password"
                    typeInput="password"
                />
            )}
        </div>
    );
};

export const AuthFooter = (
    { NavigateTo, Description, LinkTo, linkToNavigate }
    : 
    { NavigateTo: string, Description: string, LinkTo: string, linkToNavigate: string }) => {
  const Route = useRouter();

  return (
    <div className="flex flex-col gap-y-3">
      <p className="text-sm text-gray-700">
        {Description}
        <Link className="text-green-500" href={`/${linkToNavigate}`}>
          {" "}
          {LinkTo}
        </Link>
      </p>
      <p className="text-sm text-gray-600 flex justify-center">Or access with</p>
      <div className="flex gap-x-1 justify-between">
        <Button 
          buttonName={<span><FcGoogle className="mr-2 inline-block" /> Google</span>}
          customClass="bg-white hover:border-green-500 hover:bg-gray-100 border-2 border-gray-200 w-full text-gray-800 text-sm px-1"
          click={() => Route.push(`/${NavigateTo}`)}
          type="submit"
        />
        <Button
            buttonName={<span><FaGithub className="mr-2 inline-block" /> Github</span>}
            customClass="text-gray-800 bg-white hover:border-green-500 hover:bg-gray-100 border-2 border-gray-200 w-full text-sm px-1"
            click={() => Route.push(`/${NavigateTo}`)}
            type="submit"
        />
      </div>
    </div>
  );
};
