

export default async (req, res) => {
  try {
    const file = req.body.myFile;
    console.log(req.body);
  } catch (error) {
    res.status(403).json(error);
  }
};
