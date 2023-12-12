import { getAllProducts } from "../../controllers/productController";

export default async (req, res) => {
  try {
    // const id = req.params.postId;
    const post = await getAllProducts();
    res.json({ data:post});
  } catch (error) {
    res.status(403).json(error);
  }
};
