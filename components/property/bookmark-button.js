'use client'
import { useState, useEffect } from "react";
import bookmarkProperty from "@/app/actions/bookmark-property";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import checkBookmarkStatus from "@/app/actions/check-bookmark-status";

const BookmarkButton = ({ property }) => {
    const { data: session } = useSession();
    const userId = session?.user?.id;

    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!userId) {
            setIsLoading(false);
            return;
        }

        checkBookmarkStatus(property._id).then((res) => {
            if (res.error) toast.error(res.error);
            if (res.isBookmarked) setIsBookmarked(res.isBookmarked);
            setIsLoading(false);
        })

    }, [property._id, userId, checkBookmarkStatus]);

    const handleClick = async () => {
        console.log(session)
        if (!userId) {
            toast.error('You must sign in to bookmark a property');
            return;
        }

        bookmarkProperty(property._id).then((res) => {
            if (res.error) return toast.error(res.error);
            setIsBookmarked(res.isBookmarked);
            toast.success(res.message);
        })
    }

    if (isLoading) {
        return <p className="text-center">Loading...</p>
    }

    return isBookmarked ? (
        <button
            onClick={handleClick}
            className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
            <FaBookmark className="mr-2" /> Remove Bookmark
        </button>
    ) : (
        <button
            onClick={handleClick}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
            <FaBookmark className="mr-2" /> Bookmark Property
        </button>
    )
}

export default BookmarkButton;