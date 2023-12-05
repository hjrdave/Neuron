import { useNeuron } from "../Store";
const useCustomStyles = () => {
  const [customStyles, setCustomStyles] = useNeuron(
    (state) => state.devtools_customStyles
  );

  return {
    customStyles,
    setCustomStyles,
  };
};
export default useCustomStyles;
