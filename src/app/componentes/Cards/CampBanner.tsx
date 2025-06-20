"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const CampBanner = () => {
    const [showBanner, setShowBanner] = useState(true);

    useEffect(() => {
        const closed = sessionStorage.getItem("campBannerClosed");
        if (closed) setShowBanner(false);
    }, []);

    const handleClose = () => {
        setShowBanner(false);
        sessionStorage.setItem("campBannerClosed", "true");
    };

    if (!showBanner) return null;

    return (
        <div className="fixed top-0 left-0 w-full bg-red-700 text-white text-sm md:text-base z-50 shadow-md">
            <div className="flex items-center justify-between px-4 py-2 max-w-screen-xl mx-auto">
                <p className="animate-pulse">
                    📣 Inscrições abertas para o <strong>Acampamento Ágape</strong>! Não fique de fora!
                </p>
                <div className="flex items-center gap-3">
                    <Link
                        href="/eventos"
                        className="bg-white text-red-700 px-3 py-1 rounded font-semibold hover:bg-red-100 transition"
                    >
                        Saiba mais
                    </Link>
                    <button onClick={handleClose} className="text-white text-xl hover:text-gray-200">&times;</button>
                </div>
            </div>
        </div>
    );
};

export default CampBanner;
