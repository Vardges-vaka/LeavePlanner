const dataVld_mw = (fn) => async (req, res, next) => {
  try {
    const validatorResult = await fn(req);
    if (!validatorResult.isValid) {
      return res.status(400).json({
        success: false,
        message: validatorResult.validatorMessage,
        data: null,
      });
    }
    if (validatorResult.data) req.body.middlewareData = validatorResult.data;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Validation error",
      data: null,
    });
  }
};

export { dataVld_mw };
