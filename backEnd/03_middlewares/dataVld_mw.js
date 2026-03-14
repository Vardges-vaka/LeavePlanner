const dataVld_mw = (fn) => async (req, res, next) => {
  let validatorResult = await fn(req);
  if (!validatorResult.isValid) {
    return res.status(400).json({
      success: false,
      message: validatorResult.validatorMessage,
      backEnd_data: null,
    });
  } else {
    validatorResult.data && (req.body.middlewareData = validatorResult.data);
    next();
  }
};

export { dataVld_mw };
