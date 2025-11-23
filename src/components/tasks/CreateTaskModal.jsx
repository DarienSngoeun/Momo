import { useState, useMemo } from 'react';
import { format, startOfWeek, addDays } from 'date-fns';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

const priorities = ['low', 'medium', 'high'];
const timeframes = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'date', label: 'Custom Date' },
];

// Time dropdown options
const hours = Array.from({ length: 12 }, (_, i) => i + 1); // 1-12
const minutes = ['00', '15', '30', '45'];
const periods = ['AM', 'PM'];

export function CreateTaskModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'low',
    timeframe: 'today',
    dueDate: '',
    hour: '',
    minute: '',
    period: '',
  });

  const [errors, setErrors] = useState({});

  // Calculate target date based on timeframe
  const targetDate = useMemo(() => {
    if (formData.timeframe === 'today') {
      return new Date();
    } else if (formData.timeframe === 'week') {
      // Get the upcoming Sunday of current week
      const today = new Date();
      const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
      
      if (currentDay === 0) {
        // If today is Sunday, return today
        return today;
      } else {
        // Otherwise, return the next Sunday
        const daysUntilSunday = 7 - currentDay;
        return addDays(today, daysUntilSunday);
      }
    } else if (formData.timeframe === 'date' && formData.dueDate) {
      return new Date(formData.dueDate);
    }
    return null;
  }, [formData.timeframe, formData.dueDate]);

  // Format date display
  const dateDisplay = useMemo(() => {
    if (!targetDate) return '';
    return format(targetDate, 'MMM d, EEEE'); // e.g., "Nov 22, Friday"
  }, [targetDate]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 60) {
      newErrors.title = 'Title must be 60 characters or less';
    }

    if (formData.timeframe === 'date' && !formData.dueDate) {
      newErrors.dueDate = 'Please select a date';
    }

    if (!formData.hour || !formData.minute || !formData.period) {
      newErrors.time = 'Please select a complete time';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    // Convert 12-hour format to 24-hour format
    let hour24 = parseInt(formData.hour, 10);
    if (formData.period === 'PM' && hour24 !== 12) {
      hour24 += 12;
    } else if (formData.period === 'AM' && hour24 === 12) {
      hour24 = 0;
    }
    const dueTime = `${String(hour24).padStart(2, '0')}:${formData.minute}`;

    // Set dueDate based on timeframe
    let dueDate = null;
    if (formData.timeframe === 'date') {
      dueDate = formData.dueDate;
    } else if (targetDate) {
      // For "today" and "week", use the calculated targetDate
      dueDate = format(targetDate, 'yyyy-MM-dd');
    }

    onAdd({
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
      timeframe: formData.timeframe,
      dueDate: dueDate,
      dueTime: dueTime,
    });

    // Reset form
    setFormData({
      title: '',
      description: '',
      priority: 'low',
      timeframe: 'today',
      dueDate: '',
      hour: '',
      minute: '',
      period: '',
    });
    setErrors({});
    onClose();
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      description: '',
      priority: 'low',
      timeframe: 'today',
      dueDate: '',
      hour: '',
      minute: '',
      period: '',
    });
    setErrors({});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} title="Add Task">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className={`
              w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-warm
              ${errors.title ? 'border-red-500' : 'border-gray-300'}
            `}
            placeholder="What needs to be done?"
            maxLength={60}
          />
          {errors.title && (
            <p className="text-xs text-red-500 mt-1">{errors.title}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            {formData.title.length}/60 characters
          </p>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description (optional)
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-warm"
            placeholder="Add more details..."
          />
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Priority
          </label>
          <div className="flex gap-2">
            {priorities.map((priority) => (
              <button
                key={priority}
                type="button"
                onClick={() => handleChange('priority', priority)}
                className={`
                  flex-1 py-2 px-3 rounded-lg border-2 transition-all capitalize
                  ${
                    formData.priority === priority
                      ? 'border-accent-warm bg-accent-warm bg-opacity-10'
                      : 'border-gray-300 hover:border-gray-400'
                  }
                `}
              >
                {priority}
              </button>
            ))}
          </div>
        </div>

        {/* Timeframe */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Timeframe
          </label>
          <div className="space-y-2">
            {timeframes.map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="radio"
                  name="timeframe"
                  value={option.value}
                  checked={formData.timeframe === option.value}
                  onChange={(e) => handleChange('timeframe', e.target.value)}
                  className="mr-2"
                />
                <span className="text-sm">{option.label}</span>
              </label>
            ))}
          </div>
          
          {/* Target Date Display */}
          {dateDisplay && (
            <div className="mt-3 p-3 bg-accent-soft bg-opacity-20 rounded-lg border border-accent-soft">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Target: </span>
                <span className="text-accent-cozy font-semibold">{dateDisplay}</span>
              </p>
            </div>
          )}
        </div>

        {/* Custom Date (shown only if timeframe is 'date') */}
        {formData.timeframe === 'date' && (
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
              Due Date *
            </label>
            <input
              id="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={(e) => handleChange('dueDate', e.target.value)}
              className={`
                w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-warm
                ${errors.dueDate ? 'border-red-500' : 'border-gray-300'}
              `}
            />
            {errors.dueDate && (
              <p className="text-xs text-red-500 mt-1">{errors.dueDate}</p>
            )}
          </div>
        )}

        {/* Due Time (always shown) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Time *
          </label>
          <div className="grid grid-cols-3 gap-2">
            {/* Hour */}
            <select
              value={formData.hour}
              onChange={(e) => handleChange('hour', e.target.value)}
              className={`
                px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-warm bg-white
                ${errors.time ? 'border-red-500' : 'border-gray-300'}
              `}
            >
              <option value="">Hour</option>
              {hours.map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>

            {/* Minute */}
            <select
              value={formData.minute}
              onChange={(e) => handleChange('minute', e.target.value)}
              className={`
                px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-warm bg-white
                ${errors.time ? 'border-red-500' : 'border-gray-300'}
              `}
            >
              <option value="">Min</option>
              {minutes.map((minute) => (
                <option key={minute} value={minute}>
                  {minute}
                </option>
              ))}
            </select>

            {/* AM/PM */}
            <select
              value={formData.period}
              onChange={(e) => handleChange('period', e.target.value)}
              className={`
                px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-warm bg-white
                ${errors.time ? 'border-red-500' : 'border-gray-300'}
              `}
            >
              <option value="">AM/PM</option>
              {periods.map((period) => (
                <option key={period} value={period}>
                  {period}
                </option>
              ))}
            </select>
          </div>
          {errors.time && (
            <p className="text-xs text-red-500 mt-1">{errors.time}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            {formData.timeframe === 'today' && 'Complete by this time today'}
            {formData.timeframe === 'week' && 'Target completion time this week'}
            {formData.timeframe === 'date' && 'Complete by this time on the selected date'}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-4">
          <Button type="button" variant="secondary" onClick={handleCancel} className="flex-1">
            Cancel
          </Button>
          <Button type="submit" variant="primary" className="flex-1">
            Add Task
          </Button>
        </div>
      </form>
    </Modal>
  );
}

