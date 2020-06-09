const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'production',
	entry: path.join(__dirname, 'src/index.js'),
	module: {
		rules: [
			{
				test: /.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: { sourceMap: true },
					},
				],
			},
			{
				test: /\.s[ac]ss$/,
				loader: 'sass-loader',
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/,
				use: [
					{
						loader: 'url-loader',
						options: { name: '[name]-[hash].[ext]', limit: 10000 },
					},
				],
			},
			{
				test: /\.(woff2?|eot|ttf|otf)$/,
				use: [
					{
						loader: 'file-loader',
						options: { name: '[name]-[hash].[ext]', outputPath: 'fonts'},
					},
				],
			},
		],
	},
	resolve: {
		modules: [path.join(__dirname, 'src'), 'node_modules'],
		extensions: ['*', '.js', '.jsx', '.css', '.scss'],
	},
	output: {
		filename: '[name]-[hash].js',
		path: path.resolve(__dirname, 'dist'),
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'src/index.html'),
			scriptLoading: 'defer',
			minify: false,
		}),
	],
};
