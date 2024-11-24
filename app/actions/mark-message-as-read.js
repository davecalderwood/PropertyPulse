'use server'
import connectDB from "@/config/database"
import Message from "@/models/Message";
import User from "@/models/User"
import { getSessionUser } from "@/utils/get-session-user"
import { revalidatePath } from "next/cache";

async function MarkMessageAsRead(messageId) {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
        throw new Error('User ID is required');
    }

    const { userId } = await getSessionUser();

    const message = await Message.findById(messageId);

    if (!message) throw new Error('Message not found');

    if (message.recipient.toString() !== userId) {
        throw new Error('Unauthorized');
    }

    message.read = !message.read;

    revalidatePath('/messages', 'page');

    await message.save();

    return message.read;
}

export default MarkMessageAsRead;