import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../../../utils/dbConfig';

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id?: number;
    declare email?: string;
}

export class Links extends Model<InferAttributes<Links>, InferCreationAttributes<Links>> {
    declare id?: number;
    declare user_id?: number;
    declare svg_link?: string | null;
    declare png_link?: string | null;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        // paranoid: true,
    }
);

Links.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        svg_link: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
        png_link: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
    },
    {
        sequelize,
        modelName: 'Links',
        tableName: 'links',
        // paranoid: true,
    }
);

User.hasMany(Links, {
    foreignKey: 'user_id',
    sourceKey: 'id',
});

Links.belongsTo(User, {
    foreignKey: 'user_id',
    targetKey: 'id',
});
