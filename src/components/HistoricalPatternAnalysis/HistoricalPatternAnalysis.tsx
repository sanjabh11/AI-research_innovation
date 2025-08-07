import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Timeline as TimelineIcon,
  Search as SearchIcon,
  Equalizer as EqualizerIcon,
  ArrowForward as ArrowForwardIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  background: 'linear-gradient(135deg, #23a6d5 0%, #23d5ab 100%)',
  color: 'white',
  marginBottom: theme.spacing(3),
}));

const HighlightCard = styled(Card)(({ theme }) => ({
  height: '100%',
  background: theme.palette.background.paper,
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

const HistoricalPatternAnalysis: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedPattern, setSelectedPattern] = useState('pattern1');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const patterns = [
    {
      id: 'pattern1',
      name: 'Economic Recession Trends',
      description: 'Identify patterns in economic downturns across decades.',
      data: 'Patterns detected in economic data during significant downturns are primarily attributed to...',
    },
    {
      id: 'pattern2',
      name: 'Political Instability Patterns',
      description: 'Analyze political instability and regime changes.',
      data: 'Key indicators of political instability show recurring events such as...',
    },
    {
      id: 'pattern3',
      name: 'Cultural Shifts Analysis',
      description: 'Patterns in cultural shifts and their implications on policymaking.',
      data: 'Analyzing historical cultural shifts reveals patterns influencing policy decisions and societal changes.',
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <StyledPaper elevation={3}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="h4" gutterBottom>
              Historical Pattern Analysis
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
              Explore repeating patterns and trends in historical data
            </Typography>
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
        <Tab icon={<TimelineIcon />} label="Trend Analysis" />
        <Tab icon={<EqualizerIcon />} label="Comparative Trends" />
        <Tab icon={<SearchIcon />} label="Predictive Matching" />
      </Tabs>

      {/* Trend Analysis Tab */}
      {activeTab === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Patterns
                </Typography>
                <List>
                  {patterns.map((pattern) => (
                    <ListItem
                      key={pattern.id}
                      button
                      selected={selectedPattern === pattern.id}
                      onClick={() => setSelectedPattern(pattern.id)}
                    >
                      <ListItemText
                        primary={pattern.name}
                        secondary={pattern.description}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <HighlightCard>
              <CardContent>
                <Typography variant="h6" >{patterns.find(p => p.id === selectedPattern)?.name}</Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body1">
                  {patterns.find(p => p.id === selectedPattern)?.data}
                </Typography>
              </CardContent>
            </HighlightCard>
          </Grid>
        </Grid>
      )}

      {/* Comparative Trends Tab */}
      {activeTab === 1 && (
        <HighlightCard>
          <CardContent>
            <Typography variant="h6">Comparative Trend Analysis</Typography>
            <Divider sx={{ my: 2 }} />
            <Box display="flex" alignItems="center">
              <FormControl fullWidth sx={{ mr: 2 }}>
                <InputLabel>Pattern</InputLabel>
                <Select
                  value={selectedPattern}
                  onChange={(e) => setSelectedPattern(e.target.value)}
                >
                  {patterns.map((pattern) => (
                    <MenuItem key={pattern.id} value={pattern.id}>
                      {pattern.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button startIcon={<ArrowForwardIcon />} variant="contained">
                Compare
              </Button>
            </Box>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Compare selected patterns to find similarities and differences in trends across different timelines.
            </Typography>
          </CardContent>
        </HighlightCard>
      )}

      {/* Predictive Matching Tab */}
      {activeTab === 2 && (
        <HighlightCard>
          <CardContent>
            <Typography variant="h6">Predictive Pattern Matching</Typography>
            <Divider sx={{ my: 2 }} />
            <TextField
              fullWidth
              label="Input Historical Data"
              variant="outlined"
              multiline
              rows={8}
              placeholder="Paste historical data here..."
            />
            <Button
              startIcon={<SearchIcon />}
              variant="contained"
              sx={{ mt: 2 }}
            >
              Analyze
            </Button>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Utilize machine learning algorithms to detect future trends based on historical data input.
            </Typography>
          </CardContent>
        </HighlightCard>
      )}
    </Box>
  );
};

export default HistoricalPatternAnalysis;
