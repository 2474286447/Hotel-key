<template>
	<view class="roomCard">
		<view>
			{{roomCard.name}}
		</view>
		<view>
			<view>
				{{roomCard.address}}
			</view>
		</view>
		<view>
			<view>
				导航
			</view>
		</view>
		<view style="text-align: center;margin:30px 0px;">
			<img src="../../static/fk.png" style="width:240px;height:350px;" alt="">
		</view>
		<view style="text-align: center;">
			<view style="display: inline-block;
                           width: 70%;
             padding: 10px;
    border: 1px solid rgb(37, 167, 133);
    border-radius: 6px;
	color: rgb(37, 167, 133);">
				点击进入
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				roomCard: {
					name: "成都建国酒店",
					address: "1栋18楼1809号"
				}
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.roomCard>view:first-child {
		font-size: 36rpx;
		margin: 20rpx 0;
		text-align: center;
	}

	.roomCard>view:nth-child(2) {
		font-size: 36rpx;
		margin: 30rpx 0;
		text-align: center;
	}

	.roomCard>view:nth-child(2)>view {
		display: inline-block;
		padding: 4px 10px;
		border-radius: 100px;
		background-color: #e2e2e2;
	}

	.roomCard>view:nth-child(3) {
		text-align: center;
	}

	.roomCard>view:nth-child(3)>view {
		display: inline-block;
		padding: 4px 16px;
		border: 1px solid rgb(37, 167, 133);
		border-radius: 100px;
		color: rgb(37, 167, 133);
	}
</style>
