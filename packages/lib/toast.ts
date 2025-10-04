type ExtraOptions = {
  type: "success" | "error";
};
const showToast = (message: string, options?: ExtraOptions) => {
  console.log(message, options);
};

export default showToast;