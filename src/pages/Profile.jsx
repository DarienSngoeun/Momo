import { useState } from 'react';
import { User, Award, Flame, Coins, Calendar, CheckCircle, Edit2 } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { useUserStore } from '../store/useUserStore';
import { usePetStore } from '../store/usePetStore';
import { getPet } from '../utils/petRegistry';

function Profile() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [error, setError] = useState('');

  const username = useUserStore((state) => state.username);
  const coins = useUserStore((state) => state.coins);
  const streak = useUserStore((state) => state.streak);
  const totalTasksCompleted = useUserStore((state) => state.totalTasksCompleted);
  const memberSince = useUserStore((state) => state.memberSince);
  const setUsername = useUserStore((state) => state.setUsername);

  const activePetId = usePetStore((state) => state.activePetId);
  const activePet = getPet(activePetId);

  const handleOpenEditModal = () => {
    setNewUsername(username);
    setError('');
    setIsEditModalOpen(true);
  };

  const handleSaveUsername = () => {
    const trimmedUsername = newUsername.trim();
    
    if (!trimmedUsername) {
      setError('Username cannot be empty');
      return;
    }

    if (trimmedUsername.length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }

    if (trimmedUsername.length > 20) {
      setError('Username must be 20 characters or less');
      return;
    }

    setUsername(trimmedUsername);
    setIsEditModalOpen(false);
  };

  const stats = [
    {
      id: 'tasks',
      icon: CheckCircle,
      label: 'Tasks Completed',
      value: totalTasksCompleted,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      id: 'coins',
      icon: Coins,
      label: 'Total Coins',
      value: coins,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      id: 'current-streak',
      icon: Flame,
      label: 'Current Streak',
      value: `${streak.current} days`,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      id: 'longest-streak',
      icon: Award,
      label: 'Longest Streak',
      value: `${streak.longest} days`,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  return (
    <>
      <Container className="pt-12 pb-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-6">
          {/* Avatar and Username */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-warm to-accent-soft flex items-center justify-center">
              <User size={32} className="text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900">{username}</h2>
              <p className="text-sm text-gray-500">
                Member since {format(parseISO(memberSince), 'MMMM yyyy')}
              </p>
            </div>
            <button
              onClick={handleOpenEditModal}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Edit username"
            >
              <Edit2 size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Active Pet */}
          {activePet && (
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-2">Active Pet</p>
              <div className="flex items-center gap-2">
                <span className="text-base font-semibold text-gray-900">
                  {activePet.name}
                </span>
                <span className="text-sm text-gray-500 capitalize">
                  ({activePet.species})
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Statistics */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Statistics</h2>
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.id}
                  className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
                >
                  <div className={`w-10 h-10 rounded-full ${stat.bgColor} flex items-center justify-center mb-3`}>
                    <Icon size={20} className={stat.color} />
                  </div>
                  <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                  <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Container>

      {/* Edit Username Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Username"
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={newUsername}
              onChange={(e) => {
                setNewUsername(e.target.value);
                setError('');
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-warm"
              placeholder="Enter username"
              maxLength={20}
            />
            {error && (
              <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              3-20 characters
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={() => setIsEditModalOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSaveUsername}
              className="flex-1"
            >
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Profile;
