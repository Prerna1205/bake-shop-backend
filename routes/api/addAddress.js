import { addAddress } from "../../controllers/addAddress";

export default async (req, res) => {
  const data = req.body;
  console.log("In address api" + data);
  try {
    const post = await addAddress(data);
    res.json({ msg: "Data saved Succesfully!" });
  } catch (error) {
    res.status(403).json(error);
  }
};
