"use server";

import { httpClient } from "@/lib/axios/httpClient";

export interface IChatMessage {
    role: "user" | "assistant" | "system" | "tool";
    content: string;
}

export const chatWithAI = async (messages: IChatMessage[]): Promise<string> => {
    try {
        const res = await httpClient.post<string>("/ai/chat", { messages });
        return res.data;
    } catch (error) {
        console.error("Error in AI chat service:", error);
        throw new Error("Failed to get response from AI assistant");
    }
};

export const generateEventDescription = async (payload: {
    title: string;
    category?: string;
    tags?: string[];
}): Promise<string> => {
    try {
        const res = await httpClient.post<string>("/ai/generate-description", payload);
        return res.data;
    } catch (error) {
        console.error("Error in AI description service:", error);
        throw new Error("Failed to generate event description");
    }
};
