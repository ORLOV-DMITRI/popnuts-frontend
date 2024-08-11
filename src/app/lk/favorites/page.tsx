import FavoritesContent from "@/components/lk-page/FavoritesContent/FavoritesContent";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Profile - Favorites",
};
export default function FavoritesPage() {
    return (
        <FavoritesContent/>
    )
}
