<template>
	<div class="card" :class="className">
		<div class="header" :class="headerClassName">
			<div class="avatar-area">
				<img class="ellipse" alt="Ellipse" src="" />
			</div>
			<div class="content-area">
				<div class="text-wrapper">Card Title</div>
				<div class="div">Card Subtitle</div>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'Card',
		props: {
			property1: {
				type: String,
				default: 'default',
				validator: function(value) {
					return ['default'].indexOf(value) !== -1;
				}
			},
			className: {
				type: String,
				default: ''
			},
			headerClassName: {
				type: String,
				default: ''
			}
		}
	};
</script>

<style>
	.card {
		align-items: center;
		background: linear-gradient(180deg, rgb(190, 254, 230) 0%, rgb(208, 247, 251) 100%);
		border-radius: 10px;
		box-shadow: 0px 2px 15px #00000026;
		display: flex;
		flex-direction: column;
		height: 394px;
		justify-content: space-between;
		overflow: hidden;
		position: relative;
		width: 350px;
	}

	.card .header {
		align-items: flex-start;
		align-self: stretch;
		display: flex;
		flex: 0 0 auto;
		gap: 16px;
		padding: 16px;
		position: relative;
		width: 100%;
	}

	.card .avatar-area {
		align-items: flex-start;
		display: inline-flex;
		flex: 0 0 auto;
		flex-direction: column;
		position: relative;
	}

	.card .ellipse {
		height: 48px;
		object-fit: cover;
		position: relative;
		width: 48px;
	}

	.card .content-area {
		align-items: flex-start;
		align-self: stretch;
		display: flex;
		flex: 1;
		flex-direction: column;
		flex-grow: 1;
		gap: 8px;
		position: relative;
	}

	.card .text-wrapper {
		align-self: stretch;
		color: #000000;
		font-family: "Roboto-Bold", Helvetica;
		font-size: 24px;
		font-weight: 700;
		letter-spacing: 0;
		line-height: normal;
		margin-top: -1px;
		position: relative;
	}

	.card .div {
		align-self: stretch;
		color: #a9a9a9;
		font-family: "Roboto-Medium", Helvetica;
		font-size: 18px;
		font-weight: 500;
		letter-spacing: 0;
		line-height: normal;
		position: relative;
	}

	.card .content {
		align-items: flex-start;
		align-self: stretch;
		display: flex;
		flex-direction: column;
		height: 146px;
		justify-content: space-around;
		padding: 16px;
		position: relative;
		width: 100%;
	}

	.card .content-text {
		align-self: stretch;
		color: #000000;
		font-family: "Roboto-Regular", Helvetica;
		font-size: 16px;
		font-weight: 400;
		letter-spacing: 0;
		line-height: normal;
		margin-top: -1px;
		position: relative;
	}

	.card .action-bar {
		align-items: flex-end;
		align-self: stretch;
		display: flex;
		flex: 0 0 auto;
		gap: 8px;
		justify-content: flex-end;
		padding: 16px;
		position: relative;
		width: 100%;
	}

	.card .action {
		align-items: center;
		background-color: #ffffff;
		border: 1px solid;
		border-color: #000000;
		border-radius: 5px;
		display: inline-flex;
		flex: 0 0 auto;
		justify-content: center;
		overflow: hidden;
		padding: 8px 12px;
		position: relative;
	}

	.card .text-wrapper-2 {
		color: #000000;
		font-family: "Roboto-Medium", Helvetica;
		font-size: 16px;
		font-weight: 500;
		letter-spacing: 0;
		line-height: normal;
		margin-top: -1px;
		position: relative;
		white-space: nowrap;
		width: fit-content;
	}
</style>