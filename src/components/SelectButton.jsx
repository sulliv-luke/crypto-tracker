import { styled } from "@mui/material/styles";

const SelectButton = styled("span")(({ selected }) => ({
  border: "1px solid gold",
  borderRadius: 5,
  padding: 10,
  paddingLeft: 20,
  paddingRight: 20,
  fontFamily: "Montserrat",
  cursor: "pointer",
  backgroundColor: selected ? "gold" : "",
  color: selected ? "black" : "white",
  fontWeight: selected ? 700 : 500,
  "&:hover": {
    backgroundColor: "gold",
    color: "black",
  },
  width: "22%",
}));

// eslint-disable-next-line react/prop-types
const SelectButtonComponent = ({ children, selected, onClick }) => {
  return (
    <SelectButton onClick={onClick} selected={selected}>
      {children}
    </SelectButton>
  );
};

export default SelectButtonComponent;
