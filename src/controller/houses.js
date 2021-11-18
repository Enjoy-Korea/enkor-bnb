import * as housesRepository from "../model/houses.js";

export async function getAllHouse(req, res, next) {
  const { page, pageSize, priceSort } = req.query;
  if (!page || !pageSize) {
    return res.status(400).json({
      success: false,
      message: "잘못된 요청입니다.",
    });
  }
  const houses = await housesRepository.findAll(page, pageSize, priceSort);
  res.status(200).json({
    success: true,
    data: houses,
  });
}

export async function getHouse(req, res, next) {
  const { id } = req.params;
  const house = await housesRepository.findById(id);
  if (!house) {
    return res.status(404).json({
      success: false,
      message: "존재하지 않는 페이지입니다.",
    });
  }
  res.status(200).json({
    success: true,
    data: [house],
  });
}
