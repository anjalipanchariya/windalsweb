import Router from "express"
import { insertInProductMaster, getInfoFromProductMaster, deleteFromProductMaster, updateProductMaster, getOneProductAllParametersInfoFromProductMaster, getOneProductOneParameterInfoFromProductMaster } from "../Controllers/productMasterController.js";
import {insertIntoStationMaster,deleteFromStationMaster,getInfoFromStationMaster} from "../Controllers/stationMasterController.js";
const router = Router();

/**POST MEATHODS */
router.route("/ProductMasterInsert").post(insertInProductMaster);
router.route("/StationMasterInsert").post(insertIntoStationMaster)

/**GET MEATHODS */
router.route('/ProductMasterGet').get(getInfoFromProductMaster);
router.route('/ProductMasterGetOneProductAllParameters').get(getOneProductAllParametersInfoFromProductMaster);
router.route('/ProductMasterGetOneProductOneParameter').get(getOneProductOneParameterInfoFromProductMaster);
router.route("/StationMasterGet").get(getInfoFromStationMaster)

/**DELETE MEATHODS */
router.route('/ProductMasterDelete').delete(deleteFromProductMaster);
router.route('/StationMasterDelete').delete(deleteFromStationMaster)

/**PUT MEATHOD */
router.route('/ProductMasterUpdate').put(updateProductMaster);

export default router;