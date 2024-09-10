import OperationStatus from "@/Components/OperationStatus";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";

const Main = () => {
    return (
        <Authenticated>
            <Head title="メイン" />
            {/* 運行状況 */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                        運行状況 （時点）
                    </h3>
                    <OperationStatus />
                </div>
            </div>
        </Authenticated>
    );
};

export default Main;
