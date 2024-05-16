import React from "react";
import { useNeuron } from "./ListItem.store";
interface Props {}
export default function ListItem({}: Props) {
  const [id, setId] = useNeuron((state) => state.classMate.id);
  const [name, setName] = useNeuron((state) => state.classMate.name);
  const [age, setAge] = useNeuron((state) => state.classMate.age);
  const [birthDate, setBirthDate] = useNeuron(
    (state) => state.classMate.birthDate
  );
  const [gender, setGender] = useNeuron((state) => state.classMate.gender);
  React.useEffect(() => {
    setId(3);
  }, [id]);
  return (
    <>
      <div>
        <input
          type="text"
          name={"name"}
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>
      <div>
        <input
          type="number"
          name={"age"}
          onChange={(e) => setAge(e.target.value)}
          value={age}
        />
      </div>
      <div>
        <input
          type="date"
          name={"birthDate"}
          onChange={(e) => setBirthDate(e.target.value)}
          value={birthDate}
        />
      </div>
    </>
  );
}
