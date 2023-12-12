import { getProduct } from "../../controllers/productController";

export default async (req, res) => {
  try {
    const id = req.params.productId;
    const post = await getProduct(id);
      res.json({ post });
  } catch (error) {
    res.status(403).json(error);
  }
};
