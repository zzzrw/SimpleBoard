import React from "react";

const Introduction = () => {
    return (
        <section
            className="mt-8 mb-16 mx-16 py-12 px-32 border-4 border-sky-200 bg-gray-50 rounded-lg shadow-md bg-opacity-50">
            <div className="mx-auto text-center">
                <h2 className="text-4xl font-bold font-serif">功能介绍</h2>
                <div>
                    <div className="mt-12 mb-8  grid grid-cols-1 md:grid-cols-3 gap-16">
                        <div className="p-6 border rounded-lg shadow-lg hover:bg-sky-300 hover:text-gray-100">
                            <h3 className="text-xl font-semibold">项目创建</h3>
                            <p className="mt-2">一键创建属于您自己的工作项目</p>
                            <p>轻松管理工作事项</p>
                            <p>个性化的项目定制</p>
                        </div>
                        <div className="p-6 border rounded-lg shadow-lg hover:bg-sky-300 hover:text-gray-100">
                            <h3 className="text-xl font-semibold">任务添加</h3>
                            <p className="mt-2">任务轻松拆解</p>
                            <p>助您一步步轻松管理工作进度</p>
                            <p>自由评论、附件上传</p>
                        </div>
                        <div className="p-6 border rounded-lg shadow-lg hover:bg-sky-300 hover:text-gray-100">
                            <h3 className="text-xl font-semibold">看板展示</h3>
                            <p className="mt-2">直观的看板展示</p>
                            <p>各项工作一目了然</p>
                            <p>打造您的工作小助手</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Introduction;