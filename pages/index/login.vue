<template>
	<view class="bodySty">
		<image src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3792907776,1208571749&fm=26&gp=0.jpg" mode="widthFix"></image>
		<view class="fromSty">
			<view class="inputSty">
				<input type="text" :value="phone" placeholder="请输入手机号" placeholder-class="placeholder_class" />
			</view>
			<view class="inputSty">
				<input type="text" :value="phone" placeholder="请输入验证码" placeholder-class="placeholder_class" />
				<view class="getCode">
					发送验证码
				</view>
			</view>
			<view class="agreement">
				阅读并同意以下协议 <text>《用户协议》</text>
			</view>
			<button type="primary" class="loginBtn">绑定</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: '',
				verCode: ''
			}
		},
		onLoad() {

		},
		methods: {}
	}
</script>

<style>
	.bodySty>image {
		position: fixed;
		height: 60vh;
		width: 100vw;
		/* top: 0; */
		bottom: 0;
		left: 0;
		right: 0;
		z-index: -1;
	}

	.fromSty {
		width: 70vw;
		margin: auto;
		margin-top: 200rpx;
		padding: 40rpx;
		background-color: white;
		box-shadow: 0rpx 0rpx 10rpx 0rpx rgba(6, 0, 1, 0.3);
	}

	.inputSty {
		margin-top: 30rpx;
		position: relative;
		width: 100%;
	}

	.inputSty>input {
		width: 100%;
		border-bottom: 2rpx solid #dedede;
		font-size: 32rpx;
		padding-left: 10rpx;
		padding-bottom: 10rpx;
		padding-top: 10rpx;
		box-sizing: border-box;
	}

	.inputSty>.placeholder_class {
		font-size: 32rpx;
		color: #b3b3b3;
	}

	.getCode {
		padding: 10rpx;
		color: #ff5a00;
		font-size: 22rpx;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: -15rpx;
	}

	.agreement {
		margin-top: 30rpx;
		font-size: 24rpx;
		text-align: center;
	}

	.agreement>text {
		color: #ff5a00;
	}

	.loginBtn {
		margin-top: 30rpx;
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		background-color: #ff5a00;
		font-size: 28rpx;
		border-radius: 20rpx;
	}
</style>
