const express = require('express');
const router = express.Router();
const PackageController = require('../controllers/PackageController');

router
    .post('/', PackageController.CreatePackage)
    .get('/', PackageController.GetPackageById)
    .get('/pagination', PackageController.GetPackagesWithPagination)
    .get('/filteredPagination', PackageController.GetPackagesWithPaginationAndTags)
    .patch('/', PackageController.UpdatePackage)
    .delete('/', PackageController.DeletePackage)

module.exports = router;