const { requireSignin, userMiddleware } = require("../common-middleware");
const {
  addOrder,
  updateOrder,
  getOrders,
  getOrder,
  razorpayPayment,
} = require("../controller/order");
const router = require("express").Router();

router.post("/addOrder", requireSignin, userMiddleware, addOrder);
router.put("/updateOrder/:id", requireSignin, userMiddleware, updateOrder);

router.get("/getOrders", requireSignin, userMiddleware, getOrders);
router.post("/getOrder", requireSignin, userMiddleware, getOrder);

router.post("/razorpay", requireSignin, userMiddleware, razorpayPayment);

module.exports = router;
