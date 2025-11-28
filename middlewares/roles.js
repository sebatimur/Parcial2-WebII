function checkRole(rolesPermitidos) {
    return (req, res, next) => {
      const userRole = req.user.role;
      if (!rolesPermitidos.includes(userRole)) {
        return res.status(403).send({ ok: false, message: "No tienes permisos para esta acción" });
      }
      next();
    };
  }
  
  module.exports = { checkRole };