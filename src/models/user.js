/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   user.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: JianJin Wu <mosaic101@foxmail.com>         +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/06/07 17:10:30 by JianJin Wu        #+#    #+#             */
/*   Updated: 2017/12/15 15:45:52 by JianJin Wu       ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const moment = require('moment')
const { UserStation } = require('./index')
/**
 * This is User model.
 * @module User
 */
module.exports = function (sequelize, DataTypes) {
  let User = sequelize.define('User', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    // -1: 失效 1: 正常
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    unionId: { type: DataTypes.STRING, unique: true },
    nickName: DataTypes.STRING,
    avatarUrl: DataTypes.STRING,

    email: { type: DataTypes.STRING, unique: true },
    phoneNO: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,

    // createdAt: {
    // 	type: DataTypes.DATE,
    // 	get: function() {
    // 		return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss')
    // 	}
    // },
    // updatedAt: {
    // 	type: DataTypes.DATE,
    // 	get: function() {
    // 		return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss')
    // 	}
    // }
  }, {
      freezeTableName: true,
      tableName: 'users',
      indexes: [
        {
          name: 'status',
          method: 'BTREE',
          fields: ['status']
        },
        {
          name: 'nickName',
          method: 'BTREE',
          fields: ['nickName']
        }
      ],
      classMethods: {
        associate: function (models) {
          User.hasMany(models.UserStation, { foreignKey: 'userId', as: 'stations' })
          User.hasMany(models.TicketUser, { foreignKey: 'userId' })
        }
      },
      // apply to find, findAll, update, count and destroy
      defaultScope: {
        where: {
          status: 1
        }
      },
      scopes: {
        deleted: {
          status: 0
        },
        stations: {
          include: {
            model: UserStation,
            where: {
              status: 1
            },
            attributes: ['stationId']
            // attributes: [ [Sequelize.col('stationId'), 'id'] ]
          }

        }
      }
    })

  return User
}
