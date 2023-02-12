const SelectButton = ({ children, selected, onClick }) => {
  return (
    <span
      onClick={onClick}
      style={{
        backgroundColor: selected ? "blue" : "",
        color: selected ? "#fff" : "",
        fontWeight: selected ? 700 : 500,
      }}
      className="border-2 w-[22%] border-blue-600 rounded-md py-[10px] px-[20px] font-quicksand cursor-pointer"
    >
      {children}
    </span>
  );
};

export default SelectButton;
