import { Outlet } from "react-router";
import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";

export default function FeedLayout() {
    return (
        <div className="min-h-screen bg-black text-white">
            <Header heading="The Bug Fórum" subheading="Atlética UFVJM - SI" />

            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex flex-col lg:flex-row gap-6">
                    <Sidebar />
                    <Outlet />
                </div>
            </div>
        </div>
    )
}