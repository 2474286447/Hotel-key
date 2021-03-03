<template>
	<view class="content">
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<view class="" @click="getACSS_TOKEN" style="font-size: 36px;">
			gettoken
		</view>
		<view class="" @click="test">
			test
		</view>
		<image :src="base64str"></image>
		<canvas id="canvas" :width="imgWidth" :height="imgHeight" class="canvas" onTouchStart="log" onTouchMove="log"
		 onTouchEnd="log" />

	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				apiKey: '',
				SecretKey: '',
				base64str: '',
				imgWidth: 0,
				imgHeight: 0
			}
		},
		onLoad() {
			// 在百度智能云那边创建一个应用后可以获取到下面两个参数 api Key  和  Secret Key
			uni.setStorageSync("apiKey", "Ia9ZNVjlMQq8bGW5Fm4AAx3z")
			uni.setStorageSync("SecretKey", "qvQGqhQPrSb6nQRw2YsbZWX0niftDbpH")
			this.apiKey = uni.getStorageSync('apiKey')
			this.SecretKey = uni.getStorageSync('SecretKey')
		},
		methods: {
			test() {
				let that = this
				let access_token = ""
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						let tempFilePaths = res.tempFilePaths[0]
						let imagePath = tempFilePaths
						my.getImageInfo({
							src: imagePath,
							success: async (res) => {
								that.imgWidth = res.width;
								that.imgHeight = res.height
								let canvas = my.createCanvasContext("canvas");
								canvas.drawImage(imagePath, 0, 0, that.imgWidth, that.imgHeight); // 1. 绘制图片至canvas
								// 绘制完成后执行回调
								canvas.draw(false, async () => {
									let base64 = await canvas.toDataURL({
										width: that.imgWidth,
										height: that.imgHeight,
										quality: 1,
									});
									that.requestImg(base64)
								});
							},
						});
					}
				});
			},

			requestImg(base64) {
				let newBase64 = base64
				base64 = base64.replace("data:image/png;base64,", "")
				let that = this;
				uni.request({
					url: `https://aip.baidubce.com/oauth/2.0/token`,
					data: {
						grant_type: 'client_credentials',
						client_id: that.apiKey,
						client_secret: that.SecretKey
					},
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					success: (res => {
						// 开始识别
						uni.request({
							url: 'https://aip.baidubce.com/rest/2.0/ocr/v1/idcard?access_token=' + res.data.access_token,
							method: 'POST',
							data: {
								image: base64,
								id_card_side: 'front' // 身份证 正反面  front：身份证含照片的一面  back：身份证带国徽的一面
							},
							header: {
								'Content-Type': 'application/x-www-form-urlencoded'
							},
							success: res => {
								console.log(res, "333")
								that.base64str = 'data:image/jpeg;base64,' + base64
								console.log(that.base64str)
								if (res.data.image_status == 'normal') {
									that.base64str = 'data:image/jpeg;base64,' + base64
								} else if (res.data.image_status == 'reversed_side') {
									uni.showToast({
										title: '身份证正反面颠倒',
										duration: 2000,
										icon: 'none'
									});
								} else if (res.data.image_status == 'non_idcard') {
									uni.showToast({
										title: '上传的图片中不包含身份证',
										duration: 2000,
										icon: 'none'
									});
								} else if (res.data.image_status == 'blurred') {
									uni.showToast({
										title: '身份证模糊',
										duration: 2000,
										icon: 'none'
									});
								} else if (res.data.image_status == 'other_type_card') {
									uni.showToast({
										title: '其他类型证照',
										duration: 2000,
										icon: 'none'
									});
								} else if (res.data.image_status == 'over_exposure') {
									uni.showToast({
										title: '身份证关键字段反光或过曝',
										duration: 2000,
										icon: 'none'
									});
								} else if (res.data.image_status == 'over_exposure') {
									uni.showToast({
										title: '身份证欠曝（亮度过低）',
										duration: 2000,
										icon: 'none'
									});
								} else {
									uni.showToast({
										title: '读取失败，请重新上传',
										duration: 2000,
										icon: 'none'
									});
								}
							},
							error: res => {}
						});
					})
				})
			},
			// access_token 有效期为 2592000 秒 / 30天
			getACSS_TOKEN() {
				let that = this
				uni.request({
					url: 'https://aip.baidubce.com/oauth/2.0/token',
					method: 'POST',
					data: {
						grant_type: 'client_credentials',
						client_id: this.apiKey, // 在百度智能云那边创建一个应用后可以获取
						client_secret: this.SecretKey // 在百度智能云那边创建一个应用后可以获取
					},
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					success: res => {
						console.log(res.data)
						uni.setStorageSync('access_token', res.data.access_token)
						// console.log(JSON.parse(res.data))
					}
				});
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
