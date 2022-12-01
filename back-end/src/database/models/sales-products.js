'use strict';

module.exports = (sequelize, DataTypes) => {
    const SaleProduct = sequelize.define('SaleProduct', {
        saleId: DataTypes.INTEGER,
        productId: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER,
    }, {
        tableName: 'sales-products',
        timestamps: false,
        underscored: true,
    });

    SaleProduct.associate = (models) => {
        models.Sale.belongsToMany(models.Product, {
        as: 'products',
        through: SaleProduct,
        foreignKey: 'saleId',
        otherKey: 'productId'
        });

    SaleProduct.associate = (models) => {
        models.Product.belongsToMany(models.Sale, {
        as: 'sale',
        through: SaleProduct,
        foreignKey: 'productId',
        otherKey: 'saleId'
        });
    }
}
    return SaleProduct;
  }