import  express  from "express";
import { forgotPasswordController, loginController, registerController, testController } from "../controllers/authController.js";

import { isAdmin, requireSgnIn } from "../middlewares/authMiddleware.js";
const router = express.Router();



router.post("/register", registerController);
router.post("/login", loginController);
router.get("/test",requireSgnIn, isAdmin, testController);

router.post("/forgot-password", forgotPasswordController);

router.get("/user-auth",requireSgnIn, (req, res)=>{
    res.status(200).send({ ok: true });
});

router.get("/admin-auth", requireSgnIn, isAdmin, (req, res)=>{
    res.status(200).send({ ok: true });
});

export default router;