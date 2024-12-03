const { prisma } = require("../prisma/prisma-client");

/**
 * @route POST /api/history/create
 * @desc  Создание истории
 * @access Public
 */
const create = async (req, res) => {
  const { action, productId, stockId, shopId, plu } = req.body;

  if (!action || !productId) {
    return res
      .status(400)
      .json({ message: "Заполните все обязательные поля!" });
  }

  const shopIdTemp = Number(shopId) || null;
  const stockIdTemp = Number(stockId) || null;

  try {
    const history = await prisma.history.create({
      data: {
        action,
        productId: Number(productId),
        stockId: stockIdTemp,
        shopId: shopIdTemp,
        plu,
      },
    });

    if (!history) {
      return res.status(400).json({ message: "Не удалось создать запись" });
    }

    return res.status(200).json(history);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Произошла ошибка на сервере" });
  }
};

const get = async (req, res) => {
  const { plu, shopId, dateFrom, dateTo, action } = req.query;

  const filters = {};

  if (plu) filters.plu = plu;
  if (shopId) filters.shopId = Number(shopId);
  if (dateFrom || dateTo) {
    filters.timestamp = {};
    if (dateFrom) {
      filters.timestamp.gte = new Date(dateFrom);
    }
    if (dateTo) {
      filters.timestamp.lte = new Date(dateTo);
    }
  }
  if (action) filters.action = action;

  console.log(filters)

  try {
    const history = await prisma.history.findMany({
      where: filters,
    });

    return res.status(200).json(history);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "На сервере возникла ошибка!" });
  }
};

module.exports = {
  create,
  get,
};
