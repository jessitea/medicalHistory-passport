var bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
      len: [1]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    }, 
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    } 
  }
  //   {
  //     // We're saying that we want our User to have medNotes, todo, doctor
  //     classMethods: {
  //       associate: function(models) {
  //         // Associating User with the medNotes, todo, and doctors
  //         // User.hasMany(models.MedNotes, {
  //         //   onDelete: "cascade"
  //         // });

  //         // User.hasMany(models.ToDo, {
  //         //   onDelete: "cascade"
  //         // });

  //         // User.hasMany(models.Doctor, {
  //         //   onDelete: "cascade"
  //         // });

  //         User.hasMany(models.Appointment, {
  //           onDelete: "cascade"
  //         });
  //       }
  //     }
  // }
  );
  User.associate = function(models){
    User.hasMany(models.Appointment)
    User.hasMany(models.ToDo)
    User.hasMany(models.MedNotes)
    User.hasMany(models.Doctor)
  };

   User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.hook("beforeCreate", function(user, options){
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });

  // User.associate = function(models){
  //   User.hasMany(models.ToDo)
  // }

  // User.associate = function(models){
  //   User.hasMany(models.MedNotes)
  // }

  // User.associate = function(models){
    
  // }
  return User;
};
