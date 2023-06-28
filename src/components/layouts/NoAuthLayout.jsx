import Navbar from "../../commons/Navbar";

export const NoAuthLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div>{children}</div>
    </>
  );
};
