import PulseLoader from "react-spinners/PulseLoader";

interface props {
  loading: boolean;
}

const override = {
  display: "block",
  margin: "100px auto",
};

const Spinner = ({ loading }: props) => {
  return (
    <PulseLoader
      color="#4338ca"
      loading={loading}
      cssOverride={override}
      size={10}
    />
  );
};

export default Spinner;
