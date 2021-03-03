openDoor: function(e) {
	var that = this
	app.request({
		url: ul.baseurl + "device/openDoor",
		data: {
			device_id: e,
		},
		success: function(res) {
			console.log(res)
			if (res.data.status == 0) {
				wx.reLaunch({
					url: "/pages/shouyun/jishi?way=" + 'toudi' + '&id=' + res.data.data.order_id + '&sid=' + e
				})
			} else if (res.data.status == 704) {
				that.lanya()
				// wx.showModal({
				//   title: '提示',
				//   content: '设备无网，开始蓝牙连接',
				//   showCancel: false,
				//   success: function (res) {
				//     if (res.confirm) {
				//     }
				//   }
				// })
			} else if (res.data.status == 705) {
				wx.showModal({
					title: '提示',
					content: '设备满溢，暂时无法投递',
					confirmText: '知道了',
					showCancel: false,
					success: function(res) {
						if (res.confirm) {
							wx.navigateBack({
								delta: 1,
							})
						}
					}
				})
			} else {
				wx.showModal({
					title: '提示',
					content: res.data.message,
					showCancel: false,
					success: function(ress) {
						if (ress.confirm) {
							if (res.data.status == 100) {
								wx.setStorageSync("userinfo", '')
								wx.redirectTo({
									url: '/pages/index/index',
								})
							} else {
								wx.redirectTo({
									url: '/pages/index/index',
								})
							}
						}
					}
				})
			}
		}
	})
}
openDoorTest: function(e) {
		var that = this
		app.request({
			url: ul.baseurl + "device/openDoorTest",
			data: {
				device_id: e,
			},
			success: function(res) {
				console.log(res)
				if (res.data.status == 0) {
					wx.reLaunch({
						url: "/pages/shouyun/jishi?way=" + 'toudi' + '&id=' + res.data.data.order_id + '&sid=' + e + '&gotest=' +
							1
					})
				} else if (res.data.status == 704) {
					that.lanya()
				} else {
					wx.showModal({
						title: '提示',
						content: res.data.message,
						showCancel: false,
						success: function(ress) {
							if (ress.confirm) {
								if (res.data.status == 100) {
									wx.setStorageSync("userinfo", '')
									wx.redirectTo({
										url: '/pages/index/index',
									})
								} else {
									wx.redirectTo({
										url: '/pages/index/index',
									})
								}
							}
						}
					})
				}
			}
		})
	},
	soulanya: function(e) {
		// var that = this
		// console.log("开始蓝牙-1-关蓝牙并重新打开", res);
		//重新打开蓝牙模块
		that.lanya()
		// wx.closeBluetoothAdapter({
		//   success: (res) => {
		//     console.log("开始蓝牙-1-关蓝牙并重新打开", res);
		//     //重新打开蓝牙模块
		//     that.lanya()
		//   }, fail: (err) => {
		//     console.log("开始蓝牙-1-出错", err);
		//     wx.showModal({
		//       title: '提示',
		//       content: '设备连接失败,请重试',
		//       showCancel: false,
		//       success: function (res) {
		//         if (res.confirm) {
		//           wx.redirectTo({
		//             url: '/pages/index/index',
		//           })
		//         }
		//       }
		//     })
		//   },
		// });
	}
