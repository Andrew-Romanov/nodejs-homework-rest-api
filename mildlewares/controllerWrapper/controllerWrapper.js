const controllerWrapper = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next)
    } catch (error) {
      // Changing error.status if bad id used (longer or shorter than need)
      if (error.name === 'CastError') {
        error.status = 404
      }
      next(error)
    }
  }
}

module.exports = controllerWrapper
