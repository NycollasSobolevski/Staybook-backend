const express = require('express');
const router = express.Router();
const PackageController = require('../controllers/PackageController');

router
    .post('/', PackageController.CreatePackage)
    .get('/', PackageController.GetPackageById)
    .get('/:page&:limit', PackageController.GetPackagesWithPagination)
    .get('/:page&:limit&:tags', PackageController.GetPackagesWithPaginationAndTags)
    .patch('/', PackageController.UpdatePackage)
    .delete('/', PackageController.DeletePackage)

module.exports = router;