import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Define types for recognition data
type Recognition = {
  id: string;
  fromUser: {
    id: string;
    name: string;
    avatarUrl: string;
  };
  toUser: {
    id: string;
    name: string;
    avatarUrl: string;
  };
  message: string;
  points: number;
  createdAt: string;
};

// Mock data for recent recognitions
const mockRecognitions: Recognition[] = [
  {
    id: '1',
    fromUser: {
      id: 'user1',
      name: 'John Doe',
      avatarUrl: '/avatars/john.png',
    },
    toUser: {
      id: 'user2',
      name: 'Jane Smith',
      avatarUrl: '/avatars/jane.png',
    },
    message: 'Thanks for helping me debug the production issue yesterday!',
    points: 50,
    createdAt: '2025-03-07T14:30:00Z',
  },
  {
    id: '2',
    fromUser: {
      id: 'user3',
      name: 'Michael Johnson',
      avatarUrl: '/avatars/michael.png',
    },
    toUser: {
      id: 'user1',
      name: 'John Doe',
      avatarUrl: '/avatars/john.png',
    },
    message: 'Great presentation at the team meeting. Very insightful!',
    points: 30,
    createdAt: '2025-03-06T10:15:00Z',
  },
  {
    id: '3',
    fromUser: {
      id: 'user4',
      name: 'Emily Watson',
      avatarUrl: '/avatars/emily.png',
    },
    toUser: {
      id: 'user3',
      name: 'Michael Johnson',
      avatarUrl: '/avatars/michael.png',
    },
    message: 'Thanks for the code review. Your feedback was very helpful.',
    points: 25,
    createdAt: '2025-03-05T16:45:00Z',
  },
];

// Helper function to format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

export const RecentRecognitions: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Recent Recognitions</h2>
        <Link href="/recognitions" className="text-blue-600 hover:text-blue-800 text-sm">
          View All
        </Link>
      </div>
      
      <div className="space-y-4">
        {mockRecognitions.map((recognition) => (
          <div key={recognition.id} className="border-b border-gray-200 pb-4 last:border-0">
            <div className="flex items-start">
              <div className="relative w-10 h-10 bg-gray-200 rounded-full overflow-hidden mr-3">
                {/* Replace with actual Image component when avatars are available */}
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  {recognition.fromUser.name.charAt(0)}
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">
                      <span>{recognition.fromUser.name}</span>
                      <span className="text-gray-500 mx-2">→</span>
                      <span>{recognition.toUser.name}</span>
                    </p>
                    <p className="text-sm text-gray-600 mt-1">{recognition.message}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      +{recognition.points} pts
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{formatDate(recognition.createdAt)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {mockRecognitions.length === 0 && (
        <div className="text-center py-6 text-gray-500">
          No recent recognitions found.
        </div>
      )}
    </div>
  );
};

