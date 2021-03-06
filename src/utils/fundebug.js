/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   fundebug.js                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: JianJin Wu <mosaic101@foxmail.com>         +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/05/24 13:58:44 by JianJin Wu        #+#    #+#             */
/*   Updated: 2017/12/15 15:39:19 by JianJin Wu       ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const fundebug = require('fundebug-nodejs')
const config = require('getconfig')

fundebug.config({
  apikey: '39609f21a72aaa89f25bdd7db2fbe28ad4eabd88242d1be9d62d499f6242ee34',
  slient: false,
  releaseStage: config.env || 'production',
  user: {
    name: 'mosaic',
    email: 'jianjin.wu@winsuntech.cn'
  }
})

module.exports = {

  notify(name, message, option) {
    name ? name : 'Prod'
    message ? message : 'no message'
    fundebug.notify(name, message, option)
  },

  notifyError(err, option) {
    if (err && err instanceof Error) {
      fundebug.notifyError(err, option)
    }
  }
}
