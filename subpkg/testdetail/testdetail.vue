<template>
	<view>
		<new-card :detail="detail[0]"></new-card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail: {},
			};
		},
		onLoad(options) {
			console.log(options);
			const {
				id
			} = options;
			this.getDetail(id);
		},
		methods: {
			async getDetail(id) {
				try {

					const {
						statusCode,
						data: res
					} = await uni.$http.get(`/moment/${id}`);
					console.log(res);
					console.log(statusCode);
					if (statusCode == "200") {
						this.detail = res;
						uni.$showMsg("Data loaded successfully");
					} else {
						console.error("Failed to load data. Server returned status code:", statusCode);
					}
				} catch (error) {
					console.error("Error fetching data:", error);
				} finally {
					uni.hideLoading();
				}
			},
		},

	}
</script>

<style lang="scss">

</style>