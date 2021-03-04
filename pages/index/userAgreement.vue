<template>
        <view class="grace-rich-text">
            <rich-text type="text" :nodes="demoHtml"></rich-text>
        </view>
</template>

<script>
	var graceRichText = require("../../components/richText.js");
	export default {
		components: {
			
		},
		data() {
			return {
				demoHtml: ''
			}
		},
		onLoad() {
			this.demoHtml = graceRichText.format('<p><img src=\"http://taoqi.wm72.mttest.cn/upload/image/20210201/012059e537e315a02ba4d7319a306966.jpg\" style=\"max-width:100%;\"><br></p>');
		},
		methods: {}
	}
</script>

<style>
</style>
