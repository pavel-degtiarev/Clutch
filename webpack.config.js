const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

// =====================================================================

const entryPoint = "./src/index.jsx";
const htmlTemplate = "./src/index.html";
// const htmlTemplate = "./markup/main.html";
// const htmlTemplate = "./markup/stat.html";

const chunkCustomLibs = false;
const customLibs = "src/lib";

const targetFolder = "dist";
const targetImagesFolder = "images";
const targetFontsFolder = "fonts";

// =====================================================================

const isDevMode = process.env.NODE_ENV === "development";
const isProdMode = !isDevMode;

function fileName(ext = "[ext]") {
	return isDevMode ? `[name]${ext}` : `[name]-[contenthash:10]${ext}`;
}

function generateSourceMap() {
	return isDevMode ? "inline-source-map" : false;
}

function optimizationOptions(prodMode, chunkLibs = false) {
	const options = {
		minimize: prodMode,
		minimizer: [
			"...",
			new CssMinimizerWebpackPlugin(),
			new ImageMinimizerPlugin({
				minimizer: {
					implementation: ImageMinimizerPlugin.squooshMinify,
				},
			}),
		],
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendor",
					chunks: "all",
					reuseExistingChunk: true,
				},
			},
		},
	};

	if (chunkLibs) {
		options.splitChunks.cacheGroups.lib = {
			test: path.resolve(__dirname, customLibs),
			name: "lib",
			enforce: true,
			chunks: "all",
			reuseExistingChunk: true,
		};
	}
	
	return options;
}

function cssLoaders(moreLoaders = null) {
	const loaders = [
		MiniCssExtractPlugin.loader,
		{
			loader: "css-loader",
			options: {
				modules: { auto: true },
			},
		},
		{
			loader: "postcss-loader",
			options: {
				postcssOptions: {
					plugins: ["postcss-preset-env"],
				},
			},
		},
	];

	if (moreLoaders) loaders.push(moreLoaders);
	return loaders;
}

function jsLoaders(morePresets = null) {
	const opts = {
		loader: "babel-loader",
		options: {
			presets: ["@babel/preset-env"],
			plugins: [["@babel/transform-runtime"]],
		},
	};

	if (morePresets) opts.options.presets.push(morePresets);
	return opts;
}

function devServerOptions() {
	return {
		static: { directory: path.resolve(__dirname, targetFolder), watch: true },
		client: { logging: "error", overlay: false },
		open: { app: { name: "Google Chrome" } },
		historyApiFallback: true,
	};
}

// =====================================================================

module.exports = {
	entry: { bundle: entryPoint },
	output: {
		filename: fileName(".js"),
		path: path.resolve(__dirname, targetFolder),
		clean: isProdMode,
	},

	resolve: {
		extensions: [".jsx", ".tsx", ".ts", "..."],
		alias: {
			node_modules: path.resolve(__dirname, "./node_modules/"),
			markup: path.resolve(__dirname, "./markup/"),
			src: path.resolve(__dirname, "./src/"),
		},
	},

	devtool: generateSourceMap(),
	optimization: optimizationOptions(isProdMode, chunkCustomLibs),
	devServer: devServerOptions(),

	performance: {
		maxEntrypointSize: 1024000,
		maxAssetSize: 1024000,
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: jsLoaders(),
			},
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				use: jsLoaders("@babel/preset-react"),
			},
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				use: jsLoaders("@babel/preset-typescript"),
			},
			{
				test: /\.css$/,
				use: cssLoaders(),
			},
			{
				test: /\.scss$/,
				use: cssLoaders("sass-loader"),
			},
			{
				test: /\.html$/,
				use: ["html-loader"],
			},
			{
				test: /\.(webp|jpg|jpeg|png|svg|ico)$/,
				type: "asset/resource",
				generator: { filename: `${targetImagesFolder}/${fileName()}` },
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				type: "asset/resource",
				generator: { filename: `${targetFontsFolder}/${fileName()}` },
			},
		],
	},

	plugins: [
		new HtmlWebpackPlugin({ template: htmlTemplate }),
		new MiniCssExtractPlugin({ filename: `css/${fileName(".css")}` }),
	],
};
