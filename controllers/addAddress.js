import add from "../models/userAddress";

export const addAddress = async ({ user,address }) => {
  let result;
  try {
    result = add.create({
      user: user.id,
      address: address,
    });
    return Promise.resolve(result);
  } catch (error) {
    return Promise.reject(error);
  }
};
