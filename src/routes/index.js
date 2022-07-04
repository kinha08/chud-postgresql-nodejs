import express from 'express';

const routes = express.Router();

// routes.get("/", (req, res) => {
//     return res.json({
//         name: "Test json"
//     });
// });

routes.get("/api", (req, res) => {
    res.status(200).send({
        success: 'true',
        message: 'Seja bem-vindo(a) a API Node.js + PostgreSQL + Azure!',
        version: '1.0.0',
      });
});

export default routes;