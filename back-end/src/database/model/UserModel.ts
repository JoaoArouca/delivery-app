import { DataTypes, Model } from 'sequelize';
// import db from './index'
import { db } from '../config/config';
import { IUser } from '../../interfaces';

class User extends Model implements IUser {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
}

User.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    underscored: true,
    sequelize: db,
    timestamps: false,
    tableName: 'users',
  },
);

export default User;