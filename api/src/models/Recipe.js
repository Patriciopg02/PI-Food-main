const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull:false,
    },
    health_score: {
      type: DataTypes.INTEGER
    },
    instructions: {
      type: DataTypes.ARRAY(DataTypes.JSON)
    },
    image: {
      type: DataTypes.STRING
    }
  },
  {
    timestamps: false
  });
};
