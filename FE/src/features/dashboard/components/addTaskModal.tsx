// ...existing imports...
import { useState } from 'react';

const AddTaskModal = ({ open, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    title: '',
    date: '',
    priority: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setForm((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 h-[40rem] w-[70rem] relative">
        <button className="absolute text-xl font-light underline underline-offset-4 top-9 right-9" onClick={onClose}>Go Back</button>
        <h2 className="text-xl mb-4 font-semibold  underline decoration-orange-600 underline-offset-4">Add New Task</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(form);
          }}
        >
          <div className="mb-4">
            <label className="text-lg">Title</label>
            <input name="title" value={form.title} onChange={handleChange} className="w-full border rounded p-2" required />
          </div>
          <div className="mb-4">
            <label className="text-lg">Date</label>
            <input name="date" type="date" value={form.date} onChange={handleChange} className="w-full border text-base font-light rounded p-2" />
          </div>
          <div className="mb-4">
            <label className="text-lg">Priority</label>
            <div className="flex gap-4">
              <label><input type="radio" name="priority" value="Extreme" onChange={handleChange} /> <span className="text-red-500 text-lg font-normal">Extreme</span></label>
              <label><input type="radio" name="priority" value="Moderate" onChange={handleChange} /> <span className="text-blue-500 text-lg font-normal">Moderate</span></label>
              <label><input type="radio" name="priority" value="Low" onChange={handleChange} /> <span className="text-green-500 text-lg font-normal">Low</span></label>
            </div>
          </div>
          <div className="mb-4">
            <label className="text-lg">Task Description</label>
            <textarea 
              name="description" 
              value={form.description} 
              onChange={handleChange} 
              placeholder="Start writing here...." 
              className="w-full h-[12rem] border rounded p-2 text-base font-normal" 
              rows={4} 
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white text-xl px-5 py-2 rounded">Done</button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;