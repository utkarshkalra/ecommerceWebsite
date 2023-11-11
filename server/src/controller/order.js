const shortid = require("shortid");
const Razorpay = require("razorpay");

const Order = require("../models/order");
const Cart = require("../models/cart");
const Address = require("../models/address");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.razorpayPayment = async (req, res) => {
  const payment_capture = 1;
  const amount = req.body.totalAmount;
  const currency = "INR";

  const options = {
    amount: amount * 100,
    currency,
    receipt: req.body.orderId,
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    // console.log(response);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
      orderId: req.body.orderId,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};
exports.addOrder = (req, res) => {
  Cart.findOne({ user: req.user._id }).exec((error, result) => {
    if (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
    if (result) {
      req.body.user = req.user._id;
      req.body.orderStatus = [
        {
          type: "ordered",
          date: new Date(),
          isCompleted: true,
        },
        {
          type: "packed",
          isCompleted: false,
        },
        {
          type: "shipped",
          isCompleted: false,
        },
        {
          type: "delivered",
          isCompleted: false,
        },
      ];
      const order = new Order(req.body);
      order.save((error, order) => {
        if (error) return res.status(400).json({ error });
        if (order) {
          res.status(201).json({ order });
        }
      });
    }
  });
};

exports.updateOrder = (req, res) => {
  console.log("incoming update");
  Cart.deleteOne({ user: req.user._id }).exec(async (error, result) => {
    if (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
    console.log("no error till now");

    if (result) {
      req.body.user = req.user._id;
      req.body.orderStatus = [
        {
          type: "ordered",
          date: new Date(),
          isCompleted: true,
        },
        {
          type: "packed",
          isCompleted: false,
        },
        {
          type: "shipped",
          isCompleted: false,
        },
        {
          type: "delivered",
          isCompleted: false,
        },
      ];

      try {
        const updatedOrder = await Order.findOneAndUpdate(
          { _id: req.params.id },
          req.body
        );

        if (!updatedOrder) throw Error("something wrong !!");

        res.status(201).json({ updatedOrder });
      } catch (err) {
        res.status(400).json({ err });
      }
    }
  });
};

exports.getOrders = (req, res) => {
  Order.find({ user: req.user._id })
    .select("_id paymentStatus paymentType orderStatus items totalAmount")
    .populate("items.productId", "_id name productPictures")
    .exec((error, orders) => {
      if (error) return res.status(400).json({ error });
      if (orders) {
        res.status(200).json({ orders });
      }
    });
};

exports.getOrder = (req, res) => {
  Order.findOne({ _id: req.body.orderId })
    .populate("items.productId", "_id name productPictures")
    .lean()
    .exec((error, order) => {
      if (error) return res.status(400).json({ error });
      if (order) {
        Address.findOne({
          user: req.user._id,
        }).exec((error, address) => {
          if (error) return res.status(400).json({ error });
          order.address = address.address.find(
            (adr) => adr._id.toString() == order.addressId.toString()
          );
          res.status(200).json({
            order,
          });
        });
      }
    });
};
