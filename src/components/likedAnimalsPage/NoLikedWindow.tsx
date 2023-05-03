import { Icon } from "@iconify/react";
import Link from "next/link";

export const NoLikedWindow: React.FC = () => {
    return (
        <section className=" pt-20 flex justify-center text-center font-semibold text-gray-700">
            <div className=" max-w-xl">
                <p className="text-3xl">There is no favorites yet(.</p>
                <p className=" mt-3 text-xl">
                    When you find a pet you love, add it to your favorites list
                    by tapping the
                    <Icon
                        icon="mdi:cards-heart"
                        color="#fda4af"
                        width={19}
                        height={19}
                        className=" inline-block ml-2"
                    />
                </p>
                <button className="mt-7 bg-red-300 rounded-xl text-white text-center hover:bg-red-400 transition-all">
                    <Link href={"/"} className="h-full block p-4">
                        Back to main
                    </Link>
                </button>
            </div>
        </section>
    );
};
