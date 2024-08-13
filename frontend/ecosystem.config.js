module.exports = {
    apps: [
        {
            name: "my-frontend-app",
            script: "npm",
            args: "run dev",
            cwd: "./"  // 指定工作目录（如果你的项目在当前目录下）
        }
    ]
};