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
        // if(!form.title || !form.body || !form.submittedBy){
        //     alert("Please fill in all required fields: title, body, and submitted by.");
        //     return;
        // }
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
            {!form.title && <p className="text-red-500 text-sm mt-1">Required field</p>}
            <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Title"
                required
                className="w-full p-2 border rounded"
            />

            {!form.body && <p className="text-red-500 text-sm mt-1">Required field</p>}
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
            <div className="w-full">
                <label htmlFor="mediaUpload" className="block text-sm font-medium text-gray-700 mb-1">
                    Upload Media File (optional)
                </label>

                <div className="flex items-center gap-4">
                    <input
                    type="file"
                    id="mediaUpload"
                    accept="image/*,video/*,image/gif"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                        const objectUrl = URL.createObjectURL(file);
                        setForm({ ...form, mediaSrc: objectUrl });
                        }
                    }}
                    className="block text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-indigo-50 file:text-indigo-700
                                hover:file:bg-indigo-100"
                    />
                </div>
            </div>

            {form.mediaSrc && (
                <div className="mt-4 rounded-lg overflow-hidden">
                    {form.mediaType === "video" ? (
                    <video controls className="w-full max-h-64 rounded-lg">
                        <source src={form.mediaSrc} />
                        Your browser does not support the video tag.
                    </video>
                    ) : (
                    <img
                        src={form.mediaSrc}
                        alt="Preview"
                        className="w-full max-h-64 object-contain rounded-lg"
                    />
                    )}
                </div>
                )}
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

            {!form.submittedBy && <p className="text-red-500 text-sm mt-1">Required field</p>}

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