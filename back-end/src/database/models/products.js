'use strict';

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        id: {
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        name: DataTypes.STRING(100),
        price: DataTypes.DECIMAL(4,2),
        urlImage: DataTypes.STRING(200),
    }, {
        tableName: 'products',
        timestamps: false,
        underscored: true,
    });

    Product.associate = (models) => {
        Product.hasMany(models.SaleProduct, {
            foreignKey: 'product_id'
        })
    }
    return Product;
  }