import rateLimit from "express-rate-limit";

export const limiteAcessos = rateLimit({
  windowMs: 30 * 60 * 1000, // 15 minutos
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    return res.status(429).json({
      message: 'Muitas tentativas de login. Tente novamente mais tarde.'
    });
  }
})