const useNeuronSync = <T = unknown, A = { [key: string]: any }>(
  selector: string,
  Store: any
) => {
  const data = [];
  const actions = {};
  const status = {
    loading: false,
    error: false,
  };
  return [data, actions, status] as [T, A, typeof status];
};
export default useNeuronSync;
