<template>
	<view class="bodySty">
		<view class="hederSty"></view>
		<view class="userInfo">
			<view class="userInfo_avatar">
				<image :src="userInfo.avatar" mode="aspectFill"></image>
			</view>
			<view class="flex align-center">
				<view class="userInfo_name">{{userInfo.name}}</view>
				<view class="userInfo_isAuth">{{userInfo.isAuth==1?'已认证':'未认证'}}</view>
			</view>
		</view>
		<view class="authBody">
			<view class="flex align-center margin-bottom authBody_title">
				<image src="/static/auth.png" mode="aspectFit"></image>
				<text>您的认证信息</text>
			</view>
			<view class="authInfo">
				<view class="flex align-center authInfo_name">
					<text>{{authInfo.name}}</text>
					<image v-if="authInfo.gender=='男'" src="/static/male.png" mode="aspectFit"></image>
					<image v-else src="/static/female.png" mode="aspectFit"></image>
				</view>
				<view class="flex align-center authInfo_contnet">
					出生日期：<text>{{authInfo.birthday}}</text>
				</view>
				<view class="flex align-center authInfo_contnet">
					证件号码：<text>{{authInfo.idcard}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {
					avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20190225%2F5ca9ccfa9cae496e9e8a8ff7d46d1073.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614245931&t=b4db10ce4d1ff9307223e0aac4620a32',
					name: '肖明昌Shawn',
					isAuth: 1
				},
				authInfo:{
					name:"肖明昌",
					gender:'男',
					birthday:'1986-11-14',
					idcard:'gba***********69dc'
				}
			}
		},
		onLoad() {

		},
		methods: {}
	}
</script>

<style>
	.flex {
		display: flex;
	}

	.align-center {
		align-items: center;
	}

	.justify-center {
		justify-content: center;
	}

	.justify-between {
		justify-content: space-between;
	}

	.justify-around {
		justify-content: space-around;
	}

	.margin-bottom {
		margin-bottom: 30rpx;
	}

	.bodySty {
		padding-top: 70rpx;
	}

	.hederSty {
		width: 100vw;
		height: 150rpx;
		background-color: #03b277;
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		z-index: -1;
	}

	.userInfo {
		z-index: 1;
		padding-bottom: 50rpx;
		border-bottom: 1rpx solid #F1F1F1;
	}

	.userInfo_avatar>image {
		width: 140rpx;
		height: 140rpx;
		border-radius: 100%;
		border: 10rpx solid white;
		margin-left: 20rpx;
	}

	.userInfo_name {
		font-size: 36rpx;
		font-weight: bold;
		margin-left: 30rpx;
		margin-right: 10rpx;
	}

	.userInfo_isAuth {
		padding: 5rpx 10rpx;
		background-color: #dff0e9;
		color: #38b188;
		font-size: 26rpx;
		border-radius: 10rpx;
	}

	.authBody {
		padding: 30rpx;
	}

	.authBody_title {
		font-size: 32rpx;
		color: #aeacab;
	}

	.authBody_title>image {
		width: 40rpx;
		height: 40rpx;
		margin-right: 20rpx;
	}
	.authInfo{
		width: 550rpx;
		height: 260rpx;
		border-radius: 10rpx;
		background-color: #e7f7fe;
		padding: 40rpx;
	}
	.authInfo_name{
		font-size: 32rpx;
		font-weight: bold;
		margin-bottom: 20rpx;
	}
	.authInfo_name>image{
		width: 30rpx;
		height: 30rpx;
		margin-left: 20rpx;
	}
	.authInfo_contnet{
		font-size: 32rpx;
		color: #97a6ab;
		margin-bottom: 20rpx;
	}
</style>
