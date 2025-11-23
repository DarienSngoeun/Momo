import { Link } from 'react-router-dom';
import { User, Users, Volume2, Palette, HelpCircle, ChevronRight } from 'lucide-react';
import { Container } from '../components/layout/Container';

function Settings() {
  const settingsOptions = [
    {
      id: 'profile',
      icon: User,
      label: 'Profile',
      description: 'Manage your account',
      to: '/profile',
      functional: true,
    },
    {
      id: 'friends',
      icon: Users,
      label: 'Friends',
      description: 'Connect with friends',
      to: '/friends',
      functional: true,
    },
    {
      id: 'sound',
      icon: Volume2,
      label: 'Sound',
      description: 'Audio & notifications',
      to: null,
      functional: false,
    },
    {
      id: 'theme',
      icon: Palette,
      label: 'Theme',
      description: 'Appearance settings',
      to: null,
      functional: false,
    },
    {
      id: 'help',
      icon: HelpCircle,
      label: 'Help',
      description: 'Support & feedback',
      to: null,
      functional: false,
    },
  ];

  return (
    <Container className="pt-12 pb-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      </div>

      {/* Settings Options */}
      <div className="space-y-4 mb-8">
        {settingsOptions.map((option) => {
          const Icon = option.icon;
          const content = (
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
              {/* Icon */}
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <Icon size={20} className="text-gray-700" />
              </div>

              {/* Label and Description */}
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-gray-900">
                  {option.label}
                </h3>
                <p className="text-sm text-gray-500">{option.description}</p>
              </div>

              {/* Chevron */}
              <ChevronRight
                size={20}
                className={option.functional ? 'text-gray-400' : 'text-gray-300'}
              />
            </div>
          );

          // If functional, wrap in Link; otherwise render as div
          if (option.functional && option.to) {
            return (
              <Link key={option.id} to={option.to} className="block">
                {content}
              </Link>
            );
          }

          return (
            <div
              key={option.id}
              className={`block ${!option.functional ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              {content}
            </div>
          );
        })}
      </div>

      {/* Version */}
      <div className="text-center text-sm text-gray-500 mt-8">
        Version 1.0.0
      </div>
    </Container>
  );
}

export default Settings;

