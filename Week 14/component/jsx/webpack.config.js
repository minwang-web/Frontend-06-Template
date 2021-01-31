module.exports = {
    entry:"./main.js",
    //模块
    module:{
        rules:[
            {
                test:/\.js$/,
                use:{
                    loader:"babel-loader",
                    options:{
                        presets:["@babel/preset-env"],
                        /** pragma后面可配置名字*/
                        plugins:[["@babel/plugin-transform-react-jsx",{pragma:"createElement"}]]
                    }
                }
            }
        ]
    },
    mode:"development" //表示是开发者模式，打包后的文件不在压缩，可调式
}