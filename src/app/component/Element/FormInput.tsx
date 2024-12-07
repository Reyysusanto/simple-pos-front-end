const FormInput = ({NameInput, placeHolder, typeInput}: {NameInput : string, placeHolder : string, typeInput : string}) => {
    return (
        <div>
            <h3 className="text-base font-semibold text-gray-600">
                {NameInput}
            </h3>
            <input
                className="w-full p-2 border border-gray-300 rounded-md text-gray-600"
                placeholder={placeHolder} 
                type={typeInput}  
            />
        </div>
    )
}

export default FormInput;