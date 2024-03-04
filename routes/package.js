const express = require('express');
const router = express.Router();
const PackageController = require('../controllers/PackageController');

router
    .post('/', PackageController.CreatePackage)
    .get('/id/:id', PackageController.GetPackageById)
    .get('/pagination/:page&:limit', PackageController.GetPackagesWithPagination)
    .get('/pagination/tags/:page&:limit&:tags', PackageController.GetPackagesWithPaginationAndTags)
    .patch('/', PackageController.UpdatePackage)
    .delete('/', PackageController.DeletePackage)

module.exports = router;