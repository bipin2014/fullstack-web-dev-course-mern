const Brand = require('../models/brand');

exports.getBrandById = async (req, res, next, id) => {
    try {
        const brand = await Brand.findById(id)
        if (!brand) {
            return res.status(400).json({ error: 'No Brand found' });
        }
        req.brand = brand;
        next();
    } catch (err) {
        return res.status(400).json({ error: err?.message || 'No Brand found' });
    }
};

exports.getBrand = (req, res) => {
    return res.json(req.brand);
}

exports.getAllBrands = async (req, res) => {
    try {
        const brands = await Brand.find()
        res.json(brands)
    } catch (err) {
        return res.status(400).json({ error: err?.message || 'No Brand found' });
    }
}
exports.createBrand = async (req, res) => {
    try {
        const brand = new Brand(req.body)
        const createdBrand = await brand.save()
        res.json({ message: 'Brand Created Sucessfully', brand: createdBrand })
    } catch (err) {
        return res.status(400).json({ error: err?.message || 'No Brand found' });
    }
}

exports.updateBrand = async (req, res) => {
    try {
        const brand = req.brand
        brand.name = req.body.name;
        const updatedBrand = await brand.save()

        res.json({ message: 'Brand Updated Sucessfully', brand: updatedBrand })
    } catch (err) {
        return res.status(400).json({ error: err?.message || 'No Brand found' });
    }
}

exports.deleteBrand = async (req, res) => {
    try {
        const brand = req.brand
        await brand.deleteOne()
        res.json({ message: 'Brand Deleted Sucessfully' })
    } catch (err) {
        return res.status(400).json({ error: err?.message || 'No Brand found' });
    }
}