"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X, Send, Trash2, RotateCcw } from "lucide-react";
import clsx from "clsx";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  role: "user" | "ai";
  content: string;
  status?: "sending" | "error" | "success";
}

interface AISidebarProps {
  isOpen: boolean;
  onClose: () => void;
  bookContext?: {
    judul: string;
    penulis?: string;
    penerbit?: string;
    deskripsi?: string;
  };
}

const AISidebar: React.FC<AISidebarProps> = ({ isOpen, onClose, bookContext }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Jika ada bookContext baru, bersihkan pesan lama (atau bisa juga tambahkan pesan selamat datang khusus buku)
    if (bookContext && messages.length === 0) {
      setMessages([{
        role: "ai",
        content: `Halo! Saya asisten AI Stelkbook. Kamu sedang membaca buku "${bookContext.judul}"${bookContext.penulis ? ` karya ${bookContext.penulis}` : ""}. Ada yang ingin kamu tanyakan tentang buku ini?`
      }]);
    }
  }, [bookContext]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");

    // Add user message to state
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    // Add an empty AI message that we will fill with content
    setMessages((prev) => [...prev, { role: "ai", content: "", status: "sending" }]);

    setIsLoading(true);

    try {
      // Use full URL to avoid potential relative path issues
      const apiUrl = `${window.location.origin}/api/ai`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userPrompt: userMessage,
          pdfContext: bookContext ? `Judul: ${bookContext.judul}\nPenulis: ${bookContext.penulis}\nDeskripsi: ${bookContext.deskripsi}` : ""
        }),
      });

      // Check content type first WITHOUT reading the body
      const contentType = response.headers.get("content-type");

      if (!response.ok) {
        // Handle error responses - read the body once
        let errorMessage = `Server error: ${response.status}`;

        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } else {
          errorMessage = await response.text() || errorMessage;
        }

        throw new Error(errorMessage);
      }

      // Handle successful JSON response (non-streaming)
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        setMessages((prev) => {
          const newMessages = [...prev];
          const lastIdx = newMessages.length - 1;
          if (lastIdx >= 0 && newMessages[lastIdx].role === "ai") {
            newMessages[lastIdx] = {
              ...newMessages[lastIdx],
              content: data.response || "No response",
              status: "success"
            };
          }
          return newMessages;
        });
        setIsLoading(false);
        return;
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      if (!reader) throw new Error("Gagal membaca response stream");

      const decoder = new TextDecoder();
      let accumulatedResponse = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulatedResponse += chunk;

        // Update the last message (which is the AI response) with accumulated text
        setMessages((prev) => {
          const newMessages = [...prev];
          const lastIdx = newMessages.length - 1;
          if (lastIdx >= 0 && newMessages[lastIdx].role === "ai") {
            newMessages[lastIdx] = {
              ...newMessages[lastIdx],
              content: accumulatedResponse,
              status: "success"
            };
          }
          return newMessages;
        });
      }
    } catch (error: any) {
      console.error("AI Error details:", error);
      const errorMessage = error.name === "TypeError" && error.message === "Failed to fetch"
        ? "Gagal terhubung ke server AI. Pastikan server sedang berjalan."
        : error.message || "Unknown error occurred";

      // Update the last AI message with error status
      setMessages((prev) => {
        const newMessages = [...prev];
        const lastIdx = newMessages.length - 1;
        if (lastIdx >= 0 && newMessages[lastIdx].role === "ai") {
          newMessages[lastIdx] = {
            ...newMessages[lastIdx],
            content: errorMessage,
            status: "error"
          };
        }
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  // callAI logic moved to server-side API route /api/ai

  const clearChat = () => {
    setMessages([]);
  };

  const retryLastMessage = () => {
    const lastUserMessage = [...messages].reverse().find(m => m.role === "user");
    if (lastUserMessage) {
      setInput(lastUserMessage.content);
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Sidebar with Slide Animation from Right */}
      <aside
        className={clsx(
          "fixed top-0 right-0 w-full md:w-[400px] h-full bg-white shadow-2xl z-[60] transform transition-transform duration-300 ease-in-out flex flex-col",
          {
            "translate-x-0": isOpen,
            "translate-x-full": !isOpen,
          }
        )}
      >
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between bg-white sticky top-0 z-10">
          <h2 className="text-xl font-bold text-gray-800">STELKBOOK AI</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={clearChat}
              className="text-gray-500 hover:text-red-500 transition-colors"
              title="Bersihkan Chat"
            >
              <Trash2 size={20} />
            </button>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-2">
              <Image src="/assets/icon/AI_Icon.svg" alt="AI" width={60} height={60} className="opacity-20" />
              <p>Halo! Ada yang bisa saya bantu?</p>
            </div>
          )}
          {messages.map((msg, index) => (
            <div
              key={index}
              className={clsx("flex w-full", {
                "justify-end": msg.role === "user",
                "justify-start": msg.role === "ai",
              })}
            >
              <div
                className={clsx(
                  "max-w-[85%] p-3 rounded-2xl shadow-sm text-sm",
                  {
                    "bg-[#FF4D35] text-white rounded-tr-none": msg.role === "user",
                    "bg-[#F3F4F6] text-gray-800 rounded-tl-none": msg.role === "ai" && msg.status !== "error",
                    "bg-red-50 border border-red-200 text-red-600 rounded-tl-none": msg.status === "error",
                  }
                )}
              >
                {msg.role === "ai" ? (
                  <div className="prose prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-gray-800 prose-pre:text-white prose-li:my-1">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  msg.content
                )}
              </div>
            </div>
          ))}
          {/* Retry Button outside the bubble if error */}
          {messages.length > 0 && messages[messages.length - 1].status === "error" && (
            <div className="flex justify-start">
              <button
                onClick={retryLastMessage}
                className="flex items-center space-x-1 text-xs text-gray-400 hover:text-gray-600 transition-colors ml-2"
              >
                <RotateCcw size={12} />
                <span>Retry</span>
              </button>
            </div>
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-tl-none shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Field */}
        <div className="p-4 border-t bg-white">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
            <div className="flex-grow relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ketikkan pertanyaan kamu di sini..."
                className="w-full p-3 pr-12 border-2 border-[#FF4D35] rounded-2xl focus:outline-none text-sm transition-all"
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className={clsx(
                "px-6 py-3 rounded-xl text-white font-bold transition-all shadow-md flex items-center justify-center",
                {
                  "bg-[#FF4D35] hover:bg-[#e6442e]": !isLoading && input.trim(),
                  "bg-gray-300 cursor-not-allowed": isLoading || !input.trim(),
                }
              )}
            >
              Kirim
            </button>
          </form>
        </div>
      </aside>

      {/* Dimmed Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black bg-opacity-40 z-[55] backdrop-blur-[2px] transition-opacity duration-300"
        ></div>
      )}
    </>
  );
};

export default AISidebar;
