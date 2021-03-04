<template>
	<view>
		<view class="flex hesder">
			<image :src="userInfo.avatar" mode="aspectFill"></image>
			<view>
				<view class="userInfo_name">{{userInfo.name}}</view>
				<view class="userInfo_isAuth">{{userInfo.isAuth==1?'已认证':'未认证'}}</view>
			</view>
		</view>
		<view class="functionBody">
			<view class="flex align-center justify-between cell">
				<view class="flex align-center">
					<image src="/static/history.png" mode="aspectFit" class="cell_icon"></image>
					<text>我的入驻记录</text>
				</view>
				<image src="/static/rightArr.png" mode="aspectFit"></image>
			</view>
			<view class="flex align-center justify-between cell" @tap="jumpAuth()">
				<view class="flex align-center">
					<image src="/static/auth.png" mode="aspectFit" class="cell_icon"></image>
					<text>我的认证信息</text>
				</view>
				<image src="/static/rightArr.png" mode="aspectFit"></image>
			</view>
			<view class="helpCell">
				<view class="flex align-center margin-bottom">
					<image src="/static/bangzhu.png" mode="aspectFit" class="cell_icon"></image>
					<text>帮助中心</text>
				</view>
				<view class="flex align-center justify-between helpCell_cell">
					<view>入驻流程</view>
					<image src="/static/rightArr.png" mode="aspectFit"></image>
				</view>
				<view class="flex align-center justify-between helpCell_cell">
					<view>开门失败</view>
					<image src="/static/rightArr.png" mode="aspectFit"></image>
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
				}
			}
		},
		onLoad() {

		},
		methods: {
			jumpAuth(e) {
				uni.navigateTo({
					url: '/pages/index/myAuthInfo',
				});
			}
		}
	}
</script>

<style>
	page {
		background-color: #f1f2f6;
	}

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

	.hesder {
		height: 350rpx;
		background-color: #01b377;
		align-items: center;
		padding-left: 25rpx;
		/* padding-top: 50rpx; */
	}

	.hesder>image {
		width: 135rpx;
		height: 135rpx;
		border-radius: 100%;
		border: 5rpx solid white;
		margin-right: 20rpx;
	}

	.userInfo_name {
		color: #ffffff;
		font-size: 36rpx;
		font-weight: bold;
		margin-bottom: 20rpx;
	}

	.userInfo_isAuth {
		padding: 5rpx 10rpx;
		background-color: white;
		color: #007AFF;
		font-size: 26rpx;
		display: inline-block;
		border-radius: 10rpx;
	}

	.functionBody {
		padding: 0 30rpx;
	}

	.cell {
		padding: 30rpx;
		background-color: white;
		box-shadow: 0rpx 2rpx 10rpx 0rpx rgba(6, 0, 1, 0.2);
		border-radius: 10rpx;
		font-size: 32rpx;
		margin-bottom: 30rpx;
		transform: translateY(-40rpx);
		font-weight: bold;
	}

	.cell_icon {
		width: 40rpx;
		height: 40rpx;
		margin-right: 10rpx;
	}

	.cell>image {
		width: 30rpx;
		height: 40rpx;
	}

	.helpCell {
		padding: 30rpx;
		background-color: white;
		box-shadow: 0rpx 2rpx 10rpx 0rpx rgba(6, 0, 1, 0.2);
		border-radius: 10rpx;
		font-size: 32rpx;
		margin-bottom: 30rpx;
		transform: translateY(-40rpx);
		font-weight: bold;
	}

	.helpCell_cell {
		font-weight: normal;
		color: #424242;
		padding-left: 50rpx;
		margin-bottom: 30rpx;
	}

	.helpCell_cell>image {
		width: 30rpx;
		height: 40rpx;
	}
</style>
