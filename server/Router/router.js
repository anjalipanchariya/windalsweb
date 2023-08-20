import Router from "express"
import { insertInProductMaster, getInfoFromProductMaster, deleteFromProductMaster, updateProductMaster, getProductInfoFromProductMaster, getOneProductInfoFromProductMaster } from "../Controllers/productMasterController.js";

const router = Router();

/**POST MEATHODS */
router.route("/ProductMasterInsert").post(insertInProductMaster);

/**GET MEATHODS */
router.route('/ProductMasterGet').get(getInfoFromProductMaster);
router.route('/ProductMasterGetProduct').get(getProductInfoFromProductMaster);
router.route('/ProductMasterGetOneProduct').get(getOneProductInfoFromProductMaster);

/**DELETE MEATHODS */
router.route('/ProductMasterDelete').delete(deleteFromProductMaster);

/**PUT MEATHOD */
router.route('/ProductMasterUpdate').put(updateProductMaster);

export default router;