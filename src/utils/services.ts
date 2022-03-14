const getServices = async (url:string) => {
  const response = await fetch(url);
  const responseData = await response.json();
  return responseData;
  // TODO: Return list of services from "/services" endpoint
};

export { getServices };
