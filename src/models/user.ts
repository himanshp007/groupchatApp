import sequel from "../utils/database" ;
import {DataTypes} from "sequelize";


const User = sequel.define('user',{

    id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    name:  DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    phone:  {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: DataTypes.STRING,

})



export default User;