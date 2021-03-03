<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
			<button @click="btn">识别身份证</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello 支付宝小程序'
			}
		},
		onLoad() {

		},
		methods: {
			btn() {
				uni.navigateTo({
					url:"/pages/index/identity"
				})
				// my.startAPVerify({
				// 	url: 'https://openapi.alipay.com/gateway.do?alipay_sdk=alipay-sdk-java-4.9.5.ALL&app_id=2021002129650363&biz_content=%7B%22certify_id%22%3A%22a74bXXXXXXb0e4d42b9283bcfXXXXc1%22%7D&charset=UTF-8&format=json&method=alipay.user.certify.open.certify&sign=GPKGQpWQtkGWn98N%2F7HS8LOXli4dw1MH5LdK%2BZmR4k1j1PPvRubHZIq6jj5EQPi9CYtEYVGCUllb1pOGjgymWOGempjCiE9jx4CfyOD2SZ1JdTIw75dvkLQIlotd7Tli0BiaqCkpfv7b36bh2ORqFDGt8Zc50RI8AWqi8EyHDoMtq2ENGk8LXRcBNeeKUL0Fo9htOzgM3JXd5cqg8uPBhBawBAW7%2Bt5yT7dvogZYuMCAfaanUiPnjcWkxyobINxb4dusKybxRBHt0CXnxrLZi97Bdh6PnCqDZ36gYbw99P0TqG%2BJaUFWqLnbmu21OarI1m9aO6k1sFzb6g%3D%3D&sign_type=RSA2&timestamp=2020-05-28+18%3A12%3A04&version=1.0',
				// 	certifyId: "your_certifyId",
				// 	success: function(res) {
				// 		console.log('success', res)
				// 	},
				// 	fail: function(res) {
				// 		console.log('fail', res)
				// 	},
				// 	complete: function(res) {
				// 		console.log('complete', res)
				// 	}
				// })
			},
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
