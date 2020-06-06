const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: path.join(__dirname, 'src/index.js'),
	mode: 'development',
	module: {
		rules: [
			{
				test: /.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
			{
				test: /\.((c|sa|sc)ss)$/i,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							modules: {
								localIdentName: '[local]__[hash:base64:5]',
							},
						},
					},
				],
			},
			{
				test: /\.s[ac]ss$/i,
				loader: 'sass-loader',
			},
			{
				test: /\.(jpe?g|png|gif|woff2?|eot|ttf|otf|svg)$/,
				use: [
					{
						loader: 'url-loader',
						options: { limit: 15000 },
					},
				],
			},
		],
	},
	resolve: {
		modules: [path.join(__dirname, 'src'), 'node_modules'],
		extensions: ['*', '.js', '.jsx'],
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/dist/',
	},
	devtool: 'eval-source-map',
	devServer: {
		contentBase: path.join(__dirname, 'public'),
		publicPath: '/dist/',
		historyApiFallback: true,
		hotOnly: true,
	},
	plugins: [new webpack.HotModuleReplacementPlugin()],
};
