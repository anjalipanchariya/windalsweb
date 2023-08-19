import Router from "express"
import { insertInProductMaster, getInfoFromProductMaster, deleteFromProductMaster, updateProductMaster } from "../Controllers/productMasterController.js";

const router = Router();

/**POST MEATHODS */
router.route("/insertInProductMaster").post(insertInProductMaster);

/**GET MEATHODS */
router.route('/getInfoFromProductMaster').get(getInfoFromProductMaster);

/**DELETE MEATHODS */
router.route('/deleteFromProducMaster').delete(deleteFromProductMaster);

/**PUT MEATHOD */
router.route('updateProducMaster').put(updateProductMaster);

export default router;