import { useState } from "react";
import { useRouter } from "next/navigation";
import {ANNOUNCEMENT_MAX_MESSAGE_LENGTH} from '@/app/constants'

export type AnnouncementProps = {
  id: number;
  name: string;
  message: string;
  groupId?: number;
  userId: number;
  startDate: Date;
  endDate?: Date;
  createdAt: Date;
  deletedAt?: Date;
  mediaId?: number;
}

const initialFormState = {
  title: "",
  body: "",
  mediaSrc: "",
  mediaType: "image",
  submittedBy: "",
  endDate: "",
};

export function PostAction(form: typeof initialFormState) {
  console.log("📝 Submitted announcement:", {
    name: form.title,
    message: form.body,
    submittedBy: form.submittedBy,
    mediaSrc: form.mediaSrc,
    mediaType: form.mediaType,
    endDate: form.endDate || null,
    createdAt: new Date().toISOString(),
  });
}

export default function DeanAnnouncementForm(){
    const router = useRouter();
    const [form, setForm] = useState(initialFormState);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!form.title || !form.body || !form.submittedBy){
            alert("Please fill in all required fields: title, body, and submitted by.");
            return;
        }
        if(form.body.length > ANNOUNCEMENT_MAX_MESSAGE_LENGTH){
            const confirmSubmit = confirm("Announcement body is longer than 300 characters. Note that it will be truncated.");
            if (!confirmSubmit) {
                return;
            }
        }
        PostAction(form); // console.log it
        router.push("/demo/announcements");
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto bg-white shadow-md p-6 rounded-xl space-y-6">
            <h2 className="text-2xl font-bold text-indigo-700">Create New Dean Announcement</h2>

            <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Title"
                required
                className="w-full p-2 border rounded"
            />

            <textarea
                name="body"
                value={form.body}
                onChange={handleChange}
                placeholder="Announcement body"
                required
                rows={4}
                className="w-full p-2 border rounded"
            />
            {form.body.length > ANNOUNCEMENT_MAX_MESSAGE_LENGTH && (
                <div className="text-sm text-right text-red-600 mt-1">
                {form.body.length}/{ANNOUNCEMENT_MAX_MESSAGE_LENGTH}
                </div>    
            )}
            
            {form.body.length <= ANNOUNCEMENT_MAX_MESSAGE_LENGTH && (
                <div className="text-sm text-right text-gray-600 mt-1">
                {form.body.length}/{ANNOUNCEMENT_MAX_MESSAGE_LENGTH}
                </div>    
            )}
            <input
                name="mediaSrc"
                value={form.mediaSrc}
                onChange={handleChange}
                placeholder="Media URL"
                className="w-full p-2 border rounded"
            />

            <select
                name="mediaType"
                value={form.mediaType}
                onChange={handleChange}
                className="w-full p-2 border rounded"
            >
                <option value="image">Image</option>
                <option value="gif">GIF</option>
                <option value="video">Video</option>
            </select>

            <input
                name="submittedBy"
                value={form.submittedBy}
                onChange={handleChange}
                placeholder="Submitted by"
                required
                className="w-full p-2 border rounded"
            />

            <input
                name="endDate"
                type="datetime-local"
                value={form.endDate}
                onChange={handleChange}
                className="w-full p-2 border rounded"
            />

            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                Submit
            </button>
        </form>
    );
}