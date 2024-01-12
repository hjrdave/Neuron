import { useNeuron, CustomStyles } from "../Store";
const useCustomStyles = () => {
  const [customStyles, setCustomStyles] = useNeuron<CustomStyles>(
    (state) => state.devtools_customStyles
  );

  return {
    customStyles,
    setCustomStyles,
  };
};
export default useCustomStyles;
