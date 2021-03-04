<template>
	<view class="bodySty">
		<view class="banner">
			<image src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20181219%2Faf71ea267eb24f7b8f491837ed2fe5c1.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617376170&t=4e1e6f10c87cc347195413e44675f675" mode="scaleToFill"></image>
		</view>
		<view class="navBody">
			<view class="flex align-center justify-around navSty">
				<view class="nav_item">
					<image src="/static/wifi.png" mode="aspectFit"></image>
					<view>WIFI</view>
				</view>
				<view class="nav_item">
					<image src="/static/wifi.png" mode="aspectFit"></image>
					<view>WIFI</view>
				</view>
				<view class="nav_item">
					<image src="/static/wifi.png" mode="aspectFit"></image>
					<view>WIFI</view>
				</view>
				<view class="nav_item">
					<image src="/static/wifi.png" mode="aspectFit"></image>
					<view>WIFI</view>
				</view>
			</view>
		</view>
		<view class="flex align-center justify-center">
			<view class="btn">
				开锁
			</view>
		</view>
		<view class="flex align-center justify-center tips">
			<view>未获取到该门锁</view>
		</view>
		<view class="flex align-center justify-center houseNum">1栋18楼 <text>1809蒹葭居双床房</text></view>
		<view class="flex align-center justify-center time">03-02 06:00--03-03 12:00</text></view>
	</view>
</template>

<script>
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
	.banner>image{
		height: 220rpx;
		width: 100vw;
	}
	.navBody{
		padding: 0 20rpx;
	}
	.navSty{
		padding: 20rpx;
		background-color: white;
		box-shadow: 0rpx 2rpx 10rpx 0rpx rgba(6, 0, 1, 0.2);
		transform: translateY(-30rpx);
	}
	.nav_item{
		text-align: center;
		width: 60rpx;
		font-size: 26rpx;
		color: #a1a19f;
	}
	.nav_item>image{
		width: 40rpx;
		height: 40rpx;
		margin-bottom: 10rpx;
	}
	.btn{
		width: 160rpx;
		height: 160rpx;
		border-radius: 100%;
		color: white;
		background-color: #0bb27e;
		font-size: 36rpx;
		font-weight: bold;
		text-align: center;
		line-height: 160rpx;
	}
	.tips{
		margin-top: 10rpx;
	}
	.tips>view{
		font-size: 22rpx;
		padding: 5rpx 10rpx;
		background-color: #F1F1F1;
	}
	.houseNum{
		margin-top: 10rpx;
		font-size: 28rpx;
	}
	.houseNum>text{
		color: #0bb27e;
	}
	.time{
		margin-top: 20rpx;
		font-size: 28rpx;
	}
</style>