lanya: function() {
		var that = this
		that.setData({
			openlanya: !that.data.openlanya
		})
		var that = this
		wx.openBluetoothAdapter({
			success: function(res) {
				console.log("开始蓝牙-1.5-蓝牙初始化", res);
				wx.getBluetoothAdapterState({
					success: function(res) {
						console.log("开始蓝牙-2-蓝牙初始化", res);
						var available = res.available
						if (!available) {
							console.log(available)
							console.log("开始蓝牙-2-蓝牙初始化失败", res);
							wx.onBluetoothAdapterStateChange(function(res) {
								console.log('adapterState changed, now is', res)
								that.search_BLE()
							})
							// wx.showModal({
							//   title: '提示',
							//   content: '请打开手机蓝牙重试',
							//   showCancel: false,
							//   success(res) {
							//     if (res.confirm) {
							//       wx.redirectTo({
							//         url: '/pages/index/index',
							//       })
							//     } else if (res.cancel) {
							//       console.log('用户点击取消')
							//     }
							//   }
							// })
							wx.getSystemInfo({
								success(res) {
									let type = res.system.substring(0, 7);
									if (type == 'Android') {
										wx.showModal({
											title: '提示',
											content: '请打开手机蓝牙重试',
											showCancel: false,
											success(res) {
												if (res.confirm) {
													wx.redirectTo({
														url: '/pages/index/index',
													})
												} else if (res.cancel) {
													console.log('用户点击取消')
												}
											}
										})
									} else {
										that.setData({
											bleShow: true
										})
									}
								}
							})
						} else {
							console.log("开始蓝牙-2-蓝牙初始化成功", res);
							wx.showToast({
								title: '请保持十米范围内',
								icon: 'loading',
								duration: 2000
							})
							that.search_BLE()
						}
					}
				})
			},
			fail: function(res) {
				// wx.hideLoading()
				wx.onBluetoothAdapterStateChange(function(res) {
					console.log('adapterState changed, now is', res)
					that.search_BLE()
				})
				console.log('进来了')
				wx.getSystemInfo({
					success(res) {
						let type = res.system.substring(0, 7);
						if (type == 'Android') {
							wx.showModal({
								title: '提示',
								content: '请打开手机蓝牙重试',
								showCancel: false,
								success(res) {
									if (res.confirm) {
										wx.redirectTo({
											url: '/pages/index/index',
										})
									} else if (res.cancel) {
										console.log('用户点击取消')
									}
								}
							})
						} else {
							that.setData({
								bleShow: true
							})
						}
					}
				})
			}
		})
	},
	openBle: function() {
		var that = this
		wx.getWifiList({
			success: function(e) {
				that.setData({
					bleShow: false
				})
				wx.redirectTo({
					url: '/pages/index/index',
				})
				wx.onGetWifiList(function(e) {
					console.log(e);
				});
			}
		});
	},
	// open_BLE: function () {
	//   console.log('开始计时')
	//   var that = this

	//   that.setData({
	//     isbluetoothready: !that.data.isbluetoothready,
	//   })
	//   if (that.data.isbluetoothready) {
	//     //开启蓝牙模块并初始化
	//     wx.openBluetoothAdapter({
	//       success: function (res) {

	//       },
	//       fail: function (res) {
	//         wx.showModal({
	//           title: '提示',
	//           content: '请打开手机蓝牙并重新扫码',
	//           showCancel: false,
	//           success(res) {
	//             if (res.confirm) {
	//               wx.navigateBack({
	//               })
	//             } else if (res.cancel) {
	//               console.log('用户点击取消')
	//             }
	//           }
	//         })
	//       }
	//     })
	//     //开启蓝牙模块并初始化
	//     //检查蓝牙模块是否初始化成功
	//     wx.getBluetoothAdapterState({
	//       success: function (res) {
	//         var available = res.available
	//         if (!available) {
	//           wx.showToast({
	//             title: '蓝牙初始化失败',
	//             icon: 'loading',
	//             duration: 2000
	//           })
	//         }
	//         else {
	//           console.log('蓝牙初始化成功');
	//           // wx.showToast({
	//           //   title: '蓝牙初始化成功',
	//           //   icon: 'success',
	//           //   duration: 2000
	//           // })
	//           that.search_BLE()
	//         }
	//       }
	//     })
	//     //检查蓝牙模块是否初始化成功
	//   }
	//   else {
	//     wx.closeBLEConnection({
	//       deviceId: that.data.connectedDeviceId,
	//       complete: function (res) {
	//         that.setData({
	//           deviceconnected: false,
	//           connectedDeviceId: ""
	//         })
	//         wx.showToast({
	//           title: '蓝牙连接断开',
	//           icon: 'success',
	//           duration: 2000
	//         })
	//       }
	//     })
	//     setTimeout(function () {
	//       that.setData({
	//         list: []
	//       })
	//       //释放蓝牙适配器
	//       wx.closeBluetoothAdapter({
	//         success: function (res) {
	//           that.setData({
	//             isbluetoothready: false,
	//             deviceconnected: false,
	//             devices: [],
	//             searchingstatus: false,
	//             receivedata: ''
	//           })
	//           wx.showToast({
	//             title: '蓝牙适配器释放',
	//             icon: 'success',
	//             duration: 2000
	//           })
	//         },
	//         fail: function (res) {

	//         }
	//       })
	//       //释放蓝牙适配器
	//     }, 1000)
	//   }
	// },
	// sousuo: function () {
	//   var that = this
	//   that.setData({
	//     openlanya: !that.data.openlanya
	//   })
	//   wx.openBluetoothAdapter({
	//     success: function (res) {
	//       //开启蓝牙模块并初始化 
	//       //检查蓝牙模块是否初始化成功
	//       wx.getBluetoothAdapterState({
	//         success: function (res) {
	//           var available = res.available
	//           if (!available) {
	//             wx.showToast({
	//               title: '蓝牙初始化失败',
	//               icon: 'loading',
	//               duration: 2000
	//             })
	//             that.setData({
	//               openlanya: false
	//             })
	//           }
	//           else {
	//             wx.showToast({
	//               title: '蓝牙初始化成功',
	//               icon: 'success',
	//               duration: 2000
	//             })
	//             that.setData({
	//               openlanya: true
	//             })
	//             that.search_BLE()
	//           }
	//         }
	//       })
	//     },
	//     fail: function (res) {
	//       wx.hideLoading()
	//       wx.showModal({
	//         title: '提示',
	//         content: '请打开手机蓝牙并重新扫码',
	//         showCancel: false,
	//         success(res) {
	//           if (res.confirm) {
	//             wx.navigateBack({
	//             })
	//           } else if (res.cancel) {
	//             console.log('用户点击取消')
	//           }
	//         }
	//       })
	//       that.setData({
	//         openlanya: false
	//       })
	//     }
	//   })

	// },
	search_BLE: function() {
		temp = []
		var that = this
		if (!that.data.searchingstatus) {
			//开始搜索附近蓝牙设备
			console.log("开始蓝牙-2.5-开始搜索附近蓝牙设备", serviceId);
			wx.startBluetoothDevicesDiscovery({
				services: [serviceId],
				success: function(res) {
					console.log("开始蓝牙-3-开始搜索附近蓝牙设备", res);
					that.setData({
						searchingstatus: !that.data.searchingstatus
					})
					wx.onBluetoothDeviceFound(function(res) {
						var devices = res.devices;
						console.log('new device list has founded')
						console.dir(devices)
					})
					times = setInterval(function() {
						wx.getBluetoothDevices({
							success: function(res) {
								console.log("开始蓝牙-4-获取蓝牙设备列表", JSON.stringify(res));
								var list = res.devices
								for (var i = 0; i < list.length; i++) {
									if (list[i]) {
										string_temp = string_temp + '\n' + list[i].deviceId
										if (list[i].advertisServiceUUIDs) {
											if (list[i].advertisServiceUUIDs.indexOf(serviceId) > -1) {
												console.log(JSON.stringify(list[i].advertisServiceUUIDs));
												that.setData({
													find: true,
													goread: that.data.goread + 1,
												})
												that.hasfind(list[i])
												clearInterval(times)
											}
										}
									}
								}
								that.setData({
									id_text: string_temp,
									list: list
								})
								// that.findlanya(list)
							}
						})
					}, 200)
				},
				fail: err => {
					console.log('搜索蓝牙信息失败', err)
					that.lanya()
				},
				complete: function(res) {
					console.log('搜索蓝牙信息成功', res)
				}
			})
			//开始搜索附近蓝牙设备
		} else {
			//停止搜索附近蓝牙设备
			wx.stopBluetoothDevicesDiscovery({
				success: function(res) {
					clearInterval(times)
					wx.showToast({
						title: '停止搜索BLE',
						icon: 'success',
						duration: 2000
					})
					that.setData({
						searchingstatus: !that.data.searchingstatus,
						find: false
					})
				}
			})

		}
	},
	// findlanya: function (list) {
	//   console.log(list)
	//   var that = this
	//   for (var i = 0; i < list.length; i++) {
	//     // var serviceIds = list[i].advertisServiceserviceIds ? list[i].advertisServiceserviceIds : []
	//     // console.log(serviceIds)
	//     // for (var j = 0; j < serviceIds.length; j++) {
	//       // if (serviceIds[j] == '7377647A-0000-1000-8000-00805F9B34FB') {
	//         console.log('已找到设备')
	//         that.setData({
	//           find: true,
	//           goread: that.data.goread + 1,
	//         })
	//         that.hasfind(list[i])
	//         clearInterval(times)
	//       // }
	//     // }
	//   }
	// },
	hasfind: function(item) {
		if (this.data.goread != 1) {
			return
		}
		console.log(item)
		var that = this
		that.setData({
			item: item
		})
		console.log('开始创建链接')
		wx.createBLEConnection({
			deviceId: item.deviceId,
			success: function(res) {
				console.log('链接成功')
				setTimeout(() => {
					that.kaishilanya(item)
				}, 1000)
				that.setData({
					deviceconnected: true,
					connectedDeviceId: item.deviceId
				})
				// 启用 notify 功能
				wx.notifyBLECharacteristicValueChange({
					state: true,
					deviceId: that.data.connectedDeviceId,
					serviceId: serviceId,
					characteristicId: characteristicId,
					success: function(res) {
						console.log('启用 notify 功能成功', res)
					},
					fail: function(err) {
						console.log('启用 notify 功能失败', err)
					}
				})
				// 启用 notify 功能
				// ArrayBuffer转为16进制数
				function ab2hex(buffer) {
					console.log(buffer)
					var hexArr = Array.prototype.map.call(
						new Uint8Array(buffer),
						function(bit) {
							return ('00' + bit.toString(16)).slice(-2)
						}
					)
					wx.onBLEConnectionStateChange(function(res) {
						// 该方法回调中可以用于处理连接意外断开等异常情况
						console.log(res.connected)
						if (res.connected == false) {
							wx.showToast({
								icon: 'loading',
								title: '蓝牙连接已断开',
							})
						}
					})
					return hexArr.join('');
				}
				// 16进制数转ASCLL码
				function hexCharCodeToStr(hexCharCodeStr) {
					var trimedStr = hexCharCodeStr.trim();
					var rawStr = trimedStr.substr(0, 2).toLowerCase() === "0x" ? trimedStr.substr(2) : trimedStr;
					console.log(rawStr)
					var len = rawStr.length;
					console.log('len:', len)
					var curCharCode;
					var resultStr = [];
					for (var i = 0; i < len; i = i + 2) {
						curCharCode = parseInt(rawStr.substr(i, 2), 16);
						resultStr.push(String.fromCharCode(curCharCode));
					}
					console.log('resultStr:', resultStr)
					return resultStr.join("");
				}
				//监听回调，接收数据
				wx.onBLECharacteristicValueChange(function(characteristic) {
					console.log(characteristic)
					var hex = ab2hex(characteristic.value)
					console.log('接收到蓝牙数据', hex)
					var txt = hexCharCodeToStr(hex)
					console.log(txt)
					var tx = JSON.parse(txt)
					console.log(tx)
					var encryptData = tx.D
					var px = JSON.stringify(encryptData)
					if (tx.T == 'open') {
						that.kaimen(px)
						wx.showToast({
							title: '蓝牙成功，开始开门',
						})
					} else {
						that.pleasrstop(px)
					}
					that.setData({
						receive_data: txt
					})
				})
				wx.stopBluetoothDevicesDiscovery({
					success: function(res) {
						console.log(res)
					}
				})
			},
			fail: function(res) {
				console.log('createBLEConnection失败', res)
				wx.stopBluetoothDevicesDiscovery({
					success: function(res) {
						console.log(res)
					}
				})
				wx.hideLoading()
				wx.showModal({
					title: '提示',
					content: '连接设备失败，请重试。',
					confirmText: '重试',
					success: function(res) {
						if (res.confirm) {
							that.setData({
								searchingstatus: !that.data.searchingstatus,
								goread: 0
							})
							that.lanya()
						} else {
							wx.redirectTo({
								url: '/pages/index/index',
							})
						}
					}
				})
			}
		})

	},
	chonglian: function() {
		var that = this
		var item = that.data.item
		that.hasfind(item)
	},

	closedoor: function(way) {
		var that = this
		var txt = way == 0 ? 'close' : 'close2'
		if (way == 0 && this.data.daojishiwan == 1) {
			txt = 'close2'
		}
		let buffer = new ArrayBuffer(txt.length)
		let dataView = new DataView(buffer)
		for (var i = 0; i < txt.length; i++) {
			dataView.setUint8(i, txt.charAt(i).charCodeAt())
		}
		console.log('蓝牙关门', txt)
		wx.getBLEDeviceServices({
			deviceId: that.data.connectedDeviceId, //搜索设备获得的蓝牙设备 id
			success(res) {
				console.log('getBLEDeviceServices成功:', res.services, that.data.serviceId)
				wx.getBLEDeviceCharacteristics({
					// 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
					deviceId: that.data.connectedDeviceId,
					// 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
					serviceId: serviceId,
					success(re) {
						console.log('getBLEDeviceCharacteristics成功:', re.characteristics)
						wx.writeBLECharacteristicValue({
							deviceId: that.data.connectedDeviceId,
							serviceId: serviceId,
							characteristicId: characteristicId,
							value: buffer,
							success: function(res) {
								console.log('关门写入成功', res)
								// wx.showToast({
								//   title: '开始关门',
								//   icon: 'loading',
								//   duration: 3000
								// })
								function ab2hex(buffer) {
									var hexArr = Array.prototype.map.call(
										new Uint8Array(buffer),
										function(bit) {
											return ('00' + bit.toString(16)).slice(-2)
										}
									)
									return hexArr.join('');
								}
								// 16进制数转ASCLL码
								function hexCharCodeToStr(hexCharCodeStr) {
									var trimedStr = hexCharCodeStr.trim();
									var rawStr = trimedStr.substr(0, 2).toLowerCase() === "0x" ? trimedStr.substr(2) : trimedStr;
									var len = rawStr.length;
									var curCharCode;
									var resultStr = [];
									for (var i = 0; i < len; i = i + 2) {
										curCharCode = parseInt(rawStr.substr(i, 2), 16);
										resultStr.push(String.fromCharCode(curCharCode));
									}
									return resultStr.join("");
								}
								// setTimeout(() => {
								// }, 2000)
								wx.onBLECharacteristicValueChange(function(characteristic) {
									var hex = ab2hex(characteristic.value)
									console.log('555555', hex)
									console.log(hexCharCodeToStr(hex))
									var txt = hexCharCodeToStr(hex)
									var tx = JSON.parse(txt)
									console.log(txt, tx)
									var encryptData = tx.D
									var px = JSON.stringify(encryptData)
									if (tx.T == 'open') {
										// that.kaimen(px)
									} else {
										that.pleasrstop(px, way)
									}
									that.setData({
										receive_data: hexCharCodeToStr(hex)
									})
								})

								// times = setInterval(function () {
								//   console.log('123')
								that.receiveMessages()
								// }, 1000)
							},
							fail: function(re) {
								console.log('失败了', re)
								wx.showModal({
									title: '提示',
									content: '蓝牙断开了,请重启蓝牙并重试',
									showCancel: false,
									success: function(res) {
										if (res.confirm) {
											wx.navigateBack({})
										}
									}
								})
							}
						})
					},
					fail(res) {
						console.log('getBLEDeviceCharacteristics失败:', res.services)
						console.log(res);
						wx.showModal({
							title: '提示',
							content: '连接设备失败，请重试。',
							confirmText: '重试',
							success: function(res) {
								if (res.confirm) {
									that.setData({
										searchingstatus: !that.data.searchingstatus,
										goread: 0
									})
									that.lanya()
								} else {
									wx.redirectTo({
										url: '/pages/index/index',
									})
								}
							}
						})
					}
				})
			},
			fail(res) {
				console.log('getBLEDeviceServices失败:', res.services)
				console.log(res);
				wx.showModal({
					title: '提示',
					content: '连接设备失败，请重试。',
					confirmText: '重试',
					success: function(res) {
						if (res.confirm) {
							that.setData({
								searchingstatus: !that.data.searchingstatus,
								goread: 0
							})
							that.lanya()
						} else {
							wx.redirectTo({
								url: '/pages/index/index',
							})
						}
					}
				})
			}
		})

	},
	qingqiukaimen: function(e) {
		var txt = JSON.stringify(e)
		var that = this

		let buffer = new ArrayBuffer(txt.length)
		let dataView = new DataView(buffer)
		for (var i = 0; i < txt.length; i++) {
			dataView.setUint8(i, txt.charAt(i).charCodeAt())
		}
		console.log(buffer)
		wx.getBLEDeviceServices({
			deviceId: that.data.connectedDeviceId, //搜索设备获得的蓝牙设备 id
			success(res) {
				console.log('getBLEDeviceServices成功:', res.services, that.data.serviceId)
				wx.getBLEDeviceCharacteristics({
					// 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
					deviceId: that.data.connectedDeviceId,
					// 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
					serviceId: serviceId,
					success(re) {
						console.log('getBLEDeviceCharacteristics成功:', re.characteristics)
						wx.writeBLECharacteristicValue({
							deviceId: that.data.connectedDeviceId,
							serviceId: serviceId,
							characteristicId: characteristicId,
							value: buffer,
							success: function(res) {
								console.log('开门写入成功', res)
								// wx.showToast({
								//   title: '发送成功',
								//   icon: 'success',
								//   duration: 2000
								// })
								var userInfo = app.globalData.userInfo
								console.log(userInfo)
								// var users = wx.getStorageSync("users") ? wx.getStorageSync("users") : ''
								if (that.data.testway == 1) {
									setTimeout(() => {
										that.setData({
											way: 'toudi',
											now: 'jishi'
										})
										that.daojishi()
									}, 500)
								} else {
									if (userInfo.role == 2 || userInfo.role == 3) {
										setTimeout(() => {
											that.setData({
												way: 'shouyun',
												now: 'jishi'
											})
											that.start()
										}, 500)
									} else {
										setTimeout(() => {
											that.setData({
												way: 'toudi',
												now: 'jishi'
											})
											that.daojishi()
										}, 500)
									}
								}
							},
							fail: function(re) {
								console.log('失败了', re)
								wx.showModal({
									title: '提示',
									content: '开门请求失败,请重启蓝牙并重试',
									showCancel: false,
									success: function(res) {
										if (res.confirm) {
											wx.navigateBack({

											})
										}
									}
								})
							}
						})
					},
					fail(res) {
						console.log('getBLEDeviceCharacteristics失败:', res.services)
						console.log(res);
					}
				})
			},
			fail(res) {
				console.log('getBLEDeviceServices失败:', res.services)
				console.log(res);
			}
		})

	},

	kaishilanya: function(item) {
		console.log('发送link请求', item)
		var that = this
		var txt = ''
		wx.getSystemInfo({
			success: function(res) {
				that.setData({
					systemInfo: res,
				})
				if (res.platform == "devtools") {
					txt = ''
				} else if (res.platform == "ios") {
					console.log('ios')
					txt = 'link|2'
				} else if (res.platform == "android") {
					console.log('android')
					txt = 'link|1'
				}
				// wx.showLoading({
				//   title: '加载中',
				// })
				wx.getBLEDeviceServices({
					deviceId: item.deviceId, //搜索设备获得的蓝牙设备 id
					success(res) {
						console.log('getBLEDeviceServices成功:', res.services, serviceId)
						wx.getBLEDeviceCharacteristics({
							// 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
							deviceId: item.deviceId,
							// 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
							serviceId: serviceId,
							success(re) {
								console.log('getBLEDeviceCharacteristics成功:', re.characteristics)
								let buffer = new ArrayBuffer(txt.length)
								let dataView = new DataView(buffer)
								for (var i = 0; i < txt.length; i++) {
									dataView.setUint8(i, txt.charAt(i).charCodeAt())
								}
								console.log(buffer)
								wx.writeBLECharacteristicValue({
									deviceId: item.deviceId,
									serviceId: serviceId,
									characteristicId: characteristicId,
									value: buffer,
									success: function(res) {
										console.log('发送link请求成功', res)
										// times = setInterval(function () {
										that.receiveMessages()
										// }, 1000)

									},
									fail: function(re) {
										wx.hideLoading()
										console.log('发送link请求失败了', re)
										wx.showModal({
											title: '提示',
											content: '蓝牙信息发送失败，请重试',
											success: function(res) {
												if (res.confirm) {
													that.setData({
														goread: 0,
													})
													that.kaishilanya(item)
												}
											}
										})
									}
								})
							},
							fail(res) {
								console.log('getBLEDeviceCharacteristics失败:', res.services)
								console.log(res);
							}
						})
					},
					fail(res) {
						console.log('getBLEDeviceServices失败:', res.services)
						console.log(res);
					}
				})
			}
		})

	},

	formSubmit: function(e) {
		var senddata = e.detail.value.senddata;
		var that = this
		let buffer = new ArrayBuffer(senddata.length)
		let dataView = new DataView(buffer)
		for (var i = 0; i < senddata.length; i++) {
			dataView.setUint8(i, senddata.charAt(i).charCodeAt())
		}

		wx.writeBLECharacteristicValue({
			deviceId: that.data.connectedDeviceId,
			serviceId: serviceId,
			characteristicId: characteristicId,
			value: buffer,
			success: function(res) {
				console.log('发送成功');
				// wx.showToast({
				//   title: '发送成功',
				//   icon: 'success',
				//   duration: 2000
				// })
			}
		})
	},

	receiveMessages: function() {
		console.log('接收蓝牙返回数据')
		var that = this;
		wx.readBLECharacteristicValue({
			deviceId: that.data.connectedDeviceId,
			serviceId: serviceId,
			characteristicId: characteristicId,
			success: function(res) {
				console.log('接收蓝牙返回数据成功', res)
				clearInterval(times)
			}
		})
	},

	daojishi: function() {
		var that = this
		init = setInterval(function() {
			if (that.data.toudi > 0) {
				var tt = that.data.toudi - 1
				that.setData({
					toudi: tt
				})
			} else {
				clearInterval(init);
				that.stop()
				that.setData({
					daojishiwan: 1
				})
			}
		}, 1000);
	},
	start: function() {
		clearInterval(init);
		var that = this;
		that.setData({
			hour: 0,
			minute: 0,
			second: 0,
			millisecond: 0
		})
		init = setInterval(function() {
			that.timer()
		}, 50);
	},
	stop: function() {
		console.log('开始关门')
		clearInterval(init);
		this.setData({
			jinxing: false
		})
		wx.showLoading({
			title: '结算中，请稍等'
		})
		this.closedoor(0)


	},
	stopsy: function() {
		console.log('开始关门')
		clearInterval(init);
		this.setData({
			jinxing: false
		})
		this.closedoor(1)

	},
	pleasrstop: function(e, way) {
		// wx.showLoading({
		//   title: '加载中。。。',
		// })
		wx.offBLECharacteristicValueChange(function(characteristic) {})

		var that = this
		if (that.data.testway == 1) {
			app.request({
				url: ul.baseurl + "device/closeDoorTest",
				data: {
					device_id: that.data.did,
					order_id: that.data.oid,
					data: e,
					have_net: 0
				},
				success: function(res) {
					console.log(res)
					wx.hideLoading()
					if (res.data.status == 0) {
						that.closeConnect()
						if (that.data.way == 'toudi') {
							var dat = res.data.data.order
							wx.redirectTo({
								url: '/pages/user/jiesuan?weight=' + dat.weight + '&money=' + dat.money,
							})
						} else {
							wx.redirectTo({
								url: '/pages/user/jiesuant',
							})
						}
					} else {
						wx.showModal({
							title: '提示',
							content: res.data.message,
						})
					}
				},
				fail: function(res) {
					wx.showModal({
						title: '提示',
						content: res.data.message,
						showCancel: false,
					})
				}
			})
		} else {
			app.request({
				url: ul.baseurl + "device/closeDoor",
				data: {
					device_id: that.data.id,
					order_id: that.data.oid,
					data: e,
					have_net: 0
				},
				success: function(res) {
					console.log(res)
					wx.hideLoading()
					if (res.data.status == 0) {
						that.closeConnect()
						if (that.data.way == 'toudi') {
							var dat = res.data.data.order
							wx.redirectTo({
								url: '/pages/user/jiesuan?weight=' + dat.weight + '&money=' + dat.money,
							})
						} else {
							wx.redirectTo({
								url: '/pages/user/jiesuant',
							})
						}
					} else {
						wx.showModal({
							title: '提示',
							content: res.data.message,
						})
					}
				},
				fail: function(res) {
					wx.showModal({
						title: '提示',
						content: res.data.message,
						showCancel: false,
					})
				}
			})
		}
	},
	Reset: function() {
		var that = this;
		clearInterval(init);
		that.setData({
			hour: 0,
			minute: 0,
			second: 0,
			millisecond: 0,
			timecount: '00:00:00'
		})
	},
	timer: function() {
		var that = this;
		that.setData({
			millisecond: that.data.millisecond + 5
		})
		if (that.data.millisecond >= 100) {
			that.setData({
				millisecond: 0,
				second: that.data.second + 1
			})
		}
		if (that.data.second >= 60) {
			that.setData({
				second: 0,
				minute: that.data.minute + 1
			})
		}
		if (that.data.minute >= 60) {
			that.setData({
				minute: 0,
				hour: that.data.hour + 1
			})
		}
		var hour = that.data.hour
		var min = that.data.minute
		var sec = that.data.second
		hour = hour < 10 ? '0' + hour : hour
		min = min < 10 ? '0' + min : min
		sec = sec < 10 ? '0' + sec : sec
		that.setData({
			timecount: hour + ":" + min + ":" + sec
		})
	},

	// 断开设备连接
	closeConnect() {
		var that = this
		wx.closeBLEConnection({
			deviceId: that.connectedDeviceId,
			success: function(res) {
				that.closelanya()
			},
			fail(res) {}
		})
	},
	closelanya: function() {
		var that = this
		wx.closeBluetoothAdapter({
			success: function(res) {
				that.setData({
					isbluetoothready: false,
					deviceconnected: false,
					devices: [],
					searchingstatus: false,
					receivedata: ''
				})
				wx.showToast({
					title: '蓝牙适配器释放',
					icon: 'success',
					duration: 2000
				})
			},
			fail: function(res) {

			}
		})
	},
	kaimen: function(e) {
		wx.offBLECharacteristicValueChange(function(characteristic) {})
		var id = this.data.id
		var did = this.data.did
		console.log('请求开门接口')
		var that = this
		if (that.data.testway == 1) {
			app.request({
				url: ul.baseurl + "device/openDoorBleTest",
				data: {
					device_id: did,
					data: e
				},
				success: function(res) {
					console.log('open门', res)
					wx.hideLoading()
					if (res.data.status == 0) {
						var oid = res.data.data.order_id
						that.setData({
							oid: oid
						})
						var encodeData = res.data.data.encodeData
						that.qingqiukaimen(encodeData)
					} else {
						wx.showModal({
							title: '提示',
							content: res.data.message,
						})
					}
					// wx.setStorageSync("device", res.data.data)
					// app.lianjie(res.data.data)
					// that.kaimen(e)
				},
				fail: function(res) {
					wx.hideLoading()
					wx.showModal({
						title: '提示',
						content: res.data.message,
						showCancel: false,
					})
				}
			})
		} else {
			app.request({
				url: ul.baseurl + "device/openDoorBle",
				data: {
					device_id: id,
					data: e
				},
				success: function(res) {
					console.log('open Ble 门', res)
					wx.hideLoading()
					if (res.data.status == 0) {
						var oid = res.data.data.order_id
						that.setData({
							oid: oid
						})
						var encodeData = res.data.data.encodeData
						that.qingqiukaimen(encodeData)
					} else {
						wx.showModal({
							title: '提示',
							content: res.data.message,
						})
					}
					// wx.setStorageSync("device", res.data.data)
					// app.lianjie(res.data.data)
					// that.kaimen(e)
				},
				fail: function(res) {

					wx.hideLoading()
					wx.showModal({
						title: '提示',
						content: res.data.message,
						showCancel: false,
					})
				}
			})
		}
	},
