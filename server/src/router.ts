import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here

router.get("/api/users", userActions.browse);
router.post("api/users", userActions.add);

/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/itemActions";
import userActions from "./modules/user/userActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

/* ************************************************************************* */

export default router;
