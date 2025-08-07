import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Chip,
  Avatar,
  AvatarGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
  Divider,
  Badge,
  Tooltip,
  LinearProgress,
  Switch,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Edit as EditIcon,
  People as PeopleIcon,
  History as HistoryIcon,
  Save as SaveIcon,
  Share as ShareIcon,
  Comment as CommentIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  RestoreFromTrash as RestoreIcon,
  ExpandMore as ExpandMoreIcon,
  Timeline as TimelineIcon,
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
  Chat as ChatIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  marginBottom: theme.spacing(3),
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

const CollaboratorAvatar = styled(Avatar)(({ theme }) => ({
  width: 32,
  height: 32,
  border: `2px solid ${theme.palette.success.main}`,
}));

interface Collaborator {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'editor' | 'viewer';
  avatar: string;
  isOnline: boolean;
  lastActive: string;
}

interface StrategyDocument {
  id: string;
  title: string;
  content: string;
  version: number;
  lastModified: string;
  modifiedBy: string;
  collaborators: string[];
  isLocked: boolean;
  lockedBy?: string;
}

interface Version {
  id: string;
  version: number;
  title: string;
  timestamp: string;
  author: string;
  changes: string;
  content: string;
}

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  resolved: boolean;
  replies: Comment[];
}

const CollaborativeStrategyPlanning: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedDocument, setSelectedDocument] = useState<string>('doc1');
  const [isEditing, setIsEditing] = useState(false);
  const [showVersionDialog, setShowVersionDialog] = useState(false);
  const [showCollaboratorDialog, setShowCollaboratorDialog] = useState(false);
  const [showPermissionsDialog, setShowPermissionsDialog] = useState(false);
  const [realTimeEnabled, setRealTimeEnabled] = useState(true);
  const [documentContent, setDocumentContent] = useState('');

  // Mock data
  const [collaborators] = useState<Collaborator[]>([
    {
      id: '1',
      name: 'Sarah Chen',
      email: 'sarah@example.com',
      role: 'owner',
      avatar: '/api/placeholder/32/32',
      isOnline: true,
      lastActive: '2 minutes ago',
    },
    {
      id: '2',
      name: 'Michael Rodriguez',
      email: 'michael@example.com',
      role: 'editor',
      avatar: '/api/placeholder/32/32',
      isOnline: true,
      lastActive: '5 minutes ago',
    },
    {
      id: '3',
      name: 'Emma Thompson',
      email: 'emma@example.com',
      role: 'viewer',
      avatar: '/api/placeholder/32/32',
      isOnline: false,
      lastActive: '1 hour ago',
    },
    {
      id: '4',
      name: 'David Kim',
      email: 'david@example.com',
      role: 'editor',
      avatar: '/api/placeholder/32/32',
      isOnline: true,
      lastActive: 'Just now',
    },
  ]);

  const [documents] = useState<StrategyDocument[]>([
    {
      id: 'doc1',
      title: 'Middle East Crisis Response Strategy',
      content: 'This document outlines our comprehensive approach to the current Middle East crisis...',
      version: 3,
      lastModified: '2024-01-15T10:30:00Z',
      modifiedBy: 'Sarah Chen',
      collaborators: ['1', '2', '4'],
      isLocked: false,
    },
    {
      id: 'doc2',
      title: 'Economic Sanctions Analysis',
      content: 'Analysis of potential economic sanctions and their geopolitical implications...',
      version: 2,
      lastModified: '2024-01-14T16:45:00Z',
      modifiedBy: 'Michael Rodriguez',
      collaborators: ['1', '2', '3'],
      isLocked: true,
      lockedBy: 'Michael Rodriguez',
    },
  ]);

  const [versions] = useState<Version[]>([
    {
      id: 'v3',
      version: 3,
      title: 'Added regional analysis section',
      timestamp: '2024-01-15T10:30:00Z',
      author: 'Sarah Chen',
      changes: 'Added comprehensive regional analysis and updated threat assessment',
      content: 'Latest version content...',
    },
    {
      id: 'v2',
      version: 2,
      title: 'Updated threat assessment',
      timestamp: '2024-01-14T14:20:00Z',
      author: 'Michael Rodriguez',
      changes: 'Updated threat levels and added new intelligence sources',
      content: 'Previous version content...',
    },
    {
      id: 'v1',
      version: 1,
      title: 'Initial draft',
      timestamp: '2024-01-13T09:15:00Z',
      author: 'Sarah Chen',
      changes: 'Initial document creation',
      content: 'Initial version content...',
    },
  ]);

  const [comments] = useState<Comment[]>([
    {
      id: 'c1',
      author: 'Michael Rodriguez',
      content: 'Should we consider the economic implications of this approach?',
      timestamp: '2024-01-15T09:30:00Z',
      resolved: false,
      replies: [
        {
          id: 'c1r1',
          author: 'Sarah Chen',
          content: 'Good point. I\'ll add an economic impact section.',
          timestamp: '2024-01-15T09:45:00Z',
          resolved: false,
          replies: [],
        },
      ],
    },
    {
      id: 'c2',
      author: 'Emma Thompson',
      content: 'The timeline seems aggressive. Can we extend Phase 2?',
      timestamp: '2024-01-15T08:15:00Z',
      resolved: true,
      replies: [],
    },
  ]);

  useEffect(() => {
    const currentDoc = documents.find(doc => doc.id === selectedDocument);
    if (currentDoc) {
      setDocumentContent(currentDoc.content);
    }
  }, [selectedDocument, documents]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleSaveDocument = () => {
    setIsEditing(false);
    // Simulate saving document
    console.log('Document saved:', documentContent);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'owner': return 'error';
      case 'editor': return 'primary';
      case 'viewer': return 'default';
      default: return 'default';
    }
  };

  const currentDoc = documents.find(doc => doc.id === selectedDocument);
  const onlineCollaborators = collaborators.filter(c => c.isOnline);

  return (
    <Box sx={{ p: 3 }}>
      <StyledPaper elevation={3}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="h4" gutterBottom>
              Collaborative Strategy Planning
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
              Real-time collaborative document editing with version control and team management
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={2}>
            <AvatarGroup max={4}>
              {onlineCollaborators.map((collaborator) => (
                <Tooltip key={collaborator.id} title={`${collaborator.name} (${collaborator.role})`}>
                  <CollaboratorAvatar
                    src={collaborator.avatar}
                    alt={collaborator.name}
                  >
                    {collaborator.name.charAt(0)}
                  </CollaboratorAvatar>
                </Tooltip>
              ))}
            </AvatarGroup>
            <Badge badgeContent={onlineCollaborators.length} color="success">
              <PeopleIcon />
            </Badge>
          </Box>
        </Box>
      </StyledPaper>

      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        sx={{ mb: 3 }}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab icon={<EditIcon />} label="Document Editor" />
        <Tab icon={<HistoryIcon />} label="Version History" />
        <Tab icon={<PeopleIcon />} label="Collaborators" />
        <Tab icon={<SecurityIcon />} label="Permissions" />
        <Tab icon={<ChatIcon />} label="Comments" />
      </Tabs>

      {/* Document Editor Tab */}
      {activeTab === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Documents
                </Typography>
                <List>
                  {documents.map((doc) => (
                    <ListItem
                      key={doc.id}
                      button
                      selected={selectedDocument === doc.id}
                      onClick={() => setSelectedDocument(doc.id)}
                    >
                      <ListItemText
                        primary={doc.title}
                        secondary={`v${doc.version} • ${doc.modifiedBy}`}
                      />
                      {doc.isLocked && (
                        <ListItemSecondaryAction>
                          <LockIcon fontSize="small" color="warning" />
                        </ListItemSecondaryAction>
                      )}
                    </ListItem>
                  ))}
                </List>
                <Button
                  startIcon={<AddIcon />}
                  variant="outlined"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  New Document
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={9}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6">
                    {currentDoc?.title}
                  </Typography>
                  <Box display="flex" gap={1}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={realTimeEnabled}
                          onChange={(e) => setRealTimeEnabled(e.target.checked)}
                          size="small"
                        />
                      }
                      label="Real-time sync"
                      sx={{ mr: 2 }}
                    />
                    {isEditing ? (
                      <Button
                        startIcon={<SaveIcon />}
                        variant="contained"
                        onClick={handleSaveDocument}
                      >
                        Save
                      </Button>
                    ) : (
                      <Button
                        startIcon={<EditIcon />}
                        variant="outlined"
                        onClick={() => setIsEditing(true)}
                        disabled={currentDoc?.isLocked}
                      >
                        Edit
                      </Button>
                    )}
                    <Button startIcon={<ShareIcon />} variant="outlined">
                      Share
                    </Button>
                  </Box>
                </Box>

                {currentDoc?.isLocked && (
                  <Box sx={{ mb: 2 }}>
                    <Chip
                      icon={<LockIcon />}
                      label={`Locked by ${currentDoc.lockedBy}`}
                      color="warning"
                      variant="outlined"
                    />
                  </Box>
                )}

                {realTimeEnabled && isEditing && (
                  <Box sx={{ mb: 2 }}>
                    <LinearProgress variant="indeterminate" sx={{ height: 2 }} />
                    <Typography variant="caption" color="text.secondary">
                      Syncing changes in real-time...
                    </Typography>
                  </Box>
                )}

                <TextField
                  multiline
                  rows={20}
                  fullWidth
                  variant="outlined"
                  value={documentContent}
                  onChange={(e) => setDocumentContent(e.target.value)}
                  disabled={!isEditing || currentDoc?.isLocked}
                  placeholder="Start typing your strategy document..."
                />

                <Box display="flex" justifyContent="between" alignItems="center" mt={2}>
                  <Typography variant="caption" color="text.secondary">
                    Last modified: {currentDoc?.lastModified} by {currentDoc?.modifiedBy}
                  </Typography>
                  <Box display="flex" gap={1}>
                    <Chip
                      size="small"
                      label={`Version ${currentDoc?.version}`}
                      color="primary"
                      variant="outlined"
                    />
                    <Chip
                      size="small"
                      label={`${currentDoc?.collaborators.length} collaborators`}
                      color="secondary"
                      variant="outlined"
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Version History Tab */}
      {activeTab === 1 && (
        <FeatureCard>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h6">Version History</Typography>
              <Button startIcon={<TimelineIcon />} variant="outlined">
                Compare Versions
              </Button>
            </Box>

            <List>
              {versions.map((version, index) => (
                <React.Fragment key={version.id}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        v{version.version}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={version.title}
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {version.author} • {version.timestamp}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {version.changes}
                          </Typography>
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      <Box display="flex" gap={1}>
                        <IconButton size="small">
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton size="small">
                          <RestoreIcon />
                        </IconButton>
                      </Box>
                    </ListItemSecondaryAction>
                  </ListItem>
                  {index < versions.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </FeatureCard>
      )}

      {/* Collaborators Tab */}
      {activeTab === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <FeatureCard>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                  <Typography variant="h6">Team Members</Typography>
                  <Button
                    startIcon={<AddIcon />}
                    variant="contained"
                    onClick={() => setShowCollaboratorDialog(true)}
                  >
                    Invite Member
                  </Button>
                </Box>

                <List>
                  {collaborators.map((collaborator, index) => (
                    <React.Fragment key={collaborator.id}>
                      <ListItem>
                        <ListItemAvatar>
                          <Badge
                            color={collaborator.isOnline ? 'success' : 'default'}
                            variant="dot"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                          >
                            <Avatar src={collaborator.avatar}>
                              {collaborator.name.charAt(0)}
                            </Avatar>
                          </Badge>
                        </ListItemAvatar>
                        <ListItemText
                          primary={collaborator.name}
                          secondary={
                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                {collaborator.email}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Last active: {collaborator.lastActive}
                              </Typography>
                            </Box>
                          }
                        />
                        <Box display="flex" alignItems="center" gap={1}>
                          <Chip
                            size="small"
                            label={collaborator.role}
                            color={getRoleColor(collaborator.role) as any}
                            variant="outlined"
                          />
                          <IconButton size="small">
                            <EditIcon />
                          </IconButton>
                        </Box>
                      </ListItem>
                      {index < collaborators.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </FeatureCard>
          </Grid>

          <Grid item xs={12} md={4}>
            <FeatureCard>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Activity Feed
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText
                      primary="Sarah Chen edited document"
                      secondary="2 minutes ago"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Michael Rodriguez left a comment"
                      secondary="5 minutes ago"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="David Kim joined collaboration"
                      secondary="15 minutes ago"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </FeatureCard>
          </Grid>
        </Grid>
      )}

      {/* Permissions Tab */}
      {activeTab === 3 && (
        <FeatureCard>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Access Control & Permissions
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Document Permissions
                </Typography>
                {documents.map((doc) => (
                  <Accordion key={doc.id}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>{doc.title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List dense>
                        {collaborators
                          .filter(c => doc.collaborators.includes(c.id))
                          .map((collaborator) => (
                            <ListItem key={collaborator.id}>
                              <ListItemAvatar>
                                <Avatar src={collaborator.avatar} sx={{ width: 24, height: 24 }}>
                                  {collaborator.name.charAt(0)}
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText primary={collaborator.name} />
                              <FormControl size="small" sx={{ minWidth: 120 }}>
                                <Select value={collaborator.role}>
                                  <MenuItem value="owner">Owner</MenuItem>
                                  <MenuItem value="editor">Editor</MenuItem>
                                  <MenuItem value="viewer">Viewer</MenuItem>
                                </Select>
                              </FormControl>
                            </ListItem>
                          ))}
                      </List>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Security Settings
                </Typography>
                <Card variant="outlined">
                  <CardContent>
                    <List>
                      <ListItem>
                        <ListItemText
                          primary="Require authentication"
                          secondary="All users must sign in to access documents"
                        />
                        <Switch defaultChecked />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Version history retention"
                          secondary="Keep version history for 90 days"
                        />
                        <Switch defaultChecked />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Real-time notifications"
                          secondary="Notify on document changes"
                        />
                        <Switch defaultChecked />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Export restrictions"
                          secondary="Limit document export capabilities"
                        />
                        <Switch />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </FeatureCard>
      )}

      {/* Comments Tab */}
      {activeTab === 4 && (
        <FeatureCard>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h6">Comments & Discussions</Typography>
              <Button startIcon={<CommentIcon />} variant="contained">
                Add Comment
              </Button>
            </Box>

            <List>
              {comments.map((comment) => (
                <React.Fragment key={comment.id}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar>
                        {comment.author.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography variant="subtitle2">
                            {comment.author}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {comment.timestamp}
                          </Typography>
                          {comment.resolved && (
                            <Chip size="small" label="Resolved" color="success" />
                          )}
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" sx={{ mt: 1 }}>
                            {comment.content}
                          </Typography>
                          {comment.replies.length > 0 && (
                            <Box sx={{ ml: 4, mt: 2 }}>
                              {comment.replies.map((reply) => (
                                <Box key={reply.id} sx={{ mb: 1 }}>
                                  <Typography variant="caption" fontWeight="bold">
                                    {reply.author}:
                                  </Typography>
                                  <Typography variant="body2" component="span" sx={{ ml: 1 }}>
                                    {reply.content}
                                  </Typography>
                                </Box>
                              ))}
                            </Box>
                          )}
                        </Box>
                      }
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </FeatureCard>
      )}

      {/* Dialogs */}
      <Dialog open={showCollaboratorDialog} onClose={() => setShowCollaboratorDialog(false)}>
        <DialogTitle>Invite Team Member</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select defaultValue="viewer" label="Role">
              <MenuItem value="viewer">Viewer</MenuItem>
              <MenuItem value="editor">Editor</MenuItem>
              <MenuItem value="owner">Owner</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCollaboratorDialog(false)}>Cancel</Button>
          <Button variant="contained">Send Invitation</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CollaborativeStrategyPlanning;
