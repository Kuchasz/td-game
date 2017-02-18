module.exports = {
    entry: {
        file: "./src/client/index.ts"
    },
    output: {
        filename: "./public/bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            }
        ]
    },
    resolve: {
        modules: ["node_modules"],
        extensions: ['.js', '.ts']
    }
};