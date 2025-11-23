import { useState } from 'react';
import { Users, Send, Share2, Flame, CheckCircle, Gift, Copy, Check } from 'lucide-react';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';
import { Toast, useToast } from '../components/ui/Toast';
import { useFriendsStore } from '../store/useFriendsStore';
import { useUserStore } from '../store/useUserStore';
import { getPet } from '../utils/petRegistry';

function Friends() {
  const [copiedInvite, setCopiedInvite] = useState(false);
  const { toast, showToast } = useToast();

  const friends = useFriendsStore((state) => state.friends);
  const sendGoodLuck = useFriendsStore((state) => state.sendGoodLuck);
  const canSendGoodLuck = useFriendsStore((state) => state.canSendGoodLuck);
  const addCoins = useUserStore((state) => state.addCoins);
  const username = useUserStore((state) => state.username);

  const handleSendGoodLuck = (friend) => {
    if (!canSendGoodLuck(friend.id)) {
      showToast("You already sent good luck to this friend today!", "info");
      return;
    }

    sendGoodLuck(friend.id);
    addCoins(5); // Reward 5 coins for sending good luck
    showToast(`+5 coins for encouraging ${friend.username}!`, "success");
  };

  const handleShareInvite = () => {
    const inviteMessage = `Join me on Momo! I'm ${username} and I'm crushing my tasks with my cute pet companion. Let's motivate each other! 🎯`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(inviteMessage).then(() => {
      setCopiedInvite(true);
      addCoins(10); // Reward 10 coins for sharing
      showToast("+10 coins for inviting friends!", "success");
      
      setTimeout(() => {
        setCopiedInvite(false);
      }, 2000);
    }).catch(() => {
      showToast("Failed to copy invite link", "error");
    });
  };

  return (
    <>
      <Container className="pt-12 pb-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Friends</h1>
          <p className="text-sm text-gray-600 mt-1">
            Connect and motivate each other
          </p>
        </div>

        {/* Invite Section */}
        <div className="bg-gradient-to-br from-accent-warm to-accent-soft rounded-xl p-6 shadow-sm mb-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center shrink-0">
              <Gift size={24} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-1">
                Invite Friends
              </h3>
              <p className="text-sm text-white text-opacity-90 mb-4">
                Share Momo with friends and earn 10 coins!
              </p>
              <Button
                variant="secondary"
                onClick={handleShareInvite}
                className="bg-white hover:bg-gray-100 text-accent-cozy flex items-center gap-2"
              >
                {copiedInvite ? (
                  <>
                    <Check size={18} />
                    Copied!
                  </>
                ) : (
                  <>
                    <Share2 size={18} />
                    Share Invite
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Friends List */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Your Friends ({friends.length})
            </h2>
          </div>

          {friends.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
              <Users size={48} className="text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500 mb-4">No friends yet</p>
              <p className="text-sm text-gray-400">
                Invite your friends to join you on Momo!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {friends.map((friend) => {
                const pet = getPet(friend.activePet);
                const canSend = canSendGoodLuck(friend.id);

                return (
                  <div
                    key={friend.id}
                    className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                      {/* Friend Avatar/Pet */}
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-soft to-accent-warm flex items-center justify-center shrink-0">
                        <Users size={24} className="text-white" />
                      </div>

                      {/* Friend Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-gray-900 mb-1">
                          {friend.username}
                        </h3>
                        <div className="flex items-center gap-3 text-xs text-gray-600">
                          {pet && (
                            <span className="flex items-center gap-1">
                              <span className="capitalize">{pet.name}</span>
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Flame size={12} className="text-orange-500" />
                            {friend.streak} day streak
                          </span>
                          <span className="flex items-center gap-1">
                            <CheckCircle size={12} className="text-green-500" />
                            {friend.totalTasks} tasks
                          </span>
                        </div>
                      </div>

                      {/* Send Good Luck Button */}
                      <button
                        onClick={() => handleSendGoodLuck(friend)}
                        disabled={!canSend}
                        className={`
                          shrink-0 p-2 rounded-lg transition-all
                          ${
                            canSend
                              ? 'bg-accent-warm text-white hover:bg-accent-cozy active:scale-95'
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          }
                        `}
                        aria-label={`Send good luck to ${friend.username}`}
                        title={canSend ? 'Send good luck (+5 coins)' : 'Already sent today'}
                      >
                        <Send size={18} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">
            How it works
          </h3>
          <ul className="space-y-1 text-xs text-blue-700">
            <li>• Send good luck messages to friends once per day (+5 coins)</li>
            <li>• Share your invite link with new friends (+10 coins)</li>
            <li>• Motivate each other to stay productive!</li>
          </ul>
        </div>
      </Container>

      {/* Toast */}
      <Toast {...toast} />
    </>
  );
}

export default Friends;
