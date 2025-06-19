import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useProjectStore } from '../../stores/projectStore';
import { getInitials } from '../../lib/utils';
import {
  Users,
  Plus,
  Mail,
  Crown,
  Edit,
  Eye,
  MessageSquare,
  Share,
  UserPlus,
  Settings,
  MoreVertical
} from 'lucide-react';

export function CollaborationPanel() {
  const [inviteEmail, setInviteEmail] = useState('');
  const { currentProject } = useProjectStore();

  // Mock collaborators data
  const collaborators = [
    {
      id: '1',
      name: 'Dr. Sarah Chen',
      email: 'sarah.chen@university.edu',
      role: 'owner',
      avatar: null,
      status: 'active',
      lastActive: '2 hours ago',
      permissions: ['read', 'write', 'admin']
    },
    {
      id: '2',
      name: 'Alex Martinez',
      email: 'alex@startup.com',
      role: 'collaborator',
      avatar: null,
      status: 'active',
      lastActive: '1 day ago',
      permissions: ['read', 'write']
    },
    {
      id: '3',
      name: 'Prof. Michael Thompson',
      email: 'mthompson@research.org',
      role: 'reviewer',
      avatar: null,
      status: 'pending',
      lastActive: 'Never',
      permissions: ['read', 'comment']
    }
  ];

  const handleInvite = () => {
    if (inviteEmail.trim()) {
      console.log('Inviting:', inviteEmail);
      setInviteEmail('');
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner': return Crown;
      case 'collaborator': return Edit;
      case 'reviewer': return MessageSquare;
      case 'viewer': return Eye;
      default: return Users;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'owner': return 'bg-yellow-100 text-yellow-800';
      case 'collaborator': return 'bg-blue-100 text-blue-800';
      case 'reviewer': return 'bg-green-100 text-green-800';
      case 'viewer': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Team Collaboration</h2>
          <p className="text-gray-600 mt-1">
            Manage project collaborators and permissions
          </p>
        </div>
        <Button className="aria-gradient text-white">
          <Share className="h-4 w-4 mr-2" />
          Share Project
        </Button>
      </div>

      {/* Invite Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <UserPlus className="h-5 w-5" />
              <span>Invite Collaborators</span>
            </CardTitle>
            <CardDescription>
              Invite team members to collaborate on this project
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-3">
              <div className="flex-1">
                <Input
                  placeholder="Enter email address"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleInvite()}
                />
              </div>
              <Button onClick={handleInvite} disabled={!inviteEmail.trim()}>
                <Mail className="h-4 w-4 mr-2" />
                Send Invite
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Collaborators List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Team Members</span>
                <Badge variant="outline">{collaborators.length}</Badge>
              </div>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Manage Permissions
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {collaborators.map((collaborator, index) => {
                const RoleIcon = getRoleIcon(collaborator.role);
                
                return (
                  <motion.div
                    key={collaborator.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={collaborator.avatar || undefined} />
                        <AvatarFallback className="bg-gradient-to-br from-aria-blue-500 to-aria-purple-500 text-white">
                          {getInitials(collaborator.name)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-gray-900">{collaborator.name}</h4>
                          <Badge className={getRoleColor(collaborator.role)}>
                            <RoleIcon className="h-3 w-3 mr-1" />
                            {collaborator.role}
                          </Badge>
                          {collaborator.status === 'pending' && (
                            <Badge variant="outline" className="text-yellow-600 border-yellow-300">
                              Pending
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{collaborator.email}</p>
                        <p className="text-xs text-gray-500">
                          Last active: {collaborator.lastActive}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        {collaborator.permissions.map((permission) => (
                          <Badge key={permission} variant="outline" className="text-xs">
                            {permission}
                          </Badge>
                        ))}
                      </div>
                      
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Activity Feed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  user: 'Dr. Sarah Chen',
                  action: 'updated the project description',
                  time: '2 hours ago',
                  type: 'update'
                },
                {
                  user: 'Alex Martinez',
                  action: 'added a new invention concept',
                  time: '1 day ago',
                  type: 'create'
                },
                {
                  user: 'Prof. Michael Thompson',
                  action: 'was invited to the project',
                  time: '2 days ago',
                  type: 'invite'
                }
              ].map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="w-2 h-2 bg-aria-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.user}</span> {activity.action}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}